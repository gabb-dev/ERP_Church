import { Injectable } from '@nestjs/common';
import { ContributionsRepository } from '../repositories/contributions.repository';
import { CreateContributionDto } from '../dtos/create-contribution.dto';
import { InternalRes } from '@/common/types/internal-res';

@Injectable()
export class ContributionsService {
  constructor(private readonly contributionsRepository: ContributionsRepository) {}

  async create(createContributionDto: CreateContributionDto): Promise<InternalRes> {
    return this.contributionsRepository.create(createContributionDto);
  }

  async findAll(): Promise<InternalRes> {
    return this.contributionsRepository.findAll();
  }

  async findOne(uuid: string): Promise<InternalRes> {
    return this.contributionsRepository.findOne(uuid);
  }
}
