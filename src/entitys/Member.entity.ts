import { MinistryEntity } from "./Ministry.entity";
import { ContributionsEntity } from "./Contributions.entity";
import { address } from "../types/address";
import { UUID } from "node:crypto";

export class MemberEntity {
  uuid?: UUID;

  full_name: string;

  social_name: string;

  date_birth: Date;

  sex: "M" | "F";

  telephone: string;

  email: string;

  passwordHash: string;

  address: address;

  ministrys: MinistryEntity[];

  contributions?: ContributionsEntity[];

  status?: "Ativo" | "Desligado";

  presence?: number;

  date_baptism: Date;
}
