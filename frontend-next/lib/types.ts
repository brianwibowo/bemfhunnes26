export type ArticleSection = 'kemahasiswaan' | 'eksternal' | 'berita';
export type ArticleStatus = 'pending' | 'published' | 'inactive';
export type Article = { id:number; section:ArticleSection; title:string; slug:string; description:string; body:string; imageUrl?:string|null; status:ArticleStatus; publishedAt?:string|null; createdAt:string; updatedAt:string };
export type ArticlePage = { data:Article[]; pagination:{page:number;pageSize:number;total:number;totalPages:number} };
export type User = { id:number; email:string; role:'admin'|'superadmin' };
export const labels:Record<ArticleSection,string>={kemahasiswaan:'Kemahasiswaan', eksternal:'Eksternal', berita:'Berita'};
