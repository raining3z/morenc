export interface ProjectData {
  projectName: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  schoolId: number;
}

export interface Project extends ProjectData {
  _id: string;
}
