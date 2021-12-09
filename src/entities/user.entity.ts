import { Column, Entity } from "typeorm";
import { UserRole } from "../common/enums/user-role.enum";
import { BaseEntity } from "./base.entity";

@Entity("user")
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: "enum", enum: UserRole })
  role: UserRole;

  @Column({ nullable: true })
  universityID: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: "Abc!@#$", select: false })
  password: string;
}
