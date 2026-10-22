import type { Article, ArticlePage, ArticleSection, ArticleStatus, User } from './types';

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
export async function api<T>(path:string, init?:RequestInit):Promise<T>{
  const headers = new Headers(init?.headers); if (!(init?.body instanceof FormData)) headers.set('Content-Type','application/json');
  if (typeof window !== 'undefined') { const token=localStorage.getItem('bemfh_token'); if(token) headers.set('Authorization',`Bearer ${token}`); }
  const response=await fetch(`${API_URL}${path}`,{...init,headers,cache:'no-store'}); const data=await response.json().catch(()=>({}));
  if(!response.ok) throw new Error(data.message || 'Permintaan gagal.'); return data as T;
}
export function getArticles(section:ArticleSection,page=1){return api<ArticlePage>(`/api/articles?section=${section}&page=${page}&pageSize=6`)}
export function getArticle(slug:string){return api<{article:Article}>(`/api/articles/${slug}`)}
export async function login(email:string,password:string){const result=await api<{token:string;user:User}>('/api/auth/login',{method:'POST',body:JSON.stringify({email,password})}); localStorage.setItem('bemfh_token',result.token); localStorage.setItem('bemfh_user',JSON.stringify(result.user)); return result;}
export function getUser():User|null{if(typeof window==='undefined')return null;try{const raw=localStorage.getItem('bemfh_user');return raw?JSON.parse(raw):null}catch{return null}}
export function logout(){localStorage.removeItem('bemfh_token');localStorage.removeItem('bemfh_user');}
export function adminArticles(section?:ArticleSection,status?:ArticleStatus){const q=new URLSearchParams({page:'1',pageSize:'50'});if(section)q.set('section',section);if(status)q.set('status',status);return api<ArticlePage & {data:Article[]}>(`/api/admin/articles?${q}`)}
export function adminInsights(){return api<{counts:{section:ArticleSection;status:ArticleStatus;count:number}[]}>('/api/admin/insights')}
