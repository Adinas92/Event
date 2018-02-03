import { User } from "../../app.models";



export type EventId = number | string;

export interface EventE {
    id?: EventId;
    name: string;
    eventType: string;
    point: PointE;
    address?: Address;
    beginningDateTime: string;
    endingDateTime: string;
    user?: User;
    confirm?: boolean;
    urlPicture?: string;
  }
  export interface PointE {
    id?: Number;
    longitude: Number;
    latitude: Number;
    events?: Array<EventE>;
    draggable?: boolean;
  }

export interface Address {
  id?: Number;
  street: string;
  city: string;
  number: Number;
  events?: Array<EventE>;
}

export interface EventSearching {
  name?: string;
  eventType?: string;
  date?: Date;
  point1?: PointE;
  point2?: PointE;
}