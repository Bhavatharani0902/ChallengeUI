import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-get-all-event',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './get-all-event.component.html',
  styleUrl: './get-all-event.component.css'
})
export class GetAllEventComponent {
  Events: any[] = [];

  constructor(private http: HttpClient) {
    this.getAllEvent();
  }

  getAllEvent(): void {
    this.http.get<any[]>('http://localhost:5121/api/Event/GetAllEvents').subscribe((events) => {
      this.Events = events;
      console.log(this.Events);
    });
  }

}
