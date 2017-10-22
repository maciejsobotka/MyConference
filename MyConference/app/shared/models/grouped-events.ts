import { IEvent } from './event';

export class GroupedEvents {
    GroupingValue: Date;
    Events: IEvent[];

    constructor() {
        this.Events = new Array<IEvent>();
    }
}