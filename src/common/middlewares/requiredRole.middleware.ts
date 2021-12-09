import { Response, NextFunction } from "express";
import { UserRole } from "../enums/user-role.enum";
import { HttpException } from "../exceptions/http.exception";
import { RequestWithUser } from "../interfaces/request-with-user.interface";

export const requiredRole = (role: UserRole) => {
  return function (req: RequestWithUser, res: Response, next: NextFunction) {
    const user = req.user;
    if (user.role !== role)
      return next(
        new HttpException(
          403,
          "You don't have permission to access this route!"
        )
      );
    return next();
  };
};
