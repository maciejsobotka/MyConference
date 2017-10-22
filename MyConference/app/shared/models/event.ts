export interface IEvent {
    Id: number;
    Name: string;
    Date: Date;
    StartTime: Date;
    EndTime: Date;
    Speaker: string;
    Topic: string;
    Chair: string;
    Location: string;
    Type: number;

    IsStarred: boolean;
}