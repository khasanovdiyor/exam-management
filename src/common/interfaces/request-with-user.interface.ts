import { User } from "../../entities/user.entity";
import { Request } from "express";
export interface RequestWithUser extends Request {
  user: User;
}
