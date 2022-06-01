import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FattureService {

  pathApi: string
  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi
  }

  getAll(p:number,size:number){
    console.log('getall')
    return this.http.get<any>(`${this.pathApi}/api/fatture?page=${p}&size=${size}`)
  }

  getFattureById(id:number){
    return this.http.get<any>(`${this.pathApi}/api/fatture/${id}`)
  }
  getFattureByCliente(id:number,page:number,size:number){
 return this.http.get<any>(`${this.pathApi}/api/fatture/cliente/${id}?page=${page}&size=${size}`)
  }

  //post / put fattura

  setFattura(id:number,data:any){
    if (id==0){
return this.http.post(`${this.pathApi}/api/fatture`,data)
    }else{
return  this.http.put(`${this.pathApi}/api/fatture/${id}`,data)
    }
  }

  //elimina fattura
  deleteFattura(id:number){
  return this.http.delete(`${this.pathApi}/api/fatture/${id}`)
  }

  //stato Fattura
  getStatiFattura(){
    return this.http.get<any>(`${this.pathApi}/api/statifattura`)
  }

  getStatoFatturaById(id:number){

  }
}
