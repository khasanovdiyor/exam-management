import { Router, Request, Response, NextFunction } from "express";
import { HttpException } from "../common/exceptions/http.exception";
import { notFoundMessage } from "../common/functions/notFoundMessage";
import { validateDto } from "../common/middlewares/dto.middleware";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";

export class UserController {
  public router: Router;
  private userService: UserService;

  constructor() {
    this.router = Router();
    this.userService = new UserService();
    this.routes()
  }


  async findOne(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id
    const user = await this.userService.findOne(id);
    if(!user) return next(new HttpException(400, notFoundMessage(User.name, {id})))
    res.status(200).json({data: user});
  }

  async findAll(req: Request, res: Response) {
    const users = await this.userService.findAll();
    res.status(200).json({data: users});
  }

  async create(req: Request, res: Response) {
    const user = await this.userService.create(req.body);
    res.status(200).json({data: user});

  }

  async update(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id
    const user = await this.userService.update(id, req.body);
    if(!user) return next(new HttpException(400, notFoundMessage(User.name, {id})))
    res.status(200).json({data: user});

  }

  // async delete(req: Request, res: Response, next: NextFunction) {
  //   const id = +req.params.id
  //   const user = await this.userService.delete(+req.params.id);
  //   if(!user) return next(new HttpException(400, notFoundMessage(User.name, {id})))
  //   res.status(200).json({data: user});
  // }

  routes() {
    this.router.get("/", this.findAll.bind(this));
    this.router.get("/:id", this.findOne.bind(this));
    this.router.post("/", validateDto(CreateUserDto),this.create.bind(this));
    this.router.patch("/:id", validateDto(UpdateUserDto), this.update.bind(this));
    // this.router.delete("/:id", this.delete.bind(this));
  }
}