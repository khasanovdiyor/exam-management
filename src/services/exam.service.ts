import { nextTick } from "process";
import { getConnection } from "typeorm";
import { HttpException } from "../common/exceptions/http.exception";
import { notFoundMessage } from "../common/functions/notFoundMessage";
import { CreateExamDto } from "../dtos/create-exam.dto";
import { UpdateExamDto } from "../dtos/update-exam.dto";
import { User } from "../entities/user.entity";
import { ExamRepository } from "../repositories/exam.repository";
import { SubjectService } from "./subject.service";
import { TeacherService } from "./teacher.service";

export class ExamService {
  private examRepository: ExamRepository;
  private subjectService: SubjectService;
  private teacherService: TeacherService;

  constructor() {
    this.examRepository =
      getConnection("exam-management").getCustomRepository(ExamRepository);

    this.subjectService = new SubjectService();
    this.teacherService = new TeacherService();
  }

  async findOne(id: number) {
    const exam = await this.examRepository.findOne(id);
    if (!exam) throw new HttpException(404, notFoundMessage("Exam", { id }));
    return exam;
  }

  async findAll() {
    return await this.examRepository.find();
  }

  async create(createExamDto: CreateExamDto, subjectId: number, user: User) {
    try {
      const exam = this.examRepository.create(createExamDto);
      const subject = await this.subjectService.findOne(subjectId);
      const teacher = await this.teacherService.findOneWithUser(user);
      exam.subject = subject;
      exam.teacher = teacher;
      return await this.examRepository.save(exam);
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, updateExamDto: UpdateExamDto) {
    const exam = await this.examRepository.preload({ id, ...updateExamDto });
    if (!exam) throw new HttpException(404, notFoundMessage("Exam", { id }));
    return await this.examRepository.save(exam);
  }

  async delete(id: number) {
    return await this.examRepository.delete(id);
  }
}
