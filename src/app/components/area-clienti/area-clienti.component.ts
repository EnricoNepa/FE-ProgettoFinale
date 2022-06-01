import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-clienti',
  templateUrl: './area-clienti.component.html',
  styleUrls: ['./area-clienti.component.scss']
})
export class AreaClientiComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  clienti(){
    this.router.navigate(['/clienti'])
  }
  fatture(){
    this.router.navigate(['/fatture'])
  }
  users(){
    this.router.navigate(['/users'])
  }
}
