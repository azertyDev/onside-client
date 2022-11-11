'use strict';
export interface IMatchCenter {
    id?: number;
    date: string;
    host: string;
    guest: string;
    status?: boolean;
    publishedAt?: string;
    createdAt?: Date;
}
