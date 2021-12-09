import { getConnection } from "typeorm";
import { HttpException } from "../common/exceptions/http.exception";
import { notFoundMessage } from "../common/functions/notFoundMessage";
import { Subject } from "../entities/subject.entity";
import { SubjectRepository } from "../repositories/subject.repository";

export class SubjectService {
  private subjectRepository: SubjectRepository;

  constructor() {
    this.subjectRepository =
      getConnection("exam-management").getCustomRepository(SubjectRepository);
  }

  async findOne(id: number) {
    const subject = await this.subjectRepository.findOne(id);
    if (!subject)
      throw new HttpException(404, notFoundMessage("Subject", { id }));

    return subject;
  }

  async findAll() {
    return await this.subjectRepository.find();
  }

  async create(subject: Subject) {
    return await this.subjectRepository.save(subject);
  }

  async update(id: number, subject: Subject) {
    return await this.subjectRepository.update(id, subject);
  }

  async delete(id: number) {
    return await this.subjectRepository.delete(id);
  }
}
