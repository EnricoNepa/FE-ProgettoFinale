import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ClientiService } from 'src/app/services/clienti.service';

@Component({
  selector: 'app-lista-clienti',
  templateUrl: './lista-clienti.component.html',
  styleUrls: ['./lista-clienti.component.scss']
})
export class ListaClientiComponent implements OnInit {

  dataClienti:any
  page!:number
  loading=false

  displayedColumns: string[] = ['Id', 'ragioneSociale', 'emailContatto', 'partitaIva', 'infoButton','editButton','deleteButton']

  constructor(private clientiSrv: ClientiService) { }

  ngOnInit(): void {
    this.loading=true
    this.clientiSrv.getAll(this.page).subscribe((res)=>{
      this.dataClienti = res
      this.loading=false
    })
  }

  onPageEvent(event:PageEvent){
    this.loading=true
    this.clientiSrv.getAll(event.pageIndex).subscribe(res=>{
      this.dataClienti=res
      this.loading=false
    })
  }

  delete(id: number) {
    console.log(id);
    this.dataClienti.content[id];
    this.clientiSrv.delete(id).subscribe((res) => {});
  }
}
