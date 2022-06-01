import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  user = {
    nome:'',
    cognome:'',
    username:'',
    password:'',
    email:'',
    roles:[]
  }


  constructor(private fb: FormBuilder, private authSrv:AuthService, private router:Router, private location: Location) {
    this.form = this.fb.group({
      nome: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
      ]),
      cognome: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
        Validators.minLength(4)
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]*'),
        Validators.minLength(6),
      ]),
      email:new FormControl('',[Validators.required,Validators.pattern('[A-Za-z0-9.%-]+@[A-Za-z0-9.%-]+\.[a-z]{2,3}')]),
      roles:new FormControl([''])
    })

  }

  ngOnInit(): void {
  }

  signupSubmit(formValue:{
    nome:string,
    cognome:string,
    username:string,
    password:string,
    email:string,
    roles:never
  }){
    console.log(this.form.value)
    this.user.nome = formValue.nome
    this.user.cognome = formValue.cognome
    this.user.username = formValue.username
    this.user.email = formValue.email
    this.user.password = formValue.password
    this.user.roles.pop()
    this.user.roles.push(formValue.roles)

    this.authSrv.signup(this.user).subscribe((res)=>{
      alert(res)
      this.router.navigate(['/login'])
    })
  }

  backClicked() {
    this.location.back();
  }

}
