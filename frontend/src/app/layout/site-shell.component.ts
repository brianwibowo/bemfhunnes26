import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({selector:'app-site-shell', standalone:true, imports:[CommonModule,RouterLink,RouterLinkActive,RouterOutlet], templateUrl:'./site-shell.component.html', styleUrl:'./site-shell.component.css'})
export class SiteShellComponent {
  menuOpen = signal(false);
  scrolled = signal(false);
  readonly nav = [{label:'Beranda',path:'/beranda'},{label:'Profil',path:'/profil'},{label:'Kemahasiswaan',path:'/kemahasiswaan'},{label:'Eksternal',path:'/eksternal'},{label:'Berita',path:'/berita'}];
  toggleMenu(): void { this.menuOpen.update(open => !open); }
  closeMenu(): void { this.menuOpen.set(false); }
  @HostListener('window:resize') onResize(): void { if (window.innerWidth > 760) this.menuOpen.set(false); }
  @HostListener('window:scroll') onScroll(): void { this.scrolled.set(window.scrollY > 24); }
}
