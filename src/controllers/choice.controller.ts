import { Router, Request, Response, NextFunction } from "express";
import { ChoiceService } from "../services/choice.service";

export class ChoiceController {
  public router: Router;
  private choiceService: ChoiceService;

  constructor() {
    this.router = Router();
    this.choiceService = new ChoiceService();
    this.routes();
  }

  async findOne(req: Request, res: Response) {
    const choice = await this.choiceService.findOne(+req.params.id);
    res.status(200).json({ data: choice });
  }

  async findAll(req: Request, res: Response) {
    const choices = await this.choiceService.findAll();
    res.status(200).json({ data: choices });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createChoiceDto = req.body;
      const choice = await this.choiceService.create(createChoiceDto);
      res.status(200).json({ data: choice });
    } catch (err) {
      return next(err);
    }
  }

  async update(req: Request, res: Response) {
    const choice = await this.choiceService.update(+req.params.id, req.body);
    res.status(200).json({ data: choice });
  }

  async delete(req: Request, res: Response) {
    const choice = await this.choiceService.delete(+req.params.id);
    res.status(200).json({ data: choice });
  }

  routes() {
    this.router.get("/", this.findAll.bind(this));
    this.router.get("/:id", this.findOne.bind(this));
    this.router.post("/", this.create.bind(this));
    this.router.put("/:id", this.update.bind(this));
    this.router.delete("/:id", this.delete.bind(this));
  }
}
