import { Response} from "express";
import { HttpException } from "./http.exception";
export const handleError = (err: HttpException, res: Response) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
};