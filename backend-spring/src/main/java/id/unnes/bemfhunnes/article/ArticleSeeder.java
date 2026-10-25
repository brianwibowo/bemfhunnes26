package id.unnes.bemfhunnes.article;

import id.unnes.bemfhunnes.config.AppProperties;
import java.time.Instant;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Optional preview content; only unchanged demo covers can be refreshed. */
@Service
public class ArticleSeeder {
    private static final Logger log = LoggerFactory.getLogger(ArticleSeeder.class);
    private static final String SEED_KEY = "demo-articles-v1";
    private static final String COVER_REFRESH_KEY = "demo-article-covers-v2";
    private static final String NOTICE = """
            Konten contoh untuk pratinjau tampilan website. Sesuaikan isi sebelum publikasi resmi.

            """;

    private final JdbcTemplate db;
    private final AppProperties properties;

    public ArticleSeeder(JdbcTemplate db, AppProperties properties) {
        this.db = db;
        this.properties = properties;
    }

    @Transactional
    public void seed() {
        if (!properties.isSeedDemoContent()) {
            log.info("Konten contoh dinonaktifkan (SEED_DEMO_CONTENT=false).");
            return;
        }
        if (hasApplied(SEED_KEY)) {
            log.info("Konten contoh sudah pernah disiapkan. Tidak ada artikel yang ditambahkan.");
        } else if (!insertDemoArticles()) {
            return;
        }

        refreshUnchangedDemoCovers();
    }

    private boolean insertDemoArticles() {
        List<Long> authors = db.queryForList("""
                SELECT id FROM users
                WHERE role IN ('admin', 'superadmin')
                ORDER BY CASE WHEN role = 'admin' THEN 0 ELSE 1 END, id
                LIMIT 1
                """, Long.class);
        if (authors.isEmpty()) {
            log.warn("Konten contoh dilewati: belum ada akun admin atau superadmin. Tidak ada artikel atau akun baru yang dibuat.");
            return false;
        }

        long author = authors.getFirst();
        String now = Instant.now().toString();
        int inserted = 0;
        for (DemoArticle article : articles()) {
            inserted += db.update("""
                    INSERT INTO articles
                        (section, title, slug, description, body, image_url, status,
                         author_id, published_at, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, 'published', ?, ?, ?, ?)
                    ON CONFLICT(slug) DO NOTHING
                    """, article.section(), article.title(), article.slug(),
                    "Konten contoh: " + article.description(),
                    NOTICE + article.body().strip(),
                    coverUrl(article.cover()),
                    author, now, now, now);
        }

        // Keep the completed batch recorded even if an editor later renames or deletes an example.
        db.update("INSERT INTO app_seeds(seed_key, applied_at) VALUES(?, ?)", SEED_KEY, now);

        log.info("Konten contoh: {} artikel ditambahkan, {} slug sudah ada dan dilewati. Artikel yang sudah ada tidak diubah.",
                inserted, articles().size() - inserted);
        return true;
    }

    private void refreshUnchangedDemoCovers() {
        if (hasApplied(COVER_REFRESH_KEY)) {
            return;
        }

        int refreshed = 0;
        for (DemoArticle article : articles()) {
            if (article.previousCover().equals(article.cover())) {
                continue;
            }
            // A matching slug alone is insufficient: never overwrite an editor's text, status, or photo.
            refreshed += db.update("""
                    UPDATE articles SET image_url = ?
                    WHERE slug = ? AND section = ? AND title = ? AND description = ?
                      AND body = ? AND status = 'published' AND image_url = ?
                    """, coverUrl(article.cover()), article.slug(), article.section(), article.title(),
                    "Konten contoh: " + article.description(), NOTICE + article.body().strip(),
                    coverUrl(article.previousCover()));
        }

        // Keep article author and publication/edit timestamps intact; this is a one-time asset refresh.
        db.update("INSERT INTO app_seeds(seed_key, applied_at) VALUES(?, ?)",
                COVER_REFRESH_KEY, Instant.now().toString());
        log.info("Sampul contoh: {} foto diperbarui. Artikel yang sudah disunting tetap utuh.", refreshed);
    }

    private boolean hasApplied(String seedKey) {
        return db.queryForObject("SELECT COUNT(*) FROM app_seeds WHERE seed_key = ?",
                Integer.class, seedKey) > 0;
    }

    private static String coverUrl(String name) {
        return "/images/kabinet/" + name + ".webp";
    }

    private static List<DemoArticle> articles() {
        return List.of(
                new DemoArticle(
                        "berita", "contoh-berita-mengenal-laksana-adhikara",
                        "Mengenal Kabinet Laksana Adhikara",
                        "Mengenal asa, karsa, dan kebijaksanaan yang menjadi arah gerak Kabinet Laksana Adhikara.",
                        """
                        Laksana Adhikara dimaknai sebagai pertemuan asa dan karsa yang diwujudkan melalui perbuatan nyata. Dalam narasi kabinet, Laksana mengingatkan bahwa niat baik perlu hadir sebagai langkah yang bermakna.

                        Adhikara membawa semangat kewibawaan yang tumbuh dari kebijaksanaan. Keberanian bersuara berjalan bersama ketenangan dan keteguhan saat menghadapi rintangan.

                        Melalui rumah digital BEM FH UNNES, semangat itu mendapat ruang untuk diceritakan, dibaca, dan dikembangkan bersama keluarga mahasiswa hukum.
                        """, "kabinet-laksana-adhikara", "pimpinan-kabinet"),
                new DemoArticle(
                        "berita", "contoh-berita-ruang-digital-keluarga-hukum",
                        "Ruang Digital untuk Kabar Keluarga Hukum",
                        "Panduan singkat mengenali rubrik berita, kemahasiswaan, dan eksternal di rumah digital BEM FH UNNES.",
                        """
                        Website BEM FH UNNES mempertemukan kabar kabinet, informasi kemahasiswaan, dan ruang kolaborasi dalam satu rumah digital. Pembaca dapat menjelajahi rubrik sesuai kebutuhan, lalu membuka artikel untuk membaca informasi lebih lengkap.

                        Rubrik berita menjadi tempat mengikuti cerita dan publikasi. Rubrik kemahasiswaan mengangkat dukungan serta kesempatan belajar, sedangkan rubrik eksternal membuka percakapan tentang jejaring dan kerja bersama.

                        Sebelum membagikan informasi, baca artikel secara utuh dan periksa sumber resmi yang tercantum. Konten yang baik membantu pembaca memahami konteks dan menentukan langkah berikutnya dengan tenang.
                        """, "saling-merangkul", "kebersamaan-di-kampus"),
                new DemoArticle(
                        "berita", "contoh-berita-aspirasi-dan-langkah-bersama",
                        "Dari Aspirasi Menuju Langkah Bersama",
                        "Catatan tentang mendengar kebutuhan mahasiswa dan merawat komunikasi dalam kerja organisasi.",
                        """
                        Aspirasi dapat dimulai dari pengalaman sehari-hari: sesuatu yang membantu, menghambat, atau ingin diperbaiki bersama. Mendengarkan pengalaman itu dengan terbuka menjadi bekal untuk merumuskan kerja yang lebih dekat dengan kebutuhan mahasiswa.

                        Percakapan yang sehat memberi ruang bagi pendapat yang berbeda. Catatan yang jelas, bahasa yang saling menghormati, dan kesediaan memeriksa kembali informasi membantu sebuah gagasan berkembang menjadi langkah bersama.

                        Semangat satu langkah bersama mengajak setiap bagian kabinet untuk saling mengisi. Peran yang berbeda dapat bertemu pada arah yang sama, yaitu kebermanfaatan bagi keluarga FH UNNES.
                        """, "kebersamaan-kabinet", "saling-merangkul"),
                new DemoArticle(
                        "kemahasiswaan", "contoh-kemahasiswaan-persiapan-beasiswa",
                        "Menyiapkan Dokumen Beasiswa dengan Teratur",
                        "Bahan bacaan umum untuk menata dokumen dan memeriksa informasi sebelum mencari kesempatan beasiswa.",
                        """
                        Persiapan beasiswa dapat dimulai dengan menata dokumen akademik dan administrasi yang sudah dimiliki. Simpan salinan yang mudah dibaca, gunakan nama berkas yang jelas, dan perbarui dokumen ketika ada perubahan.

                        Setiap penyelenggara dapat memiliki persyaratan yang berbeda. Baca ketentuan dari sumber resminya, periksa format berkas yang diminta, dan catat pertanyaan yang perlu dikonfirmasi langsung kepada penyelenggara.

                        Setelah dokumen tersusun, buat daftar persyaratan dari kanal resmi yang kamu temukan. Periksa kembali kelengkapan berkas dan tenggat pada pengumuman penyelenggara sebelum mengirimkan pendaftaran.
                        """, "ruang-belajar", "kaderisasi-dan-kebersamaan"),
                new DemoArticle(
                        "kemahasiswaan", "contoh-kemahasiswaan-aspirasi-dan-dukungan",
                        "Mengenali Jalur Aspirasi dan Dukungan Mahasiswa",
                        "Bahan bacaan tentang menyampaikan kebutuhan mahasiswa dengan konteks yang jelas dan tetap menjaga privasi.",
                        """
                        Ketika ingin menyampaikan kebutuhan atau kendala, mulailah dengan menjelaskan situasinya secara ringkas dan runtut. Bedakan pengalaman yang dialami sendiri dari informasi yang masih perlu diperiksa.

                        Pilih kanal komunikasi resmi yang sesuai dengan persoalan dan periksa kembali tujuan pengiriman. Hindari menyebarkan data pribadi melalui ruang publik, termasuk data milik orang lain yang belum memberi izin.

                        Catat tanggapan yang diterima dan tindak lanjut yang disepakati. Simpan informasi penting untuk membantu komunikasi berikutnya, lalu sesuaikan langkah dengan alur resmi yang berlaku.
                        """, "suara-dan-aksi", "ruang-kajian"),
                new DemoArticle(
                        "kemahasiswaan", "contoh-kemahasiswaan-ruang-bertumbuh",
                        "Bertumbuh melalui Kolaborasi Mahasiswa",
                        "Refleksi tentang belajar mengisi peran, bertukar gagasan, dan membangun kebiasaan kerja yang saling mendukung.",
                        """
                        Kegiatan mahasiswa dapat menjadi ruang belajar di luar perkuliahan. Bertukar gagasan, mendengarkan pengalaman teman, dan mencoba tanggung jawab baru membantu seseorang mengenali cara berkontribusi yang sesuai dengan dirinya.

                        Kolaborasi tidak selalu dimulai dari rencana besar. Membagi tugas dengan jelas, menyampaikan perkembangan pekerjaan, dan memberi umpan balik secara wajar merupakan kebiasaan kecil yang menjaga kerja bersama.

                        Setiap orang memiliki ritme dan kebutuhan yang berbeda. Ruang bertumbuh yang baik memberi kesempatan untuk belajar sambil tetap menghormati waktu, batas kemampuan, dan tanggung jawab akademik masing-masing.
                        """, "saling-merangkul", "kebersamaan-kabinet"),
                new DemoArticle(
                        "eksternal", "contoh-eksternal-memulai-kolaborasi",
                        "Memulai Kolaborasi dengan Tujuan yang Jelas",
                        "Catatan awal untuk merumuskan gagasan kerja sama yang relevan, terbuka, dan saling dipahami.",
                        """
                        Kolaborasi yang bermakna dimulai dari tujuan yang dapat dipahami bersama. Jelaskan kebutuhan yang ingin dijawab, pihak yang diharapkan terlibat, serta manfaat yang ingin dibangun melalui percakapan awal.

                        Setelah gagasan dipertemukan, bicarakan pembagian peran, batas kegiatan, dan cara berkomunikasi. Catatan yang disepakati membantu setiap pihak menjaga harapan dan mengurangi salah pengertian.

                        Rangkum hasil percakapan dalam dokumen yang mudah diperiksa bersama. Gunakan kanal resmi BEM FH UNNES untuk mempertemukan gagasan dan memastikan tindak lanjut mencapai pihak yang tepat.
                        """, "jejaring-dan-kolaborasi", "pertemuan-studi-banding"),
                new DemoArticle(
                        "eksternal", "contoh-eksternal-kepedulian-dan-pengabdian",
                        "Merawat Kepedulian dalam Pengabdian",
                        "Refleksi umum tentang mendengarkan kebutuhan masyarakat dan merencanakan keterlibatan secara bertanggung jawab.",
                        """
                        Kepedulian tumbuh ketika kita bersedia mendengarkan. Dalam merencanakan pengabdian, kebutuhan masyarakat sebaiknya dipahami melalui percakapan yang menghormati pengalaman dan pengetahuan mereka sendiri.

                        Bentuk keterlibatan dapat disesuaikan dengan kebutuhan serta kemampuan para pihak. Kejelasan peran, komunikasi yang sopan, dan dokumentasi yang menghargai privasi membantu menjaga kepercayaan selama proses berjalan.

                        Sesudah kegiatan selesai, luangkan waktu untuk mendengarkan umpan balik dan mencatat pembelajaran. Evaluasi bersama membantu merawat hubungan dan menyiapkan keterlibatan berikutnya dengan lebih peka.
                        """, "aksi-donor-darah", "aksi-donor-darah"),
                new DemoArticle(
                        "eksternal", "contoh-eksternal-ide-kreatif",
                        "Dari Ide Kreatif Menjadi Kerja Bersama",
                        "Bahan bacaan untuk mengembangkan ide, merawat jejaring, dan membagi peran dalam ruang kreatif mahasiswa.",
                        """
                        Ide kreatif dapat berangkat dari sesuatu yang dekat dengan keseharian mahasiswa. Amati kebutuhan yang ada, dengarkan masukan, dan rumuskan gagasan dalam bentuk yang mudah dibicarakan bersama.

                        Ketika ide mulai dikerjakan, bagi peran sesuai kemampuan dan sepakati cara mengevaluasi perkembangannya. Ruang untuk mencoba, memperbaiki, dan saling memberi dukungan membantu gagasan tumbuh secara bertahap.

                        Simpan catatan proses dan pembelajaran agar gagasan berikutnya memiliki pijakan. Jejaring yang saling mendukung dapat mempertemukan keterampilan berbeda dan membuka ruang kerja bersama yang bermanfaat.
                        """, "ruang-kreatif", "sinergi-kementerian")
        );
    }

    private record DemoArticle(String section, String slug, String title,
                               String description, String body, String previousCover, String cover) {}
}
