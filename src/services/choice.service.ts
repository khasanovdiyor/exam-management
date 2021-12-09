import { getConnection } from "typeorm";
import { Choice } from "../entities/choice.entity";
import { ChoiceRepository } from "../repositories/choice.repository";

export class ChoiceService {
  private choiceRepository: ChoiceRepository;

  constructor() {
    this.choiceRepository = getConnection("exam-management").getCustomRepository(ChoiceRepository)
  }

  async findOne(id: number){
    return await this.choiceRepository.findOne(id)
  }

   async findAll(){
    return await this.choiceRepository.find()
  }
  
  async create(choice: Choice)  { 
    return await this.choiceRepository.save(choice)
  } 

  async update(id: number, choice: Choice) {
    return await this.choiceRepository.update(id, choice)
  }

  async delete(id: number) {
    return await this.choiceRepository.delete(id)
  }
}