import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminService, AdminArticlePage } from '../core/admin.service';
import { ArticleSection, ArticleStatus } from '../core/content.models';
import { PaginationComponent } from '../shared/pagination.component';

@Component({selector:'app-admin-article-list',standalone:true,imports:[CommonModule,RouterLink,PaginationComponent],template:`<section class="admin-content"><div class="admin-heading row"><div><p class="eyebrow">Konten / {{label}}</p><h1>{{label}}</h1><p class="muted">Kelola artikel, status publikasi, dan gambar yang tampil di website.</p></div><a class="create-button" [routerLink]="['/admin',section,'new']">+ Artikel baru</a></div><div class="list-toolbar"><div class="status-tabs"><button type="button" [class.active]="!status" (click)="setStatus()">Semua</button><button type="button" [class.active]="status === 'pending'" (click)="setStatus('pending')">Pending</button><button type="button" [class.active]="status === 'published'" (click)="setStatus('published')">Published</button><button type="button" [class.active]="status === 'inactive'" (click)="setStatus('inactive')">Nonaktif</button></div><span class="muted">{{result?.pagination?.total || 0}} artikel</span></div><div class="table-wrap"><table><thead><tr><th>Artikel</th><th>Status</th><th>Diperbarui</th><th class="actions-col">Aksi</th></tr></thead><tbody><tr *ngFor="let article of result?.data"><td><div class="article-cell"><div class="thumb" [style.background-image]="article.imageUrl ? 'url(' + article.imageUrl + ')' : null">{{article.imageUrl ? '' : '✦'}}</div><div><strong>{{article.title}}</strong><small>{{article.description}}</small></div></div></td><td><span class="status" [class]="article.status">{{article.status}}</span></td><td>{{article.updatedAt | date:'dd MMM yyyy, HH:mm'}}</td><td class="actions"><a [routerLink]="['/admin',section,article.id,'edit']">Edit</a><button *ngIf="article.status !== 'published'" type="button" (click)="changeStatus(article.id,'published')">Publish</button><button *ngIf="article.status === 'published'" type="button" (click)="changeStatus(article.id,'inactive')">Nonaktifkan</button></td></tr><tr *ngIf="!result?.data?.length"><td colspan="4" class="empty">Belum ada artikel di rubrik ini.</td></tr></tbody></table></div><app-pagination *ngIf="result" [meta]="result.pagination" (pageChange)="load($event)" /></section>`,styles:[`.admin-content{padding:42px;max-width:1250px}.row{display:flex;align-items:end;justify-content:space-between;gap:20px}.admin-heading h1{font:600 clamp(2rem,4vw,3rem)/1 'Space Grotesk';margin:8px 0}.muted{color:#7b706b}.create-button{padding:12px 16px;border-radius:10px;background:#2b1410;color:#fff;font-weight:600;font-size:.88rem}.list-toolbar{display:flex;justify-content:space-between;gap:15px;align-items:center;margin:34px 0 14px}.status-tabs{display:flex;gap:7px;flex-wrap:wrap}.status-tabs button{padding:8px 12px;border:1px solid #ded7d0;border-radius:999px;background:#fff;color:#756963;cursor:pointer}.status-tabs button.active,.status-tabs button:hover{background:#2b1410;color:#fff;border-color:#2b1410}.table-wrap{overflow-x:auto;border:1px solid #e4ded7;border-radius:16px;background:#fff}table{width:100%;border-collapse:collapse;min-width:760px}th,td{text-align:left;padding:16px 18px;border-bottom:1px solid #eee9e3;font-size:.86rem}th{color:#766b66;font-size:.75rem;text-transform:uppercase;letter-spacing:.08em}.article-cell{display:flex;align-items:center;gap:12px;min-width:280px}.article-cell strong{display:block;font-size:.9rem}.article-cell small{display:block;color:#887b75;margin-top:4px;max-width:360px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.thumb{width:48px;height:48px;border-radius:10px;display:grid;place-items:center;flex:none;background:linear-gradient(135deg,#e4b03d,#a51726);color:#fff;background-size:cover;background-position:center}.status{display:inline-flex;padding:5px 9px;border-radius:999px;font-size:.72rem;font-weight:700;text-transform:capitalize}.status.pending{background:#fff2d7;color:#a36310}.status.published{background:#dff6e9;color:#167244}.status.inactive{background:#ece8e5;color:#71655f}.actions{white-space:nowrap}.actions a,.actions button{border:0;background:none;color:#9b6412;font:600 .82rem 'DM Sans';cursor:pointer;margin-right:12px}.actions button:hover,.actions a:hover{text-decoration:underline}.empty{text-align:center;padding:48px;color:#887b75}@media(max-width:700px){.admin-content{padding:28px 20px}.row{display:grid}.list-toolbar{align-items:start;display:grid}}`]})
export class AdminArticleListComponent {
  private readonly admin=inject(AdminService);
  private readonly route=inject(ActivatedRoute);
  section:ArticleSection='berita';
  label='Berita';
  result:AdminArticlePage|null=null;
  status?:ArticleStatus;
  constructor(){
    this.route.paramMap.subscribe(params=>{
      const section=params.get('section') as ArticleSection;
      if(!['kemahasiswaan','eksternal','berita'].includes(section)) return;
      this.section=section;
      this.label={kemahasiswaan:'Kemahasiswaan',eksternal:'Eksternal',berita:'Berita'}[section];
      this.status=undefined;
      this.load();
    });
  }
  load(page=1):void{this.admin.list(this.section,page,this.status).subscribe({next:value=>this.result=value});}
  setStatus(status?:ArticleStatus):void{this.status=status;this.load();}
  changeStatus(id:number,status:ArticleStatus):void{this.admin.setStatus(id,status).subscribe(()=>this.load(this.result?.pagination.page||1));}
}
