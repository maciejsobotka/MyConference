import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable'
import { MdDialog } from '@angular/material';

import { EventDetailComponent } from '../event-detail/event-detail.component';
import { IEvent } from '../../../shared/models/event';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AuthService } from '../../../shared/services/auth.service';
import { ArrayHelper } from '../../../shared/utils/array-helper';


@Component({
    selector: 'event-personal-page',
    templateUrl: 'dist/html/components/event/event-personal-page/event-personal-page.component.html',
    styleUrls: ['dist/css/components/event/event-personal-page/event-personal-page.component.css']
})
export class EventPersonalPageComponent implements OnInit {
    private eventsUrl: string = 'api/EventsApi';
    private events: IEvent[];
    private groupedEvents: GroupedEvents[];

    get AnyEvents(): boolean {
        return this.Events.length > 0;
    }

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
                if (this.AnyEvents) {
                    this.groupEvents();
                }
            },
            err => console.log(err));

    }

    getEventes(): Observable<IEvent[]> {
        return this.http.get(this.eventsUrl + '/?userName=' + this.authService.token.userName)
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