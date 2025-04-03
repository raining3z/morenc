export interface EventData {
  eventName: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  schoolName: string;
  county: string;
}

export interface Event extends EventData {
  id: number;
}
