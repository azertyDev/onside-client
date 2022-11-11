'use strict';

import { IImage } from './IImage';
import { Role } from './Role';

export default interface IUser {
    id?: number;
    name: string;
    surname?: string;
    phone: string;
    email: string;
    password: string;
    recoveryPassword: string;
    isActive: number;
    role: Role;
    image: IImage;
    isAdmin?: boolean;
    expiredAt: string;
    createdat?: Date;
}
