export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface User extends UserData {
  _id: string;
}
