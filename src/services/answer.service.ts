import { getConnection } from "typeorm";
import { Answer } from "../entities/answer.entity";
import { AnswerRepository } from "../repositories/answer.repository";

export class AnswerService {
  private answerRepository: AnswerRepository;

  constructor() {
    this.answerRepository = getConnection("exam-management").getCustomRepository(AnswerRepository)
  }

  async findOne(id: number){
    return await this.answerRepository.findOne(id)
  }

   async findAll(){
    return await this.answerRepository.find()
  }
  
  async create(answer: Answer)  { 
    return await this.answerRepository.save(answer)
  } 

  async update(id: number, answer: Answer) {
    return await this.answerRepository.update(id, answer)
  }

  async delete(id: number) {
    return await this.answerRepository.delete(id)
  }
}