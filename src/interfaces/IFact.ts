"use strict";

import { FactType } from "./FactType";

export interface IFact {
  id?:number;
  type: FactType;
  url:string;
  link:string;
  createdAt?: Date;
}
