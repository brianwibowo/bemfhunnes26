import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Article, ArticlePage, ArticleSection, ContentCard, NewsItem } from './content.models';

@Injectable({providedIn:'root'})
export class ContentService {
  private readonly http = inject(HttpClient);
  private readonly api = '/api';
  getArticles(section: ArticleSection, page = 1, pageSize = 6): Observable<ArticlePage> {
    return this.http.get<ArticlePage>(`${this.api}/articles`, {params: {section, page, pageSize}}).pipe(catchError(() => of({data: [], pagination: {page, pageSize, total: 0, totalPages: 0}})));
  }
  getArticle(slug:string):Observable<Article>{return this.http.get<{article:Article}>(`${this.api}/articles/${slug}`).pipe(map(result=>result.article));}
  getCards(section: string, fallback: ContentCard[]): Observable<ContentCard[]> {
    if (!['kemahasiswaan', 'eksternal', 'berita'].includes(section)) return of(fallback);
    return this.getArticles(section as ArticleSection).pipe(map(result => result.data.length ? result.data.map(article => ({title: article.title, description: article.description, action: 'Baca selengkapnya', icon: '✦', imageUrl: article.imageUrl})) : fallback));
  }
  getNews(fallback: NewsItem[]): Observable<NewsItem[]> {
    return this.getArticles('berita').pipe(map(result => result.data.length ? result.data.map(article => ({title: article.title, excerpt: article.description, category: 'Berita', date: new Date(article.publishedAt || article.createdAt).toLocaleDateString('id-ID', {day: '2-digit', month: 'short', year: 'numeric'}), imageUrl: article.imageUrl})) : fallback));
  }
}
