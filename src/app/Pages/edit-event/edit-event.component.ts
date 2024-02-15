import { Component } from '@angular/core';
import { Event } from '../../Models/event'; // Assuming you have an Event model
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editevent',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent {
  eventId?: number = 0;
  event: Event;
  errMsg: String = '';
  isEventExist: boolean = false;
  originalEvent: Event = {} as Event;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.event = new Event();
    this.activateRoute.params.subscribe((params) => (this.eventId = params['rid']));
    console.log(this.eventId);
    this.search();
  }

  search() {
    this.http
      .get<Event>('http://localhost:5121/api/Event/' + this.eventId)
      .subscribe((response) => {
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
      });
  }

  updateEvent() {
    this.http.put<any>('http://localhost:5121/api/Event/'+ this.eventId, this.event)
      .subscribe(
        (response) => {
          console.log('Event updated successfully:', response);
          this.router.navigateByUrl('admin-dashboard/getallevent');
        },
        (error) => {
          console.error('Error updating event:', error);
        }
      );
  }

  delete() {
    this.eventId = this.event.eventId;
    this.http
      .delete('http://localhost:5121/api/Event/DeleteEvent/' + this.eventId)
      .subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('admin-dashboard/getallevent');
      });
  }
}
