import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'members' })
export class MemberEntity {
  @PrimaryColumn({ primary: true })
  uuid: string;

  @Column()
  full_name: string;

  @Column()
  social_name: string;

  @Column({ type: 'date' })
  date_birth: Date;

  @Column()
  sex: 'M' | 'F';

  @Column()
  telephone: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'jsonb' })
  address: string;

  @Column({ type: 'date' })
  date_baptism: Date;

  @Column({ default: 'Ativo' })
  status: 'Ativo' | 'Desligado';

  @Column({ default: 0 })
  presence: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
