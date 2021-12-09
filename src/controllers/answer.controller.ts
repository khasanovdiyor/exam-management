import { NextFunction, Request, Response, Router } from "express";
import { HttpException } from "../common/exceptions/http.exception";
import { notFoundMessage } from "../common/functions/notFoundMessage";
import { AnswerService } from "../services/answer.service";

export class AnswerController {
  public router: Router;
  private answerService: AnswerService;

  constructor() {
    this.router = Router();
    this.answerService = new AnswerService();
    this.routes();
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    const id = +req.params.id;
    const answer = await this.answerService.findOne(id);

    if (!answer)
      return next(new HttpException(404, notFoundMessage("Answer", { id })));
    res.status(200).json({ data: answer });
  }

  async findAll(req: Request, res: Response) {
    const answers = await this.answerService.findAll();
    res.status(200).json({ data: answers });
  }

  async create(req: Request, res: Response) {
    const answer = await this.answerService.create(req.body);
    res
      .send({
        data: answer,
      })
      .json();
  }

  async update(req: Request, res: Response) {
    const answer = await this.answerService.update(+req.params.id, req.body);
    res
      .send({
        data: answer,
      })
      .json();
  }

  async delete(req: Request, res: Response) {
    const answer = await this.answerService.delete(+req.params.id);
    res
      .send({
        data: answer,
      })
      .json();
  }

  routes() {
    this.router.get("/", this.findAll.bind(this));
    this.router.get("/:id", this.findOne.bind(this));
    this.router.post("/", this.create.bind(this));
    this.router.patch("/:id", this.update.bind(this));
    this.router.delete("/:id", this.delete.bind(this));
  }
}
