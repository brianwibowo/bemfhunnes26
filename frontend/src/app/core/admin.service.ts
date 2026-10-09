import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, ArticlePage, ArticleSection, ArticleStatus } from './content.models';

export interface InsightResponse { counts:{section:ArticleSection;status:ArticleStatus;count:number}[]; users?:number; }
export interface AdminArticlePage extends ArticlePage { data:(Article & {author_email?:string})[]; }
@Injectable({providedIn:'root'})
export class AdminService {
  private readonly http=inject(HttpClient);
  list(section?:ArticleSection,page=1,status?:ArticleStatus):Observable<AdminArticlePage>{let params=new HttpParams().set('page',page).set('pageSize',6);if(section)params=params.set('section',section);if(status)params=params.set('status',status);return this.http.get<AdminArticlePage>('/api/admin/articles',{params});}
  get(id:number):Observable<{article:Article}>{return this.http.get<{article:Article}>(`/api/admin/articles/${id}`);}
  insights():Observable<InsightResponse>{return this.http.get<InsightResponse>('/api/admin/insights');}
  create(payload:FormData):Observable<{article:Article}>{return this.http.post<{article:Article}>('/api/admin/articles',payload);}
  update(id:number,payload:FormData):Observable<{article:Article}>{return this.http.patch<{article:Article}>(`/api/admin/articles/${id}`,payload);}
  setStatus(id:number,status:ArticleStatus):Observable<{article:Article}>{return this.http.patch<{article:Article}>(`/api/admin/articles/${id}/status`,{status});}
}
