import { EntityRepository, Repository } from "typeorm";
import { Choice } from "../entities/choice.entity";

@EntityRepository(Choice)
export class ChoiceRepository extends Repository<Choice> {}