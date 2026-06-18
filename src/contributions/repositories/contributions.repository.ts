import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { ContributionEntity } from '../entities/contribution.entity';
import { CreateContributionDto } from '../dtos/create-contribution.dto';
import { InternalRes } from '@/common/types/internal-res';

@Injectable()
export class ContributionsRepository {
  constructor(
    @InjectRepository(ContributionEntity)
    private readonly contributionRepository: Repository<ContributionEntity>,
  ) {}

  async create(createContributionDto: CreateContributionDto): Promise<InternalRes> {
    try {
      const newContribution = this.contributionRepository.create({
        uuid: randomUUID(),
        type: createContributionDto.type,
        member: { uuid: createContributionDto.member } as any,
        value: createContributionDto.value,
        date: new Date(createContributionDto.date),
        payment_type: createContributionDto.payment_type,
      });

      await this.contributionRepository.save(newContribution);

      return { status: true, data: newContribution, message: 'Contribuição criada com sucesso' };
    } catch (error: any) {
      return { status: false, error: error.message };
    }
  }

  async findAll(): Promise<InternalRes> {
    try {
      const contributions = await this.contributionRepository.find({
        relations: ['member'],
      });

      return { status: true, data: contributions, message: 'OK' };
    } catch (error: any) {
      return { status: false, error: error.message };
    }
  }

  async findOne(uuid: string): Promise<InternalRes> {
    try {
      const contribution = await this.contributionRepository.findOne({
        where: { uuid },
        relations: ['member'],
      });

      if (!contribution) {
        return { status: false, error: 'Contribuição não encontrada' };
      }

      return { status: true, data: contribution, message: 'OK' };
    } catch (error: any) {
      return { status: false, error: error.message };
    }
  }
}
