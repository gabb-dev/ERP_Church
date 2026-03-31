import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { MemberModel } from "./Member.model";
import { MemberEntity } from "../entitys/Member.entity";

@Entity({ name: "ministrys" })
export class MinistryModel {
  @PrimaryColumn()
  uuid?: string;

  @Column()
  name: string;

  @JoinColumn()
  @OneToOne(() => MemberModel, (member) => member.uuid)
  lead_ministry: MemberEntity;

  @ManyToMany(() => MemberModel, (member) => member.ministry)
  members: MemberEntity[];

  @Column()
  branch: string;
}
