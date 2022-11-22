'use strict';

import { FactType } from './FactType';

export interface IFact {
    id?: number;
    title: string;
    type: FactType;
    url: string;
    link: string;
    amountViews?: number;
    createdAt?: Date;
}
