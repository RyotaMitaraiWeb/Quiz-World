import { UserState } from "../../store/user/user.store";

export type AuthBody = {
  username: string;
  password: string;
};

export type SuccessfulAuthResponse = {
  token: string;
} & UserState;