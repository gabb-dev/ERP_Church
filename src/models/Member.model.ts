import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { MinistryModel } from "./Ministry.model";

@Entity({ name: "members" })
export class MemberModel {
  @PrimaryColumn({ primary: true })
  uuid?: string;

  @Column()
  full_name: string;

  @Column()
  social_name: string;

  @Column()
  date_birth: Date;

  @Column()
  sex: "M" | "F";

  @Column()
  telephone: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: "json" })
  address: string;

  @JoinTable({ name: "member_to_ministry" })
  @ManyToMany(
    () => MinistryModel,
    (ministry: MinistryModel) => ministry.members,
  )
  ministry: MinistryModel[];

  @Column()
  status?: "Ativo" | "Desligado";

  @Column()
  presence?: number;

  @Column({ type: "date" })
  date_baptism: Date;

  @CreateDateColumn()
  creatAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;
}
