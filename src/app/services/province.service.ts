import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  pathApi=environment.pathApi

  constructor(private http: HttpClient) { }

  getProvince() {
    return this.http.get<any>(`${this.pathApi}/api/province`)
  }
}
