import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { MinistryEntity } from '../entities/ministry.entity';
import { CreateMinistryDto } from '../dtos/create-ministry.dto';
import { InternalRes } from '@/common/types/internal-res';

@Injectable()
export class MinistryRepository {
  constructor(
    @InjectRepository(MinistryEntity)
    private readonly ministryRepository: Repository<MinistryEntity>,
  ) {}

  async create(createMinistryDto: CreateMinistryDto): Promise<InternalRes> {
    try {
      const newMinistry = this.ministryRepository.create({
        uuid: randomUUID(),
        name: createMinistryDto.name,
        branch: createMinistryDto.branch,
        lead_ministry: { uuid: createMinistryDto.lead_ministry } as any,
        members: [],
      });

      await this.ministryRepository.save(newMinistry);

      return { status: true, data: newMinistry, message: 'Ministério criado com sucesso' };
    } catch (error: any) {
      return { status: false, error: error.message };
    }
  }

  async findAll(): Promise<InternalRes> {
    try {
      const ministries = await this.ministryRepository.find({
        relations: ['lead_ministry', 'members'],
      });

      return { status: true, data: ministries, message: 'OK' };
    } catch (error: any) {
      return { status: false, error: error.message };
    }
  }

  async findOne(uuid: string): Promise<InternalRes> {
    try {
      const ministry = await this.ministryRepository.findOne({
        where: { uuid },
        relations: ['lead_ministry', 'members'],
      });

      if (!ministry) {
        return { status: false, error: 'Ministério não encontrado' };
      }

      return { status: true, data: ministry, message: 'OK' };
    } catch (error: any) {
      return { status: false, error: error.message };
    }
  }
}
