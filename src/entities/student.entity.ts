import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from "typeorm";
import { Grade } from "../common/enums/grade.enum";
import { BaseEntity } from "./base.entity";
import { Subject } from "./subject.entity";
import { User } from "./user.entity";

@Entity("student")
export class Student extends BaseEntity {
  @Column({ default: 1, type: "enum", enum: Grade })
  grade: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Subject, (subject) => subject.students)
  @JoinTable()
  subjects: Subject[];
}
