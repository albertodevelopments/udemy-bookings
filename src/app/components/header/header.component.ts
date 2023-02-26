import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  openLogin(){
    this.modalService.open(LoginComponent)
  }

  logout(){
    localStorage.removeItem('logged')
    this.router.navigate(['/add-booking'])
  }
}
