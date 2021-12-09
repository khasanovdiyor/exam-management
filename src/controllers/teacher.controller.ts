import { Router, Request, Response, NextFunction } from "express";

import { HttpException } from "../common/exceptions/http.exception";
import { notFoundMessage } from "../common/functions/notFoundMessage";
import { validateDto } from "../common/middlewares/dto.middleware";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { CreateTeacherDto } from "../dtos/create-teacher.dto";
import { CreateUserDto } from "../dtos/create-user.dto";
import { Teacher } from "../entities/teacher.entity";
import { TeacherService } from "../services/teacher.service";

export class TeacherController {
  public router: Router;
  private teacherService: TeacherService;

  constructor() {
    this.router = Router();
    this.teacherService = new TeacherService();
    this.routes();
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id;
    const teacher = await this.teacherService.findOne(id);
    if (!teacher)
      return next(
        new HttpException(400, notFoundMessage(Teacher.name, { id }))
      );
    res.status(200).json({ data: teacher });
  }

  async findAll(req: Request, res: Response) {
    const teachers = await this.teacherService.findAll();
    res.status(200).json({ data: teachers });
  }

  async create(req: Request, res: Response) {
    const teacher = await this.teacherService.create(req.body);
    res.status(200).json({ data: teacher });
  }

  // async update(req: Request, res: Response) {
  //   const teacher = await this.teacherService.update(+req.params.id, req.body);
  //   res.status(200).json({data: teacher});

  // }

  async delete(req: Request, res: Response) {
    const teacher = await this.teacherService.delete(+req.params.id);
    res.status(200).json({ data: teacher });
  }

  routes() {
    this.router.get("/", this.findAll.bind(this));
    this.router.get("/:id", this.findOne.bind(this));
    this.router.post(
      "/",
      validateDto(CreateTeacherDto),
      this.create.bind(this)
    );
    // this.router.patch("/:id", validateDto(UpdateUserDto), this.update.bind(this));
    // this.router.delete("/:id", this.delete.bind(this));
  }
}
