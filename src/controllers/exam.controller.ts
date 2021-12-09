import { Router, Request, Response, NextFunction } from "express";

import { HttpException } from "../common/exceptions/http.exception";
import { notFoundMessage } from "../common/functions/notFoundMessage";
import { validateDto } from "../common/middlewares/dto.middleware";
import { CreateExamDto } from "../dtos/create-exam.dto";
import { ExamService } from "../services/exam.service";

export class ExamController {
  public router: Router;
  private examService: ExamService;

  constructor() {
    this.router = Router();
    this.examService = new ExamService();
    this.routes();
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id;
    const exam = await this.examService.findOne(id);
    if (!exam)
      return next(new HttpException(404, notFoundMessage("Exam", { id })));
    res.status(200).json({ data: exam });
  }

  async findAll(req: Request, res: Response) {
    const exams = await this.examService.findAll();
    res.status(200).json({ data: exams });
  }

  // async create(req: Request, res: Response) {
  //   const createExamDto: CreateExamDto = req.body;
  //   const exam = await this.examService.create(createExamDto);

  //   res.status(200).json({ data: exam });
  // }

  // async update(req: Request, res: Response) {
  //   const exam = await this.examService.update(+req.params.id, req.body);
  //   res.status(200).json({data: exam});

  // }

  async delete(req: Request, res: Response) {
    const id = +req.params.id;
    const exam = await this.examService.delete(id);
    res.status(200).json({ data: exam });
  }

  assign() {}

  routes() {
    this.router.get("/", this.findAll.bind(this));
    this.router.get("/:id", this.findOne.bind(this));
    // this.router.post("/", validateDto(CreateExamDto), this.create.bind(this));
    // this.router.patch("/:id", validateDto(UpdateUserDto), this.update.bind(this));
    // this.router.delete("/:id", this.delete.bind(this));
  }
}
