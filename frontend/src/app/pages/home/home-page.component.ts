import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentCardComponent } from '../../shared/content-card.component';
import { ContentService } from '../../core/content.service';
import { ContentCard } from '../../core/content.models';
import { ScrollRevealDirective } from '../../shared/scroll-reveal.directive';

@Component({selector:'app-home-page', standalone:true, imports:[CommonModule,RouterLink,ContentCardComponent,ScrollRevealDirective], templateUrl:'./home-page.component.html', styleUrl:'./home-page.component.css'})
export class HomePageComponent {
  private readonly content = inject(ContentService);
  readonly quickLinks: ContentCard[] = [{title:'Berita',description:'Informasi dan berita terbaru seputar kegiatan BEM FH UNNES Kabinet Laksana Adhikara.',action:'Lihat berita',icon:'✦'},{title:'Kajian',description:'Ruang bertukar gagasan dan membaca isu hukum dengan perspektif yang relevan.',action:'Buka kajian',icon:'◌'},{title:'Beasiswa',description:'Informasi beasiswa, kesempatan belajar, dan lowongan untuk mahasiswa.',action:'Lihat peluang',icon:'↗'}];
  readonly cards$ = this.content.getCards('home', this.quickLinks);
}
