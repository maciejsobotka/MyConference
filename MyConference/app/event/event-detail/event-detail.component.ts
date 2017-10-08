import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'event-detail',
    templateUrl: 'dist/html/event/event-detail/event-detail.component.html',
    styleUrls: ['dist/css/event/event-detail/event-detail.component.css']
})
export class EventDetailComponent {
    constructor(public dialogRef: MdDialogRef<EventDetailComponent>, @Inject(MD_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}