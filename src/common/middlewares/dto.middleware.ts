import { RequestHandler } from "express";
import {  plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { sanitize } from "class-sanitizer";
import {HttpException} from "../exceptions/http.exception";

export function validateDto(type: any, skipMissingProperties = false): RequestHandler {

  return (req, res, next) => {
    try {
      const dtoObj = plainToInstance(type, req.body);
    validate(dtoObj, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const dtoErrors = errors.map((error: ValidationError) =>
            (Object as any).values(error.constraints)).join(", ");
            next(new HttpException(400, dtoErrors));
        } else {
          //sanitize the object and call the next middleware
          sanitize(dtoObj);
          req.body = dtoObj;
          next();
        }
      }
    );
    } catch(err: any) {
      throw new HttpException(500, err.message);
    }
    
  };
}