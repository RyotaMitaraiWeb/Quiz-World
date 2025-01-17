import { UserState } from "../../store/user/user.store";

export interface AuthBody {
  username: string;
  password: string;
}

export type SuccessfulAuthResponse = {
  token: string;
} & UserState;