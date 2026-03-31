import { MemberEntity } from "./Member.entity";

export class MinistryEntity {
  uuid?: string;
  name: string;
  lead_ministry: MemberEntity;
  members: MemberEntity[];
  branch: string;
}
