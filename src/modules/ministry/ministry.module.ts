import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MinistryController } from './controllers/ministry.controller';
import { MinistryService } from './services/ministry.service';
import { MinistryRepository } from './repositories/ministry.repository';
import { MinistryEntity } from './entities/ministry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MinistryEntity])],
  controllers: [MinistryController],
  providers: [MinistryService, MinistryRepository],
  exports: [MinistryService, MinistryRepository],
})
export class MinistryModule {}
