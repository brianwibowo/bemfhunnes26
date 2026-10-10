import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Directive({selector:'[appScrollReveal]',standalone:true})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  private observer?:IntersectionObserver;
  constructor(private readonly element:ElementRef<HTMLElement>, private readonly renderer:Renderer2){}
  ngAfterViewInit():void{
    this.renderer.addClass(this.element.nativeElement,'reveal-ready');
    if(typeof IntersectionObserver==='undefined'){this.renderer.addClass(this.element.nativeElement,'reveal-visible');return;}
    this.observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){this.renderer.addClass(this.element.nativeElement,'reveal-visible');this.observer?.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -40px'});
    this.observer.observe(this.element.nativeElement);
  }
  ngOnDestroy():void{this.observer?.disconnect();}
}
