import { getConnection } from "typeorm";
import { UserRole } from "../common/enums/user-role.enum";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../entities/user.entity";

import { TeacherRepository } from "../repositories/teacher.repository";
import { UserService } from "./user.service";

export class TeacherService {
  private teacherRepository: TeacherRepository;
  private userService: UserService;

  constructor() {
    this.teacherRepository =
      getConnection("exam-management").getCustomRepository(TeacherRepository);
    this.userService = new UserService();
  }

  async findOne(id: number) {
    return await this.teacherRepository.findOne(id);
  }

  async findOneWithUser(user: User) {
    return await this.teacherRepository.findOne({ user });
  }

  async findAll() {
    return await this.teacherRepository.find({ relations: ["user"] });
  }

  async create(createUserDto: CreateUserDto) {
    const { firstName, lastName } = createUserDto;
    const user = await this.userService.create({
      firstName,
      lastName,
      role: UserRole.Teacher,
    });
    const teacher = this.teacherRepository.create({});
    teacher.user = user;
    return await this.teacherRepository.save(teacher);
  }

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   return await this.teacherRepository.update(id, updateUserDto)
  // }

  async delete(id: number) {
    return await this.teacherRepository.delete(id);
  }
}
