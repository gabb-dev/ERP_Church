import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { MemberEntity } from '../entities/member.entity';
import { CreateMemberDto } from '../dtos/create-member.dto';
import { InternalRes } from '@/common/types/internal-res';

@Injectable()
export class MembersRepository {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<InternalRes> {
    try {
      const newMember = this.memberRepository.create({
        uuid: randomUUID(),
        full_name: createMemberDto.full_name,
        social_name: createMemberDto.social_name,
        date_birth: new Date(createMemberDto.date_birth),
        date_baptism: new Date(createMemberDto.date_baptism),
        sex: createMemberDto.sex,
        telephone: createMemberDto.telephone,
        email: createMemberDto.email,
        passwordHash: createMemberDto.password,
        address: JSON.stringify(createMemberDto.address || {}),
        status: 'Ativo',
        presence: 0,
      });

      await this.memberRepository.save(newMember);

      return { status: true, data: newMember, message: 'Membro criado com sucesso' };
    } catch (error: any) {
      return { status: false, error: error.message };
    }
  }

  async findAll(): Promise<InternalRes> {
    try {
      const members = await this.memberRepository.find();

      const membersWithParsedAddress = members.map((member) => ({
        ...member,
        address: JSON.parse(member.address),
      }));

      return { status: true, data: membersWithParsedAddress, message: 'OK' };
    } catch (error: any) {
      return { status: false, error: error.message };
    }
  }

  async findOne(uuid: string): Promise<InternalRes> {
    try {
      const member = await this.memberRepository.findOne({
        where: { uuid },
      });

      if (!member) {
        return { status: false, error: 'Membro não encontrado' };
      }

      return {
        status: true,
        data: { ...member, address: JSON.parse(member.address) },
        message: 'OK',
      };
    } catch (error: any) {
      return { status: false, error: error.message };
    }
  }
}
