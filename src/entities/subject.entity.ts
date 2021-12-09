import { Column, Entity, ManyToMany } from "typeorm";
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

  @ManyToMany(() => Student, (student) => student.subjects)
  students: Student[];

  @ManyToMany(() => Teacher, (teacher) => teacher.subjects)
  teachers: Teacher[];
}
