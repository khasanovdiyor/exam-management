import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { Grade } from "../common/enums/grade.enum";
import { BaseEntity } from "./base.entity";
import { Student } from "./student.entity";
import { Teacher } from "./teacher.entity";

@Entity("subject")
export class Subject extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  code: string;

  @Column({ type: "enum", enum: Grade })
  grade: Grade;

  @ManyToMany(() => Student, (student) => student.subjects)
  students: Student[];

  @ManyToOne(() => Teacher, (teacher) => teacher.subjects)
  teacher: Teacher[];
}
