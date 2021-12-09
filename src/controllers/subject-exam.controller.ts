import { Router, Request, Response, NextFunction } from "express";

import { HttpException } from "../common/exceptions/http.exception";
import { notFoundMessage } from "../common/functions/notFoundMessage";
import { RequestWithUser } from "../common/interfaces/request-with-user.interface";
import { validateDto } from "../common/middlewares/dto.middleware";
import { isTeacher } from "../common/middlewares/isTeacher.middleware";
import { AssignExamDto } from "../dtos/assign-exam.dto";
import { CreateExamDto } from "../dtos/create-exam.dto";
import { UpdateExamDto } from "../dtos/update-exam.dto";
import { ExamService } from "../services/exam.service";

export class SubjectExamController {
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

  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    const createExamDto: CreateExamDto = req.body;
    const user = req.user;
    if (user.role !== "Teacher")
      return next(
        new HttpException(
          403,
          "You don't have permissions to access this route!"
        )
      );
    const subjectId = +req.params.subjectId;
    try {
      const exam = await this.examService.create(
        createExamDto,
        subjectId,
        user
      );
      res.status(200).json({ data: exam });
    } catch (err) {
      return next(err);
    }
  }

  // async update(req: Request, res: Response) {
  //   const exam = await this.examService.update(+req.params.id, req.body);
  //   res.status(200).json({data: exam});

  // }

  async delete(req: Request, res: Response) {
    const id = +req.params.id;
    const exam = await this.examService.delete(id);
    res.status(200).json({ data: exam });
  }

  async assign(req: Request, res: Response, next: NextFunction) {
    const assignExamDto: AssignExamDto = req.body;
    try {
      const exam = await this.examService.update(+req.params.id, assignExamDto);
      res.status(200).json({ data: exam });
    } catch (err) {
      return next(err);
    }
  }

  routes() {
    this.router.get("/", this.findAll.bind(this));
    this.router.get("/:id", this.findOne.bind(this));
    this.router.post(
      "/",
      isTeacher,
      validateDto(CreateExamDto),
      this.create.bind(this)
    );
    this.router.post(
      "/:id/assign",
      isTeacher,
      validateDto(AssignExamDto),
      this.assign.bind(this)
    );
    // this.router.patch("/:id", validateDto(UpdateUserDto), this.update.bind(this));
    // this.router.delete("/:id", this.delete.bind(this));
  }
}
