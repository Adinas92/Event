export type EventId = number | string;

export interface Event {
    id?: EventId;
    name: string;
    eventType: string;
    startingTime: Date;
    endingTime: Date;
    urlPicture?: string;
  }
  
 export interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
  }
  export interface Coords {
    lat: number;
    lng: number;
  }