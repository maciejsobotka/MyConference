import { Component, Inject } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { AuthService } from '../../../shared/services/auth.service';
import { IEvent } from '../../../shared/models/event';

@Component({
    selector: 'event-detail',
    templateUrl: 'dist/html/components/event/event-detail/event-detail.component.html',
    styleUrls: ['dist/css/components/event/event-detail/event-detail.component.css']
})
export class EventDetailComponent {
    private headers = new Headers({ 'Content-Type': 'application/json' });

    onNoClick(): void {
        this.dialogRef.close();
    }

    onStarClick(): void {
        this.http.post('/api/UserEventsApi',
                JSON.stringify({ EventId: this.data.Id, UserName: this.authService.token.userName }),
                new RequestOptions({ headers: this.headers }))
            .subscribe(() => {});
    }

    constructor(public dialogRef: MdDialogRef < EventDetailComponent >, @Inject(MD_DIALOG_DATA) public data: IEvent, private authService: AuthService, private http: Http) { }
}