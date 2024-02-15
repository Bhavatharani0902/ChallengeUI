import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../Models/user';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { Router } from '@angular/router';
@Component({
  selector: 'app-template-driven-demo1',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  user: User;

  constructor(private http: HttpClient,private router:Router) {
    this.user = new User();
  }

  onSubmit(): void {
    console.log(JSON.stringify(this.user, null, 2));
    

    const apiUrl = 'http://localhost:5121/api/User/Register'; 
    this.http.post(apiUrl, this.user).subscribe(
      (response) => {
        console.log('User added successfully:', response);
      },
      (error) => {
        console.error('Error adding user:', error);
      }
      
    );
    this.router.navigateByUrl('login')
  }
  onReset(form: NgForm): void {
    form.reset();
  }
 
  }