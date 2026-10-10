import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageIntroComponent } from '../../shared/page-intro.component';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';
@Component({selector:'app-profile-page', standalone:true, imports:[CommonModule,PageIntroComponent,ScrollRevealDirective], templateUrl:'./profile-page.component.html', styleUrl:'./profile-page.component.css'})
export class ProfilePageComponent {
  readonly principles = [{title:'Berpihak pada mahasiswa',body:'Membuka ruang dengar yang aman, lalu mengubah aspirasi menjadi langkah yang terukur.'},{title:'Tumbuh lewat kolaborasi',body:'Menghubungkan elemen civitas FH UNNES agar energi baik dapat bergerak lebih jauh.'},{title:'Bekerja dengan integritas',body:'Merawat kepercayaan lewat kerja yang transparan, akuntabel, dan berdampak.'}];
  readonly missions = ['Reformulasi tata kelola BEM FH UNNES guna menciptakan iklim organisasi yang terstruktur dan kredibel.','Mendorong keberlanjutan harmoni dan sinergi antar elemen civitas FH UNNES agar tercapainya lingkungan kampus yang terintegrasi.','Merawat dan memperluas relasi kemitraan strategis dalam cakupan regional dan nasional.','Bergerak secara proaktif dalam mengawal dan mengadvokasi isu strategis serta melakukan pengabdian.'];
}
