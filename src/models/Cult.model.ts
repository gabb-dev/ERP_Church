import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "cults" })
export class CultModel {
  @PrimaryColumn()
  uuid!: string;

  @Column()
  cult_name: string;

  @Column()
  theme: string;

  @Column()
  cult_date: Date;

  @Column()
  preacher: string;

  @CreateDateColumn()
  createAt?: Date;

  @UpdateDateColumn()
  updateAt?: Date;
}
