import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { QuestionType } from "../common/enums/question-type.enum";
import { BaseEntity } from "./base.entity";
import { Choice } from "./choice.entity";
import { Exam } from "./exam.entity";

@Entity("question")
export class Question extends BaseEntity {
  @Column()
  text: string;

  @Column()
  image: string;

  @Column({
    type: "enum",
    enum: QuestionType,
  })
  type: QuestionType;

  @ManyToOne(() => Exam, (exam) => exam.questions)
  exam: Exam;

  @OneToMany(() => Choice, (choice) => choice.question)
  choices: Choice[];
}
