import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../Models/event'; // Assuming you have an Event model

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent {
  eventId: number = 0;
  event: Event = {} as Event;
  errMsg: string = '';
  isEventExist: boolean = false;
  originalEvent: Event = {} as Event;
  searchTerm: string = '';

  constructor(
    private http: HttpClient,
    private activateRoute: ActivatedRoute
  ) {
    this.activateRoute.params.subscribe((params) => {
      this.eventId = params['id'];
      this.loadEventDetails();
    });
  }

  loadEventDetails() {
    this.http.get<Event>('http://localhost:5121/api/Event/' + this.eventId).subscribe(
      (response) => {
        console.log(response);
        if (response != null) {
          this.event = response;
          this.originalEvent = { ...this.event };
          this.isEventExist = true;
          this.errMsg = '';
        } else {
          this.errMsg = 'Invalid Event Id';
          this.isEventExist = false;
        }
      },
      (error) => {
        console.error('Error loading event details:', error);
      }
    );
  }

  searchEvent() {
    if (this.searchTerm) {
      this.http.get<Event[]>('http://localhost:5121/api/Event/SearchEventByTitle?eventTitle=' + this.searchTerm).subscribe(
        (response) => {
          if (response && response.length > 0) {
            this.event = response[0];
            this.originalEvent = { ...this.event };
            this.isEventExist = true;
            this.errMsg = '';
          } else {
            this.errMsg = 'Event not found';
            this.isEventExist = false;
          }
        },
        (error) => {
          console.error('Error searching for event:', error);
        }
      );
    }
  }
}
