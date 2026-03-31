import { IsString, IsUUID } from "class-validator";
import { MemberEntity } from "../entitys/Member.entity";
import { UUID } from "node:crypto";

export class MinistryDTO {
  @IsString()
  name: string;

  @IsUUID()
  lead_ministry: UUID;

  @IsString()
  branch: string;
}
