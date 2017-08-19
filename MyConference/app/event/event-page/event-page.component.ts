import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-event-page',
  templateUrl: 'dist/html/event/event-page/event-page.component.html',
  styleUrls: ['dist/css/event/event-page/event-page.component.css']
})
export class EventPageComponent implements OnInit{
    private eventsUrl: string = 'api/EventsApi';
    private events: Event[];

    get Events(): Event[] {
        return this.events;
    };
    set Events(value: Event[]) {
        if (value !== null) {
            this.events = value;
        }
    }

    ngOnInit(): void {
        this.getEventes();
    }

    getEventes(): Promise<Event[]> {
        return this.http.get(this.eventsUrl)
            .toPromise()
            .then(response => this.Events = (response.json().data as Event[]))
            .catch(this.handleError);
    }
 
    private handleError(error: any): Promise < any > {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    constructor(private http: Http) {
        this.Events = new Array<Event>();
    }

}

export class Event {
    Date: Date;
    Name: string;

    constructor() {
        this.Date = new Date();
    }
}