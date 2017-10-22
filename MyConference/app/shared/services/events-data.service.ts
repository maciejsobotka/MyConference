import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IEvent } from '../models/event';

@Injectable()
export class EventsDataService {
    private eventsUrl: string = 'api/EventsApi';
    private userEventsUrl: string = 'api/UserEventsApi';

    getEventes(): Observable<IEvent[]> {
        return this.http.get(this.eventsUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => {
                console.log(error);
                return Observable.throw(error.json().error || 'Server error');
            });
    }

    getStarredEventes(userName: string): Observable<IEvent[]> {
        return this.http.get(this.eventsUrl + '/?userName=' + userName)
            .map((res: Response) => res.json())
            .catch((error: any) => {
                console.log(error);
                return Observable.throw(error.json().error || 'Server error');
            });
    }

    constructor(private http: Http){}
}