import { MemberEntity } from "./Member.entity";

export class ContributionsEntity {
  uuid?: string;

  type: "dizimo" | "oferta";

  member: MemberEntity;

  value: number;

  date: Date;

  payment_type: string;
}
