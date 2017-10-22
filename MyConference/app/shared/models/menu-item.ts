export interface IMenuItem {
    path: string;
    title: string;
    icon?: string;
    hidden?: boolean;
    hiddenToolbar?: boolean;
    authRequired?: boolean;
}