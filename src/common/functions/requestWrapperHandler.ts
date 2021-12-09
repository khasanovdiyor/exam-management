import { RequestWithUser } from "../interfaces/request-with-user.interface";
import { Request, Response, NextFunction } from "express";

export function requestWrapperHandler(
  handler: (req: RequestWithUser, res: Response, next: NextFunction) => any
) {
  return (req: Request, res: Response, next: NextFunction) => {
    let requestWrapper: RequestWithUser = <RequestWithUser>req;

    handler(requestWrapper, res, next);
  };
}
