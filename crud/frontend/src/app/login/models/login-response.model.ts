import { User } from "src/app/users/models/user.model";

export interface LoginResponse {
  user: User;
  token: string;
}
