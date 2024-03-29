import { Component } from '@angular/core';
import { User } from '../../Models/user';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: User;
  email: string = '';
  password: string = '';
  errMsg: string = '';
  httpResponse: any;
  constructor(private http: HttpClient, private router: Router) {
    this.user = new User(); 
  }
  onSubmit(): void {
    let login = { Email: this.email, Password: this.password };
    this.http
      .post('http://localhost:5121/api/User/Validate', login)
      .subscribe((response) => {
        this.httpResponse = response;
        console.log(this.httpResponse);
        if (this.httpResponse.token != null) {
         
          localStorage.setItem('token', this.httpResponse.token);
          localStorage.setItem('userId', this.httpResponse.userID);
          localStorage.setItem('email', this.httpResponse.email);
          if (this.httpResponse.role == 'User') {
            this.router.navigateByUrl('user-dashboard');
          } else if (this.httpResponse.role == 'Admin') {
            this.router.navigateByUrl('admin-dashboard');
          }
         
         
        } else {
          this.errMsg = 'Invalid Credentials';
          console.log(this.errMsg);
        }
      });
  }

  onReset(form: NgForm): void {
    form.reset();
  }
}