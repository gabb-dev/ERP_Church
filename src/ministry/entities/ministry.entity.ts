import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MemberEntity } from '@/modules/members/entities/member.entity';

@Entity({ name: 'ministrys' })
export class MinistryEntity {
  @PrimaryColumn()
  uuid: string;

  @Column()
  name: string;

  @Column()
  branch: string;

  @OneToOne(() => MemberEntity)
  @JoinColumn({ name: 'lead_ministry_uuid' })
  lead_ministry: MemberEntity;

  @ManyToMany(() => MemberEntity)
  @JoinTable({ name: 'ministry_to_members' })
  members: MemberEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
