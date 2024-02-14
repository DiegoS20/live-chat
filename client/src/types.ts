export type APIResponse<T = {}> = {
  message: string;
  data?: T;
};

export type TUser = {
  name: string;
  last_name: string;
  email: string;
  password: string;
};
