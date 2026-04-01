import { UUID } from "node:crypto";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { MemberModel } from "./Member.model";

@Entity({ name: "offers" })
export class ContributionsModel {
  @PrimaryColumn()
  uuid?: string;

  @Column()
  type: "dizimo" | "oferta";

  @JoinColumn()
  @OneToMany(() => MemberModel, (member) => member.contributions)
  member: MemberModel;

  @Column()
  value: number;

  @Column()
  date: Date;

  @Column()
  payment_type: string;

  @CreateDateColumn()
  creatAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;
}
