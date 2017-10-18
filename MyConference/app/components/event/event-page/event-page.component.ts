import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import { MdDialog } from '@angular/material';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IEvent } from '../../../shared/models/event';
import { IUserEvent } from '../../../shared/models/user-event';
import { AuthService } from '../../../shared/services/auth.service';
import { ArrayHelper } from '../../../shared/utils/array-helper';

import { EventDetailComponent } from '../event-detail/event-detail.component';


@Component({
    selector: 'event-page',
    templateUrl: 'dist/html/components/event/event-page/event-page.component.html',
    styleUrls: ['dist/css/components/event/event-page/event-page.component.css']
})
export class EventPageComponent implements OnInit {
    private eventsUrl: string = 'api/EventsApi';
    private userEventsUrl: string = 'api/UserEventsApi';
    private events: IEvent[];
    private groupedEvents: GroupedEvents[];
    private userEvents: IUserEvent[];

    get Events(): IEvent[] {
        return this.events;
    };

    set Events(value: IEvent[]) {
        if (value !== null) {
            this.events = value;
        }
    }

    flexLength(index: number): number {
        return 100/ this.groupedEvents[index].Events.length;
    }

    ngOnInit(): void {
        this.getEventes().subscribe(
            evnts => {
                this.Events = evnts;
                this.groupEvents();
            },
            err => {
                console.log(err);
            });
        if (this.authService.isAuthorized) {
            this.getUserEvents(this.authService.token.userName).subscribe(
                ue => {
                    console.log(ue);
                    this.userEvents = ue;
                },
                err => {
                    console.log(err);
                }
            );
        }

    }

    getEventes(): Observable<IEvent[]> {
        return this.http.get(this.eventsUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getUserEvents(userName: string): Observable<IUserEvent[]> {
        return this.http.get(this.userEventsUrl + '/?userName=' + userName)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    private groupEvents() {
        let dates = this.Events.map(e => e.Date);
        let uniqDates = ArrayHelper.getUniqeValues(dates);

        for (let date of uniqDates) {
            let group = new GroupedEvents();
            group.GroupingValue = date;
            group.Events = this.Events.filter(e => e.Date === date);
            this.groupedEvents.push(group);
        }
    }

    openDialog(data: IEvent): void {
        let dialogRef = this.dialog.open(EventDetailComponent, {
            width: '80vw',
            data: data
    });

        dialogRef.afterClosed().subscribe(() => {
            console.log('The dialog was closed');
        });
    }

    constructor(private http: Http, public dialog: MdDialog, private authService: AuthService) {
        this.Events = new Array<IEvent>();
        this.groupedEvents = new Array<GroupedEvents>();
    }

}

export class GroupedEvents {
    GroupingValue: Date;
    Events: IEvent[];

    constructor() {
        this.Events = new Array<IEvent>();
    }
}