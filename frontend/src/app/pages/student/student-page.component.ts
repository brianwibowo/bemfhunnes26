import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { PageIntroComponent } from '../../shared/page-intro.component';
import { ContentCardComponent } from '../../shared/content-card.component';
import { PaginationComponent } from '../../shared/pagination.component';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';
import { ContentService } from '../../core/content.service';
import { Article, ArticlePage, ContentCard } from '../../core/content.models';

@Component({selector:'app-student-page', standalone:true, imports:[CommonModule,PageIntroComponent,ContentCardComponent,PaginationComponent,ScrollRevealDirective], templateUrl:'./student-page.component.html', styleUrl:'./student-page.component.css'})
export class StudentPageComponent {
  private readonly content=inject(ContentService);
  readonly fallback:ContentCard[]=[{title:'Advocare',description:'Informasi dan berita terbaru seputar kegiatan BEM FH UNNES Kabinet Laksana Adhikara.',action:'Contact Person Advocare',icon:'⚖'},{title:'Ruang Beasiswa',description:'Temukan beasiswa dan kesempatan pengembangan diri yang bisa kamu ikuti.',action:'Lihat peluang',icon:'✦'},{title:'Konseling Sebaya',description:'Ruang aman untuk berbagi, bertanya, dan menemukan dukungan bersama.',action:'Hubungi kami',icon:'◌'},{title:'Kajian Hukum',description:'Forum diskusi isu hukum yang dekat dengan kehidupan mahasiswa.',action:'Baca selengkapnya',icon:'◈'},{title:'Advokasi Akademik',description:'Pendampingan bagi mahasiswa dalam menyampaikan kebutuhan akademiknya.',action:'Pelajari layanan',icon:'↗'},{title:'Pengabdian',description:'Gerak bersama untuk memberi manfaat bagi kampus dan masyarakat.',action:'Ikut bergerak',icon:'✧'}];
  page=1;
  articles$!:Observable<ArticlePage>;
  constructor(){ this.loadPage(); }
  loadPage(page=1):void { this.page=page; this.articles$=this.content.getArticles('kemahasiswaan',page,6).pipe(map(result=>result.pagination.total?result:this.fallbackPage())); }
  fallbackPage():ArticlePage { const now=new Date().toISOString(); return {data:this.fallback.map((card,index)=>({id:index+1,section:'kemahasiswaan',title:card.title,slug:'',description:card.description,body:card.description,imageUrl:null,status:'published',createdAt:now,updatedAt:now} as Article)),pagination:{page:1,pageSize:6,total:this.fallback.length,totalPages:1}}; }
  toCard(article:Article):ContentCard { return {title:article.title,description:article.description,action:'Baca selengkapnya',icon:'✦',imageUrl:article.imageUrl,link:article.slug?`/kemahasiswaan/${article.slug}`:'/kemahasiswaan'}; }
}
