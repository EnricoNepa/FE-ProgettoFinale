import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  pathApi: string

  constructor(private http: HttpClient, private router: Router) {
    this.pathApi = environment.pathApi
  }

  getAll(p: number){
    console.log('getall')
    return this.http.get<any>(this.pathApi + '/api/users?page=' + p)
  }

  signup(item: any){
    console.log(item)
    return this.http.post<any>(this.pathApi + '/api/auth/signup', item)
  }

  login(item: any){
    console.log(item)
    return this.http.post<any>(this.pathApi + '/api/auth/login', item)
  }
  get isLogged(): boolean {
    return localStorage.getItem('utentecorrente') != null
  }
  get UtenteCorrente(): User{
    return JSON.parse(localStorage.getItem('utentecorrente')!) as User || null
  }

  logout() {
    localStorage.removeItem('utentecorrente');
    this.router.navigate(['']);
  }

}
