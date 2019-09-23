import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  doLogin() {
    this.authService
      .login(this.loginData.email, this.loginData.password)
      .subscribe(token => {
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/']);
        }
      });
  }
}
