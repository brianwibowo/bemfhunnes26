import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagination } from '../core/content.models';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `<nav class="pagination" *ngIf="meta().total > 0" aria-label="Pagination artikel"><button type="button" [disabled]="meta().page === 1" (click)="pageChange.emit(meta().page - 1)" aria-label="Halaman sebelumnya">←</button><span>Halaman {{meta().page}} dari {{meta().totalPages}}</span><button type="button" [disabled]="meta().page === meta().totalPages" (click)="pageChange.emit(meta().page + 1)" aria-label="Halaman berikutnya">→</button></nav>`,
  styles: [`.pagination{display:flex;justify-content:center;align-items:center;gap:16px;margin:34px 0 12px;color:var(--muted);font-size:.9rem}.pagination button{width:40px;height:40px;border:1px solid var(--line);border-radius:10px;background:rgba(255,255,255,.05);color:var(--ink);cursor:pointer}.pagination button:hover:not(:disabled){background:rgba(255,255,255,.14)}.pagination button:disabled{opacity:.35;cursor:not-allowed}`]
})
export class PaginationComponent { meta = input.required<Pagination>(); pageChange = output<number>(); }
