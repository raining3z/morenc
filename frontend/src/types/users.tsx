export interface UserLogin {
  email: string;
  password: string;
}

export interface UserData extends UserLogin {
  firstName: string;
  lastName: string;
}

export interface User extends UserData {
  _id: string;
}
