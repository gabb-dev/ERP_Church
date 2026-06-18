import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MemberEntity } from '@/modules/members/entities/member.entity';

@Entity({ name: 'contributions' })
export class ContributionEntity {
  @PrimaryColumn()
  uuid: string;

  @Column()
  type: 'dizimo' | 'oferta';

  @ManyToOne(() => MemberEntity, (member) => member.uuid)
  @JoinColumn({ name: 'member_uuid' })
  member: MemberEntity;

  @Column()
  value: number;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  payment_type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
