import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  newEvent: any = {
    title: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: '',
    registrationFee: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  addEvent(): void {
    this.http.post<any>('http://localhost:5121/api/Event/CreateEvent', this.newEvent).subscribe(
      (response) => {
        console.log('Event added successfully:', response);

        this.router.navigate(['/getallevent']);
      },
      (error) => {
        console.error('Error adding event:', error);
      }
    );
  }

  resetForm(): void {
    this.newEvent = {
      title: '',
      author: '',
      genre: '',
      isbn: '',
      publishDate: ''
    };
  }

}
