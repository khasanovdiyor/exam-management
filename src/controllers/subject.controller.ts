import { Router, Request, Response } from "express";
import { SubjectService } from "../services/subject.service";

export class SubjectController {
  public router: Router;
  private subjectService: SubjectService;

  constructor() {
    this.router = Router();
    this.subjectService = new SubjectService();
    this.routes();
  }

  async findOne(req: Request, res: Response) {
    const subject = await this.subjectService.findOne(+req.params.id);
    res.status(200).json({ data: subject });
  }

  async findAll(req: Request, res: Response) {
    const subjects = await this.subjectService.findAll();
    res.status(200).json({ data: subjects });
  }

  async create(req: Request, res: Response) {
    const subject = await this.subjectService.create(req.body);
    res.status(200).json({ data: subject });
  }

  async update(req: Request, res: Response) {
    const subject = await this.subjectService.update(+req.params.id, req.body);
    res.status(200).json({ data: subject });
  }

  async delete(req: Request, res: Response) {
    const subject = await this.subjectService.delete(+req.params.id);
    res.status(200).json({ data: subject });
  }

  routes() {
    this.router.get("/", this.findAll.bind(this));
    this.router.get("/:id", this.findOne.bind(this));
    this.router.post("/", this.create.bind(this));
    this.router.put("/:id", this.update.bind(this));
    this.router.delete("/:id", this.delete.bind(this));
  }
}
