import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComuniService {

  pathApi=environment.pathApi

  constructor(private http:HttpClient) { }

  getComuni(){
    return this.http.get<any>(`${this.pathApi}/api/comuni`)
      }
}
