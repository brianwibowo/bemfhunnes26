import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { PageIntroComponent } from '../../shared/page-intro.component';
import { ContentCardComponent } from '../../shared/content-card.component';
import { PaginationComponent } from '../../shared/pagination.component';
import { ContentService } from '../../core/content.service';
import { Article, ArticlePage, ContentCard } from '../../core/content.models';

@Component({selector:'app-external-page',standalone:true,imports:[CommonModule,PageIntroComponent,ContentCardComponent,PaginationComponent],templateUrl:'./external-page.component.html',styleUrl:'./external-page.component.css'})
export class ExternalPageComponent {
  private readonly content=inject(ContentService);
  readonly fallback:ContentCard[]=[{title:'Media Partner',description:'Jalani kerja sama media partner dengan BEM FH UNNES.',action:'SOP media partner',icon:'↗'},{title:'Info Loker & Magang',description:'Temukan peluang kerja dan magang untuk menyiapkan langkah setelah kampus.',action:'Lihat peluang',icon:'⌁'},{title:'Kolaborasi Organisasi',description:'Bangun program bersama dan perluas dampak gerakan mahasiswa.',action:'Hubungi kami',icon:'◎'}];
  page=1; articles$!:Observable<ArticlePage>;
  constructor(){this.loadPage();}
  loadPage(page=1):void {this.page=page;this.articles$=this.content.getArticles('eksternal',page,6).pipe(map(result=>result.pagination.total?result:this.fallbackPage()));}
  fallbackPage():ArticlePage {const now=new Date().toISOString();return {data:this.fallback.map((card,index)=>({id:index+1,section:'eksternal',title:card.title,slug:'',description:card.description,body:card.description,imageUrl:null,status:'published',createdAt:now,updatedAt:now} as Article)),pagination:{page:1,pageSize:6,total:this.fallback.length,totalPages:1}};}
  toCard(article:Article):ContentCard{return {title:article.title,description:article.description,action:'Baca selengkapnya',icon:'✦',imageUrl:article.imageUrl,link:article.slug?`/eksternal/${article.slug}`:'/eksternal'};}
}
