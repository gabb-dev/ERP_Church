import { Injectable } from '@nestjs/common';
import { MinistryRepository } from '../repositories/ministry.repository';
import { CreateMinistryDto } from '../dtos/create-ministry.dto';
import { InternalRes } from '@/common/types/internal-res';

@Injectable()
export class MinistryService {
  constructor(private readonly ministryRepository: MinistryRepository) {}

  async create(createMinistryDto: CreateMinistryDto): Promise<InternalRes> {
    return this.ministryRepository.create(createMinistryDto);
  }

  async findAll(): Promise<InternalRes> {
    return this.ministryRepository.findAll();
  }

  async findOne(uuid: string): Promise<InternalRes> {
    return this.ministryRepository.findOne(uuid);
  }
}
