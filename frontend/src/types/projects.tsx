export interface ProjectData {
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  schoolId: string;
}

export interface Project extends ProjectData {
  _id: string;
}
