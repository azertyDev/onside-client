'use strict';

import { IImage } from './IImage';

export interface IClub {
    id?: number;
    name: string;
    link: string;
    image: IImage;
}
