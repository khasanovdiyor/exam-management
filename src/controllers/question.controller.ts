import { Router, Request, Response, NextFunction } from "express";
import { nextTick } from "process";
import { validateDto } from "../common/middlewares/dto.middleware";
import { CreateQuestionDto } from "../dtos/create-question.dto";
import { QuestionService } from "../services/question.service";

export class QuestionController {
  public router: Router;
  private questionService: QuestionService;

  constructor() {
    this.router = Router();
    this.questionService = new QuestionService();
    this.routes();
  }

  async findOne(req: Request, res: Response) {
    const question = await this.questionService.findOne(+req.params.id);
    res.status(200).json({ data: question });
  }

  async findAll(req: Request, res: Response) {
    const questions = await this.questionService.findAll();
    res.status(200).json({ data: questions });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createQuestionDto: CreateQuestionDto = req.body;
      const question = await this.questionService.create(createQuestionDto);
      res.status(201).json({ data: question });
    } catch (err) {
      return next(err);
    }
  }

  async update(req: Request, res: Response) {
    const question = await this.questionService.update(
      +req.params.id,
      req.body
    );
    res.status(200).json({ data: question });
  }

  async delete(req: Request, res: Response) {
    const question = await this.questionService.delete(+req.params.id);
    res.status(200).json({ data: question });
  }

  routes() {
    this.router.get("/", this.findAll.bind(this));
    this.router.get("/:id", this.findOne.bind(this));
    this.router.post(
      "/",
      validateDto(CreateQuestionDto),
      this.create.bind(this)
    );
    this.router.patch("/:id", this.update.bind(this));
    this.router.delete("/:id", this.delete.bind(this));
  }
}
