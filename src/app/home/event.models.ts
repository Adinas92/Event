export type EventId = number | string;

export interface Event {
    id: EventId;
    name: string;
    eventType: string;
    date: Date;
    startingTime: Date;
    endingTime: Date;
  }
  
