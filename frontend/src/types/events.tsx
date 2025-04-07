export interface EventData {
  eventName: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  schoolId: number;
}

export interface Event extends EventData {
  _id: string;
}
