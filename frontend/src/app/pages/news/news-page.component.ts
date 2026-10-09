import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { PageIntroComponent } from '../../shared/page-intro.component';
import { NewsCardComponent } from '../../shared/news-card.component';
import { PaginationComponent } from '../../shared/pagination.component';
import { ContentService } from '../../core/content.service';
import { Article, ArticlePage, NewsItem } from '../../core/content.models';

@Component({selector:'app-news-page',standalone:true,imports:[CommonModule,PageIntroComponent,NewsCardComponent,PaginationComponent],templateUrl:'./news-page.component.html',styleUrl:'./news-page.component.css'})
export class NewsPageComponent {
  private readonly content=inject(ContentService);
  readonly fallback:NewsItem[]=[{title:'Kabinet Laksana Adhikara resmi melangkah bersama',excerpt:'Mengenal arah gerak dan semangat yang akan menemani satu tahun kepengurusan.',category:'Kegiatan',date:'12 Jan 2026'},{title:'Ruang kajian: hukum yang dekat dengan kita',excerpt:'Catatan dan agenda diskusi dari ruang belajar BEM FH UNNES.',category:'Kajian',date:'08 Jan 2026'},{title:'Peluang beasiswa dan magang bulan ini',excerpt:'Daftar peluang yang bisa kamu siapkan mulai sekarang.',category:'Peluang',date:'04 Jan 2026'}];
  readonly selectedCategory=signal('Semua');
  readonly categories=['Semua','Kegiatan','Kajian','Peluang'];
  page=1; articles$!:Observable<ArticlePage>;
  constructor(){this.loadPage();}
  loadPage(page=1):void{this.page=page;this.articles$=this.content.getArticles('berita',page,6).pipe(map(result=>result.pagination.total?result:this.fallbackPage()));}
  fallbackPage():ArticlePage{const now=new Date().toISOString();return {data:this.fallback.map((item,index)=>({id:index+1,section:'berita',title:item.title,slug:'',description:item.excerpt,body:item.excerpt,imageUrl:item.imageUrl||null,status:'published',createdAt:now,updatedAt:now} as Article)),pagination:{page:1,pageSize:6,total:this.fallback.length,totalPages:1}};}
  selectCategory(category:string):void{this.selectedCategory.set(category);}
  toNews(article:Article):NewsItem{return {title:article.title,excerpt:article.description,category:this.categoryFor(article),date:new Date(article.publishedAt||article.createdAt).toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'}),imageUrl:article.imageUrl,link:article.slug?`/berita/${article.slug}`:'/berita'};}
  categoryFor(article:Article):string{return article.title.toLowerCase().includes('kajian')?'Kajian':article.title.toLowerCase().includes('beasiswa')||article.title.toLowerCase().includes('magang')?'Peluang':'Kegiatan';}
  matchesCategory(item:NewsItem):boolean{return this.selectedCategory()==='Semua'||item.category===this.selectedCategory();}
  visibleCount(items:Article[]):number{return items.map(item=>this.toNews(item)).filter(item=>this.matchesCategory(item)).length;}
}
