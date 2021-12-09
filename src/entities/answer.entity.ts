import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity("answer")
export class Answer extends BaseEntity {
  @Column()
  text: string;

  @Column()
  image: string;
}
