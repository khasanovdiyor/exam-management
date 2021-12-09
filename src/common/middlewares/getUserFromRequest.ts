import { Response, NextFunction } from "express";
import { UserService } from "../../services/user.service";
import { HttpException } from "../exceptions/http.exception";
import { notFoundMessage } from "../functions/notFoundMessage";
import { RequestWithUser } from "../interfaces/request-with-user.interface";

export async function getUserFromRequest(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  const userId: number = Number(req.headers.authorization);
  if (!userId)
    return next(
      new HttpException(401, "You need to provide a valid credentials")
    );

  const userService = new UserService();
  const user = await userService.findOne(userId);

  if (!user)
    return next(
      new HttpException(404, notFoundMessage("User", { id: userId }))
    );

  req.user = user;
  return next();
}
