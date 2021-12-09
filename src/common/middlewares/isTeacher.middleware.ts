import { Response, NextFunction } from "express";
import { HttpException } from "../exceptions/http.exception";
import { RequestWithUser } from "../interfaces/request-with-user.interface";

export async function isTeacher(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  if (user.role !== "Teacher")
    return next(
      new HttpException(403, "You don't have permission to access this route!")
    );
  return next();
}
