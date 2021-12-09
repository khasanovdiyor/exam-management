import { getConnection } from "typeorm";
import { HttpException } from "../common/exceptions/http.exception";
import { notFoundMessage } from "../common/functions/notFoundMessage";
import { CreateSubjectDto } from "../dtos/create-subject.dto";
import { UpdateSubjectDto } from "../dtos/update-subject.dto";
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

  async create(createSubjectDto: CreateSubjectDto) {
    const subject = this.subjectRepository.create(createSubjectDto);
    return await this.subjectRepository.save(subject);
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    const subject = await this.subjectRepository.preload({
      id,
      ...updateSubjectDto,
    });
    if (!subject)
      throw new HttpException(404, notFoundMessage("Subject", { id }));
    return await this.subjectRepository.save(subject);
  }

  async delete(id: number) {
    return await this.subjectRepository.delete(id);
  }
}
