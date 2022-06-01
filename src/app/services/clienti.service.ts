import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientiService {

  pathApi: string
  constructor(private http: HttpClient) {
    this.pathApi = environment.pathApi
  }

  getAll(p: number){
    console.log('getall')
    return this.http.get<any>(this.pathApi + '/api/clienti?page=' + p)
  }

  delete(p: number){
    console.log('delete')
    return this.http.delete<any>(this.pathApi + '/api/clienti/' + p)
  }

  setCliente(data:any,id:number){
    if(id!=0){
      return this.http.put(`${this.pathApi}/api/clienti/${id}`,data)
    }
   console.log(data)
     return this.http.post(
       `${this.pathApi}/api/clienti`,data
     )
   }
   getTipoCliente() {
     return this.http.get(`${this.pathApi}/api/clienti/tipicliente`);
   }
   getClientById(id: number) {
     return this.http.get<any>(`${this.pathApi}/api/clienti/${id}`);
   }
   deleteClients(id: number) {
     return this.http.delete<any>(`${this.pathApi}/api/clienti/${id}`);
   }
}
