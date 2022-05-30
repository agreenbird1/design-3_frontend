export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserRegister {
  username: string;
  mobile: string;
  gender: 0 | 1;
  password: string;
}
