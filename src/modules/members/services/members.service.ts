import { Injectable } from '@nestjs/common';
import { MembersRepository } from '../repositories/members.repository';
import { CreateMemberDto } from '../dtos/create-member.dto';
import { InternalRes } from '@/common/types/internal-res';

@Injectable()
export class MembersService {
  constructor(private readonly membersRepository: MembersRepository) {}

  async create(createMemberDto: CreateMemberDto): Promise<InternalRes> {
    return this.membersRepository.create(createMemberDto);
  }

  async findAll(): Promise<InternalRes> {
    return this.membersRepository.findAll();
  }

  async findOne(uuid: string): Promise<InternalRes> {
    return this.membersRepository.findOne(uuid);
  }
}
