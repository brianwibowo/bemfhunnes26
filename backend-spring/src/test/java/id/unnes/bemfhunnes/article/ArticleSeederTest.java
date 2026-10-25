package id.unnes.bemfhunnes.article;

import static org.assertj.core.api.Assertions.assertThat;

import id.unnes.bemfhunnes.auth.AuthConfig;
import id.unnes.bemfhunnes.auth.AuthService;
import id.unnes.bemfhunnes.config.AppProperties;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SingleConnectionDataSource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;

/** Exercises the real schema and SQLite conflict handling without touching a saved database. */
class ArticleSeederTest {
    private static final String COVER_REFRESH_KEY = "demo-article-covers-v2";
    private static final Map<String, List<String>> COVER_VERSIONS = Map.ofEntries(
            Map.entry("contoh-berita-mengenal-laksana-adhikara", List.of("kabinet-laksana-adhikara", "pimpinan-kabinet")),
            Map.entry("contoh-berita-ruang-digital-keluarga-hukum", List.of("saling-merangkul", "kebersamaan-di-kampus")),
            Map.entry("contoh-berita-aspirasi-dan-langkah-bersama", List.of("kebersamaan-kabinet", "saling-merangkul")),
            Map.entry("contoh-kemahasiswaan-persiapan-beasiswa", List.of("ruang-belajar", "kaderisasi-dan-kebersamaan")),
            Map.entry("contoh-kemahasiswaan-aspirasi-dan-dukungan", List.of("suara-dan-aksi", "ruang-kajian")),
            Map.entry("contoh-kemahasiswaan-ruang-bertumbuh", List.of("saling-merangkul", "kebersamaan-kabinet")),
            Map.entry("contoh-eksternal-memulai-kolaborasi", List.of("jejaring-dan-kolaborasi", "pertemuan-studi-banding")),
            Map.entry("contoh-eksternal-kepedulian-dan-pengabdian", List.of("aksi-donor-darah", "aksi-donor-darah")),
            Map.entry("contoh-eksternal-ide-kreatif", List.of("ruang-kreatif", "sinergi-kementerian")));
    private SingleConnectionDataSource source;
    private JdbcTemplate db;
    private AppProperties properties;
    private ArticleSeeder seeder;

    @BeforeEach
    void prepareDatabase() {
        source = new SingleConnectionDataSource("jdbc:sqlite::memory:", true);
        db = new JdbcTemplate(source);
        db.execute("PRAGMA foreign_keys = ON");
        new ResourceDatabasePopulator(new ClassPathResource("schema.sql")).execute(source);
        properties = new AppProperties();
        seeder = new ArticleSeeder(db, properties);
    }

    @AfterEach
    void closeDatabase() {
        source.destroy();
    }

    @Test
    void disabledByDefaultDoesNotCreateArticlesOrAccounts() {
        assertThat(properties.isSeedDemoContent()).isFalse();
        seeder.seed();
        assertThat(count("articles")).isZero();
        assertThat(count("users")).isZero();
        assertThat(count("app_seeds")).isZero();
    }

    @Test
    void enabledWithoutAnExistingAuthorSkipsContentAndCanRetryOnceAnAdminExists() {
        properties.setSeedDemoContent(true);
        seeder.seed();
        assertThat(count("articles")).isZero();
        assertThat(count("users")).isZero();
        assertThat(count("app_seeds")).isZero();

        addUser("admin@example.test", "admin");
        seeder.seed();
        assertThat(count("articles")).isEqualTo(9);
        assertThat(count("app_seeds")).isEqualTo(2);
    }

    @Test
    void createsThreePublishedMarkedArticlesForEachSectionUsingAnExistingAdmin() {
        addUser("superadmin@example.test", "superadmin");
        long admin = addUser("admin@example.test", "admin");
        properties.setSeedDemoContent(true);

        seeder.seed();

        assertThat(count("articles")).isEqualTo(9);
        assertThat(count("users")).isEqualTo(2);
        assertThat(db.queryForList("SELECT seed_key FROM app_seeds", String.class))
                .containsExactlyInAnyOrder("demo-articles-v1", COVER_REFRESH_KEY);
        assertCurrentCovers();
        assertThat(db.queryForObject("SELECT COUNT(DISTINCT image_url) FROM articles", Integer.class))
                .isEqualTo(9);
        for (String section : List.of("berita", "kemahasiswaan", "eksternal")) {
            assertThat(db.queryForObject(
                    "SELECT COUNT(*) FROM articles WHERE section = ? AND status = 'published'",
                    Integer.class, section)).isEqualTo(3);
        }
        for (Map<String, Object> article : db.queryForList("SELECT * FROM articles")) {
            assertThat(article.get("description").toString()).startsWith("Konten contoh: ").hasSizeBetween(20, 320);
            assertThat(article.get("body").toString()).startsWith("Konten contoh untuk pratinjau tampilan website.");
            assertThat(article.get("slug").toString()).startsWith("contoh-");
            assertThat(article.get("image_url").toString()).startsWith("/images/kabinet/").endsWith(".webp");
            assertThat(((Number) article.get("author_id")).longValue()).isEqualTo(admin);
            assertThat(article.get("published_at")).isNotNull();
            assertThat(article.get("created_at")).isEqualTo(article.get("updated_at"));
        }
    }

    @Test
    void aSuperadminCanBeTheAuthorWhenThereIsNoAdmin() {
        long superadmin = addUser("superadmin@example.test", "superadmin");
        properties.setSeedDemoContent(true);
        seeder.seed();
        assertThat(db.queryForList("SELECT DISTINCT author_id FROM articles", Long.class))
                .containsExactly(superadmin);
    }

    @Test
    void repeatRunsPreserveSlugCollisionsExistingContentAndEditorialChanges() {
        long author = addUser("admin@example.test", "admin");
        db.update("""
                INSERT INTO articles(section, title, slug, description, body, status, author_id)
                VALUES('berita', 'Judul milik editor', 'contoh-berita-mengenal-laksana-adhikara',
                       'Deskripsi milik editor', 'Isi milik editor', 'inactive', ?)
                """, author);
        db.update("""
                INSERT INTO articles(section, title, slug, description, body, status, author_id)
                VALUES('berita', 'Artikel asli', 'artikel-asli',
                       'Artikel asli yang sudah ada', 'Isi artikel asli tetap utuh', 'published', ?)
                """, author);
        properties.setSeedDemoContent(true);
        seeder.seed();
        db.update("""
                UPDATE articles SET title = 'Judul yang sudah diperbarui', body = 'Revisi editor',
                    status = 'pending', image_url = '/uploads/foto-editor.webp', updated_at = 'editor-version'
                WHERE slug = 'contoh-eksternal-ide-kreatif'
                """);
        List<Map<String, Object>> before = db.queryForList("SELECT * FROM articles ORDER BY id");

        seeder.seed();

        assertThat(db.queryForList("SELECT * FROM articles ORDER BY id")).isEqualTo(before);
        assertThat(count("articles")).isEqualTo(10);
        assertThat(count("users")).isEqualTo(1);
    }

    @Test
    void aCompletedBatchIsNotReappliedAfterAnEditorChangesSlugsOrDeletesExamples() {
        addUser("admin@example.test", "admin");
        properties.setSeedDemoContent(true);
        seeder.seed();
        db.update("""
                UPDATE articles SET slug = 'judul-baru-editor', title = 'Artikel yang telah disesuaikan'
                WHERE slug = 'contoh-berita-mengenal-laksana-adhikara'
                """);
        db.update("DELETE FROM articles WHERE slug = 'contoh-eksternal-ide-kreatif'");
        List<Map<String, Object>> before = db.queryForList("SELECT * FROM articles ORDER BY id");

        seeder.seed();

        assertThat(db.queryForList("SELECT * FROM articles ORDER BY id")).isEqualTo(before);
        assertThat(count("articles")).isEqualTo(8);
        assertThat(count("app_seeds")).isEqualTo(2);
    }

    @Test
    void existingV1BatchRefreshesOnlyCoversOnceWithoutChangingAuthorsDatesOrArticleCount() {
        prepareLegacyBatch();
        List<Map<String, Object>> before = db.queryForList("SELECT * FROM articles ORDER BY id");

        seeder.seed();

        assertCurrentCovers();
        List<Map<String, Object>> refreshed = db.queryForList("SELECT * FROM articles ORDER BY id");
        for (int index = 0; index < before.size(); index++) {
            Map<String, Object> originalContent = new HashMap<>(before.get(index));
            Map<String, Object> refreshedContent = new HashMap<>(refreshed.get(index));
            originalContent.remove("image_url");
            refreshedContent.remove("image_url");
            assertThat(refreshedContent).isEqualTo(originalContent);
        }
        assertThat(count("articles")).isEqualTo(9);
        assertThat(count("users")).isEqualTo(1);
        assertThat(count("app_seeds")).isEqualTo(2);
        List<Map<String, Object>> markers = db.queryForList("SELECT * FROM app_seeds ORDER BY seed_key");

        seeder.seed();

        assertThat(db.queryForList("SELECT * FROM articles ORDER BY id")).isEqualTo(refreshed);
        assertThat(db.queryForList("SELECT * FROM app_seeds ORDER BY seed_key")).isEqualTo(markers);
    }

    @Test
    void existingV1BatchPreservesEveryEditorialChangeEvenWhenTheSlugOrLegacyCoverStillMatches() {
        prepareLegacyBatch();
        db.update("""
                UPDATE articles SET image_url = '/uploads/foto-editor.webp'
                WHERE slug = 'contoh-berita-mengenal-laksana-adhikara'
                """);
        db.update("""
                UPDATE articles SET body = body || ' Tambahan dari editor.'
                WHERE slug = 'contoh-berita-ruang-digital-keluarga-hukum'
                """);
        db.update("""
                UPDATE articles SET title = 'Judul baru editor'
                WHERE slug = 'contoh-berita-aspirasi-dan-langkah-bersama'
                """);
        db.update("""
                UPDATE articles SET description = 'Deskripsi baru editor'
                WHERE slug = 'contoh-kemahasiswaan-persiapan-beasiswa'
                """);
        db.update("""
                UPDATE articles SET status = 'pending'
                WHERE slug = 'contoh-kemahasiswaan-aspirasi-dan-dukungan'
                """);
        db.update("""
                UPDATE articles SET section = 'eksternal'
                WHERE slug = 'contoh-kemahasiswaan-ruang-bertumbuh'
                """);
        db.update("""
                UPDATE articles SET slug = 'kolaborasi-yang-sudah-disunting'
                WHERE slug = 'contoh-eksternal-memulai-kolaborasi'
                """);
        db.update("""
                UPDATE articles SET status = 'inactive'
                WHERE slug = 'contoh-eksternal-ide-kreatif'
                """);
        List<Map<String, Object>> before = db.queryForList("SELECT * FROM articles ORDER BY id");

        seeder.seed();
        seeder.seed();

        assertThat(db.queryForList("SELECT * FROM articles ORDER BY id")).isEqualTo(before);
        assertThat(count("users")).isEqualTo(1);
        assertThat(count("app_seeds")).isEqualTo(2);
    }

    @Test
    void disablingDemoContentAlsoDisablesAnExistingV1CoverRefresh() {
        prepareLegacyBatch();
        properties.setSeedDemoContent(false);
        List<Map<String, Object>> before = db.queryForList("SELECT * FROM articles ORDER BY id");

        seeder.seed();

        assertThat(db.queryForList("SELECT * FROM articles ORDER BY id")).isEqualTo(before);
        assertThat(db.queryForList("SELECT seed_key FROM app_seeds", String.class))
                .containsExactly("demo-articles-v1");
        assertThat(count("users")).isEqualTo(1);
    }

    @Test
    void startupSeedsUsersBeforeLookingForTheDemoAuthor() throws Exception {
        properties.setSeedDemoContent(true);
        properties.setAdminEmail("startup-admin@example.test");
        properties.setAdminPassword("local-test-password-only");

        new AuthConfig().seedUsers(new AuthService(db, properties), seeder).run();

        assertThat(count("users")).isEqualTo(1);
        assertThat(count("articles")).isEqualTo(9);
        assertThat(db.queryForObject("""
                SELECT COUNT(*) FROM articles a JOIN users u ON u.id = a.author_id
                WHERE u.email = 'startup-admin@example.test'
                """, Integer.class)).isEqualTo(9);
    }

    private long addUser(String email, String role) {
        db.update("INSERT INTO users(email, password_hash, role) VALUES(?, 'unused-test-hash', ?)", email, role);
        return db.queryForObject("SELECT id FROM users WHERE email = ?", Long.class, email);
    }

    private void prepareLegacyBatch() {
        addUser("admin@example.test", "admin");
        properties.setSeedDemoContent(true);
        seeder.seed();
        db.update("DELETE FROM app_seeds WHERE seed_key = ?", COVER_REFRESH_KEY);
        COVER_VERSIONS.forEach((slug, covers) -> db.update(
                "UPDATE articles SET image_url = ? WHERE slug = ?",
                "/images/kabinet/" + covers.getFirst() + ".webp", slug));
        assertThat(db.queryForList("SELECT seed_key FROM app_seeds", String.class))
                .containsExactly("demo-articles-v1");
    }

    private void assertCurrentCovers() {
        COVER_VERSIONS.forEach((slug, covers) -> assertThat(db.queryForObject(
                "SELECT image_url FROM articles WHERE slug = ?", String.class, slug))
                .isEqualTo("/images/kabinet/" + covers.getLast() + ".webp"));
    }

    private int count(String table) {
        return db.queryForObject("SELECT COUNT(*) FROM " + table, Integer.class);
    }
}
