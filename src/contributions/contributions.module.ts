import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContributionsController } from './controllers/contributions.controller';
import { ContributionsService } from './services/contributions.service';
import { ContributionsRepository } from './repositories/contributions.repository';
import { ContributionEntity } from './entities/contribution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContributionEntity])],
  controllers: [ContributionsController],
  providers: [ContributionsService, ContributionsRepository],
  exports: [ContributionsService, ContributionsRepository],
})
export class ContributionsModule {}
