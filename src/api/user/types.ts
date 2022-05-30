export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserRegister {
  username: string;
  mobile: string;
  gender: string;
  password: string;
}

export interface IUserUpdate {
  username: string;
  gender: string;
}
