export type TUserAccountInfo = {
  name: string;
  last_name: string;
  email: string;
  password: string;
};

export type TUser = TUserAccountInfo & { id: number };

export type TLoginFields = {
  email: string;
  password: string;
};
