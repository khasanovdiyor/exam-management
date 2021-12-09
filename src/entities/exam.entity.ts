import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Question } from "./question.entity";
import { Subject } from "./subject.entity";
import { Teacher } from "./teacher.entity";

@Entity("exam")
export class Exam extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: "timestamptz", nullable: true })
  startDate: Date;

  @Column({ nullable: true })
  duration: number;

  @OneToOne(() => Subject)
  @JoinColumn()
  subject: Subject;

  @OneToOne(() => Teacher)
  @JoinColumn()
  teacher: Teacher;

  @OneToMany(() => Question, (question) => question.exam)
  questions: Question[];
}
