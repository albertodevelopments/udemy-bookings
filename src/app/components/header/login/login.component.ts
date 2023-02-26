import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup  
  public showLoginSuccess: boolean
  public showLoginError: boolean

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formLogin = this.formBuilder.group({
      user: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required)
    })
    this.showLoginError = false
    this.showLoginSuccess = false
   }

  ngOnInit(): void {
  }

  checkLogin(){
    this.showLoginError = false
    this.showLoginSuccess = false

    this.authService.login(this.formLogin.value).subscribe(success => {
      if(success){
        this.showLoginSuccess = success
        this.router.navigate(['/list-bookings'])
        this.activeModal.close()
        localStorage.setItem('logged', "1")
      }else{
        this.showLoginError = !success
      }
    })
  }

}
