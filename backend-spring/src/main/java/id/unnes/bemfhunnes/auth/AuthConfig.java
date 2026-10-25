package id.unnes.bemfhunnes.auth;

import id.unnes.bemfhunnes.article.ArticleSeeder;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthConfig {
    @Bean
    public CommandLineRunner seedUsers(AuthService auth, ArticleSeeder articles) {
        return args -> {
            auth.seed();
            articles.seed();
        };
    }
}
