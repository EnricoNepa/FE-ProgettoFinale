import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-lista-users',
  templateUrl: './lista-users.component.html',
  styleUrls: ['./lista-users.component.scss']
})
export class ListaUsersComponent implements OnInit {

  dataUsers:any
  page!:number
  loading=false

  displayedColumns: string[] = ['Id', 'email', 'roles']

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.loading=true
    this.authSrv.getAll(this.page).subscribe((res)=>{
      this.dataUsers = res
      this.loading=false
    })
  }

  onPageEvent(event:PageEvent){
    this.loading=true
    this.authSrv.getAll(event.pageIndex).subscribe(res=>{
      this.dataUsers=res
      this.loading=false
    })
  }

}
