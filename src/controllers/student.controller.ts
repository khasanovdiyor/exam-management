import { Router, Request, Response, NextFunction } from "express";

import { HttpException } from "../common/exceptions/http.exception";
import { notFoundMessage } from "../common/functions/notFoundMessage";
import { validateDto } from "../common/middlewares/dto.middleware";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { Student } from "../entities/student.entity";
import { StudentService } from "../services/student.service";

export class StudentController {
  public router: Router;
  private studentService: StudentService;

  constructor() {
    this.router = Router();
    this.studentService = new StudentService();
    this.routes()
  }


  async findOne(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id
    const student = await this.studentService.findOne(id);
    if(!student) return next(new HttpException(400, notFoundMessage(Student.name, {id})))
    res.status(200).json({data: student});
  }

  async findAll(req: Request, res: Response) {
    const students = await this.studentService.findAll();
    res.status(200).json({data: students});
  }

  async create(req: Request, res: Response) {
    const student = await this.studentService.create(req.body);
    res.status(200).json({data: student});

  }

  // async update(req: Request, res: Response) {
  //   const student = await this.studentService.update(+req.params.id, req.body);
  //   res.status(200).json({data: student});

  // }

  async delete(req: Request, res: Response) {
    const student = await this.studentService.delete(+req.params.id);
    res.status(200).json({data: student});

  }

  routes() {
    this.router.get("/", this.findAll.bind(this));
    this.router.get("/:id", this.findOne.bind(this));
    this.router.post("/", validateDto(CreateStudentDto),this.create.bind(this));
    // this.router.patch("/:id", validateDto(UpdateUserDto), this.update.bind(this));
    this.router.delete("/:id", this.delete.bind(this));
  }
}