import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Question } from "./question.entity";

@Entity("choice")
export class Choice extends BaseEntity {
  @Column()
  text: string;

  @Column()
  image: string;

  @ManyToOne(() => Question, (question) => question.choices)
  question: Question;

  @Column({ default: 0 })
  points: number = 0;
}
