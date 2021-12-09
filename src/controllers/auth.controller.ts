import { NextFunction, Request, Response, Router } from "express";
import { HttpException } from "../common/exceptions/http.exception";
import { validateDto } from "../common/middlewares/dto.middleware";
import { LoginDto } from "../dtos/login.dto";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";

export class AuthController {
  private userService: UserService;
  router: Router;

  constructor() {
    this.userService = new UserService();
    this.router = Router();
    this.routes();
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { universityID, password }: any = req.body;

    try {
      const user: User = await this.userService.findOneWithUniversityID(
        universityID
      );
      console.log(user);
      if (!user || user.password !== password)
        return next(new HttpException(401, "Given credentials are wrong!"));

      res.status(200).json({ data: user });
    } catch (error) {
      return next(error);
    }
  }

  routes() {
    this.router.post("/", validateDto(LoginDto), this.login.bind(this));
  }
}
