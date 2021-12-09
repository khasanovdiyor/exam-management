import { Router, Request, Response, NextFunction } from "express";
import { UserRole } from "../common/enums/user-role.enum";
import { validateDto } from "../common/middlewares/dto.middleware";
import { requiredRole } from "../common/middlewares/requiredRole.middleware";
import { CreateSubjectDto } from "../dtos/create-subject.dto";
import { UpdateSubjectDto } from "../dtos/update-subject.dto";
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

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const subject = await this.subjectService.create(req.body);
      res.status(200).json({ data: subject });
    } catch (err) {
      return next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updateSubjectDto: UpdateSubjectDto = req.body;
      const id: number = +req.params.id;
      const subject = await this.subjectService.update(id, updateSubjectDto);
      res.status(200).json({ data: subject });
    } catch (err) {
      return next(err);
    }
  }

  async delete(req: Request, res: Response) {
    const subject = await this.subjectService.delete(+req.params.id);
    res.status(200).json({ data: subject });
  }

  routes() {
    this.router.get("/", this.findAll.bind(this));
    this.router.get("/:id", this.findOne.bind(this));
    this.router.post(
      "/",
      requiredRole(UserRole.Admin),
      validateDto(CreateSubjectDto),
      this.create.bind(this)
    );
    this.router.patch("/:id", this.update.bind(this));
    this.router.delete("/:id", this.delete.bind(this));
  }
}
