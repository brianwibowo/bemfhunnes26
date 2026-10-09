export interface ContentCard { title: string; description: string; label?: string; action?: string; icon?: string; imageUrl?: string | null; link?: string; }
export interface NewsItem { title: string; excerpt: string; category: string; date: string; imageUrl?: string | null; link?: string; }
export type ArticleSection = 'kemahasiswaan' | 'eksternal' | 'berita';
export type ArticleStatus = 'pending' | 'published' | 'inactive';
export interface Article { id: number; section: ArticleSection; title: string; slug: string; description: string; body: string; imageUrl?: string | null; status: ArticleStatus; publishedAt?: string | null; createdAt: string; updatedAt: string; }
export interface Pagination { page: number; pageSize: number; total: number; totalPages: number; }
export interface ArticlePage { data: Article[]; pagination: Pagination; }
