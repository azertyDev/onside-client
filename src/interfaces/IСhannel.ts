'use strict';

import { IImage } from './IImage';

export interface IChannel {
    id?: number;
    name: string;
    link: string;
    image: IImage;
}
