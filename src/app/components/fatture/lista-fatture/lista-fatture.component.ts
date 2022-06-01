import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FattureService } from 'src/app/services/fatture.service';

@Component({
  selector: 'app-lista-fatture',
  templateUrl: './lista-fatture.component.html',
  styleUrls: ['./lista-fatture.component.scss']
})
export class ListaFattureComponent implements OnInit {

  fatture!: any;
  sub!: Subscription;
  clientId!: number;
  check!: boolean;
  loading=false
  constructor(
    private fatturaSrv: FattureService,
    private currentRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.GetClientId();

    if (this.clientId) {
      this.loading=true
      this.fatturaSrv
        .getFattureByCliente(this.clientId, 0, 20)
        .subscribe((res) => {
          console.log(res);
          this.fatture = res;
          this.loading=false
        });
    } else {
      this.loading=true
      this.fatturaSrv.getAll(0, 20).subscribe((res) => {
        this.fatture = res;
        this.loading=false
        console.log(this.fatture.content, this.fatture);
      });
    }
  }
  onPageEvent(event: PageEvent) {
    console.log(event.pageIndex, event.pageSize);
    if (this.clientId) {
      this.loading=true
      this.fatturaSrv.getFattureByCliente(this.clientId,event.pageIndex,event.pageSize).subscribe(
        res=>{
          this.fatture = res
          this.loading=false
        })
      }
     else {
      this.loading=true
      this.fatturaSrv
        .getAll(event.pageIndex, event.pageSize)
        .subscribe((res) => {
          this.fatture = res;
          this.loading=false
          console.log(this.fatture, this.fatture.content);
        });
    }
  }
  delete(id: number) {
    console.log(id);
    for(let i=0;i<this.fatture.content.length;i++){
      if(this.fatture.content[i].id==id){
      this.fatture.content.splice(i,1)
      console.log(this.fatture.content)
      }
    }
    this.fatturaSrv.deleteFattura(id).subscribe((res) => {
      console.log(res);
      this.fatture.content=[...this.fatture.content]
    });
  }
  GetClientId() {
    this.sub = this.currentRoute.params.subscribe((res) => {
      console.log(res);
      this.clientId = +res['id'];
      console.log(this.clientId);
    });
    if (this.clientId) {
      this.check = true;
    } else {
      this.check = false;
    }
  }

}

