import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface AuthUser { id: number; email: string; role: 'admin' | 'superadmin'; }
interface LoginResponse { token: string; user: AuthUser; }

@Injectable({providedIn:'root'})
export class AuthService {
  private readonly http=inject(HttpClient);
  private readonly router=inject(Router);
  private readonly tokenKey='bemfh_admin_token';
  private readonly userKey='bemfh_admin_user';
  login(email:string,password:string):Observable<LoginResponse>{return this.http.post<LoginResponse>('/api/auth/login',{email,password}).pipe(tap(result=>{localStorage.setItem(this.tokenKey,result.token);localStorage.setItem(this.userKey,JSON.stringify(result.user));}));}
  token():string|null{return localStorage.getItem(this.tokenKey);}
  user():AuthUser|null{const value=localStorage.getItem(this.userKey);try{return value?JSON.parse(value) as AuthUser:null;}catch{return null;}}
  isAuthenticated():boolean{return !!this.token();}
  logout():void{localStorage.removeItem(this.tokenKey);localStorage.removeItem(this.userKey);this.router.navigateByUrl('/admin/login');}
}
