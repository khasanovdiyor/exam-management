import express, { Request, Response, NextFunction, Application } from "express";
import morgan from "morgan";
import { createConnection } from "typeorm";
import { handleError } from "./common/exceptions/handleErrors";
import { HttpException } from "./common/exceptions/http.exception";
import { requestWrapperHandler } from "./common/functions/requestWrapperHandler";
import { getUserFromRequest } from "./common/middlewares/getUserFromRequest";
import { AnswerController } from "./controllers/answer.controller";
import { AuthController } from "./controllers/auth.controller";
import { QuestionController } from "./controllers/question.controller";
import { StudentController } from "./controllers/student.controller";
import { SubjectExamController } from "./controllers/subject-exam.controller";
import { TeacherController } from "./controllers/teacher.controller";
import { UserController } from "./controllers/user.controller";

class Server {
  private app: Application;
  private authController: AuthController;
  private questionController: QuestionController;
  private answerController: AnswerController;
  private userController: UserController;
  private studentController: StudentController;
  private teacherController: TeacherController;
  private subjectExamController: SubjectExamController;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(morgan("tiny"));
    this.app.use(express.static("public"));
    this.config();
    this.routes();
  }

  public config(): void {
    this.app.set("port", process.env.PORT || 3000);
  }

  public async routes(): Promise<void> {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "admin",
      password: "admin",
      database: "exam-management",
      entities: ["build/entities/**/*.js"],
      synchronize: true,
      name: "exam-management",
    });

    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello World");
    });

    this.authController = new AuthController();
    this.questionController = new QuestionController();
    this.answerController = new AnswerController();
    this.userController = new UserController();
    this.studentController = new StudentController();
    this.teacherController = new TeacherController();
    this.subjectExamController = new SubjectExamController();

    this.app.use("/api/login", this.authController.router);
    this.app.use(
      requestWrapperHandler((req, res, next) => {
        return getUserFromRequest(req, res, next);
      })
    );
    this.app.use("/api/questions", this.questionController.router);
    this.app.use("/api/answers", this.answerController.router);
    this.app.use("/api/users", this.userController.router);
    this.app.use("/api/students", this.studentController.router);
    this.app.use("/api/teachers", this.teacherController.router);
    this.app.use(
      "/api/subjects/:subjectId/exams",
      this.subjectExamController.router
    );

    this.app.use(
      (err: HttpException, req: Request, res: Response, next: NextFunction) => {
        handleError(err, res);
      }
    );
  }

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log("Listening on port", this.app.get("port"));
    });
  }
}

const server = new Server();
server.start();
