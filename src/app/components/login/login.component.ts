import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  item:any
  form!: FormGroup
  user!: User

  constructor(private fb:FormBuilder, private authSrv:AuthService, private router:Router, private location: Location) {
    this.form = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9]*'),
        Validators.minLength(6),
      ]),
  })}

  ngOnInit(): void {
  }

  loginSubmit(formValue:{ value: any }) {
    console.log(formValue.value)
    this.item = formValue.value
    this.authSrv.login(this.item).subscribe(res =>{
      console.log(res)
      this.user = res
      localStorage.setItem('utentecorrente', JSON.stringify(this.user))
      this.router.navigate(['/areaclienti'])
    })
  }

  backClicked() {
    this.location.back();
  }

}
