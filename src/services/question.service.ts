import { getConnection } from "typeorm";
import { CreateQuestionDto } from "../dtos/create-question.dto";
import { Question } from "../entities/question.entity";
import { QuestionRepository } from "../repositories/question.repository";
import { ExamService } from "./exam.service";

export class QuestionService {
  private questionRepository: QuestionRepository;
  private examService: ExamService;

  constructor() {
    this.questionRepository =
      getConnection("exam-management").getCustomRepository(QuestionRepository);

    this.examService = new ExamService();
  }

  async findOne(id: number) {
    return await this.questionRepository.findOne(id);
  }

  async findAll() {
    return await this.questionRepository.find();
  }

  async create(createQuestionDto: CreateQuestionDto) {
    try {
      const { examId }: CreateQuestionDto = createQuestionDto;
      const exam = await this.examService.findOne(examId);
      const question = this.questionRepository.create(createQuestionDto);
      question.exam = exam;
      return await this.questionRepository.save(question);
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, question: Question) {
    return await this.questionRepository.update(id, question);
  }

  async delete(id: number) {
    return await this.questionRepository.delete(id);
  }
}
