import { Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Subject } from "./subject.entity";
import { User } from "./user.entity";

@Entity("teacher")
export class Teacher extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Subject, (subject) => subject.teacher)
  subjects: Subject[];
}
