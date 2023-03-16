import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm?: FormGroup;
  returnUrl?: string;

  constructor(private accountService: AccountService, 
    private router: Router
    ,private activatedRoute: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams["returnUrl"] || '/shop'
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, 
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm)
      this.accountService.login(this.loginForm.value).subscribe(() => {
        console.log('user logged in');
        this.router.navigateByUrl("/shop")
      }, error => {
        console.log(error);
      })
  }
  isEmailRequiredError(){
    var errors = this.loginForm?.get('email')?.errors;
    if(errors){
      return this.loginForm?.get('email')?.invalid 
      && this.loginForm?.get('email')?.touched 
      && errors['required'];
    }

    return false; 
  }
  isPasswordRequiredError(){
    var errors = this.loginForm?.get('password')?.errors;
    if(errors){
      return this.loginForm?.get('password')?.invalid 
      && this.loginForm?.get('password')?.touched 
      && errors['required'];
    }

    return false; 
  }
  isEmailPatternError(){
    var errors = this.loginForm?.get('email')?.errors;
    if(errors){
      return this.loginForm?.get('email')?.invalid 
      && this.loginForm?.get('email')?.touched 
      && errors['pattern'];
    }

    return false; 
  }
}
