import { nextTick } from "process";
import { getConnection } from "typeorm";
import { UserRole } from "../common/enums/user-role.enum";
import { HttpException } from "../common/exceptions/http.exception";
import { notFoundMessage } from "../common/functions/notFoundMessage";

import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository =
      getConnection("exam-management").getCustomRepository(UserRepository);
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ id });
  }

  async findOneWithUniversityID(universityID: string): Promise<User> {
    const user = await this.userRepository.findOne(
      { universityID },
      {
        select: [
          "id",
          "firstName",
          "lastName",
          "universityID",
          "password",
          "role",
        ],
      }
    );

    if (!user)
      throw new HttpException(404, notFoundMessage("User", { universityID }));

    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(newUser);
    return await this.update(user.id, {
      universityID: this.generateUniversityID(user),
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({ id, ...updateUserDto });

    if (!user) throw new HttpException(404, notFoundMessage(User.name, { id }));

    return await this.userRepository.save(user);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }

  generateUniversityID(user: User) {
    let id = "";
    let year = new Date().getFullYear().toString().slice(2, 4);
    let difference;
    if (user.role === UserRole.Student) difference = 1000;
    else if (user.role === UserRole.Teacher) difference = 2000;
    else difference = 3000;
    id = "U" + year + (difference + user.id);
    return id;
  }
}
