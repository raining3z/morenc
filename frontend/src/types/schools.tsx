export interface SchoolData {
  name: string;
  address: string;
  county: string;
}

export interface School extends SchoolData {
  _id: string;
}
