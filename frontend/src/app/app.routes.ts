import { Routes } from '@angular/router';
import { SiteShellComponent } from './layout/site-shell.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { ProfilePageComponent } from './pages/profile/profile-page.component';
import { StudentPageComponent } from './pages/student/student-page.component';
import { ExternalPageComponent } from './pages/external/external-page.component';
import { NewsPageComponent } from './pages/news/news-page.component';
import { ArticlePageComponent } from './pages/article/article-page.component';
import { AdminLoginComponent } from './admin/admin-login.component';
import { AdminLayoutComponent } from './admin/admin-layout.component';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { AdminArticleListComponent } from './admin/admin-article-list.component';
import { AdminArticleEditorComponent } from './admin/admin-article-editor.component';
import { adminGuard } from './core/admin.guard';

export const routes: Routes = [
  {path:'admin', children:[
    {path:'login', component:AdminLoginComponent, title:'Login Admin — BEM FH UNNES'},
    {path:'', component:AdminLayoutComponent, canActivate:[adminGuard], children:[
      {path:'', component:AdminDashboardComponent, title:'Beranda Admin — BEM FH UNNES'},
      {path:':section/new', component:AdminArticleEditorComponent, title:'Artikel Baru — BEM FH UNNES'},
      {path:':section/:id/edit', component:AdminArticleEditorComponent, title:'Edit Artikel — BEM FH UNNES'},
      {path:':section', component:AdminArticleListComponent, title:'Kelola Artikel — BEM FH UNNES'}
    ]}
  ]},
  {path:'', component:SiteShellComponent, children:[
    {path:'', pathMatch:'full', redirectTo:'beranda'},
    {path:'beranda', component:HomePageComponent, title:'Beranda — BEM FH UNNES 2026'},
    {path:'profil', component:ProfilePageComponent, title:'Profil — BEM FH UNNES 2026'},
    {path:'kemahasiswaan', component:StudentPageComponent, title:'Kemahasiswaan — BEM FH UNNES 2026'},
    {path:'eksternal', component:ExternalPageComponent, title:'Eksternal — BEM FH UNNES 2026'},
    {path:'berita', component:NewsPageComponent, title:'Berita — BEM FH UNNES 2026'},
    {path:':section/:slug', component:ArticlePageComponent, title:'Artikel — BEM FH UNNES 2026'}
  ]},
  {path:'**', redirectTo:'beranda'}
];
