import { getConnection } from "typeorm";
import { UserRole } from "../common/enums/user-role.enum";
import { HttpException } from "../common/exceptions/http.exception";
import { CreateStudentDto } from "../dtos/create-student.dto";

import { StudentRepository } from "../repositories/student.repository";
import { UserService } from "./user.service";

export class StudentService {
  private studentRepository: StudentRepository;
  private userService: UserService;

  constructor() {
    this.studentRepository = getConnection("exam-management").getCustomRepository(StudentRepository)
    this.userService = new UserService()
  }

  async findOne(id: number){
    return await this.studentRepository.findOne(id)
  }

  async findAll(){
    return await this.studentRepository.find({relations: ["user"]})
  }
  
  async create(createStudentDto: CreateStudentDto)  { 
    const {firstName, lastName, grade} = createStudentDto;
    const user = await this.userService.create({firstName,lastName, role: UserRole.Student})
    const student = this.studentRepository.create({grade})
    student.user = user;
    return await this.studentRepository.save(student)
  } 

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   return await this.studentRepository.update(id, updateUserDto)
  // }

  async delete(id: number) {
    return await this.studentRepository.delete(id)
  }
}