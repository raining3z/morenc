export type FormOption = 'signup' | 'project' | 'school' | 'login';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserData extends UserCredentials {
  firstName: string;
  lastName: string;
}

export interface User extends UserData {
  _id: string;
}
