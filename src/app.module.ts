import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/database/data.source';
import { PinoLoggerService } from './common/logger/logger.service';
import { MembersModule } from './modules/members/members.module';
import { MinistryModule } from './modules/ministry/ministry.module';
import { ContributionsModule } from './modules/contributions/contributions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    MembersModule,
    MinistryModule,
    ContributionsModule,
  ],
  providers: [PinoLoggerService],
})
export class AppModule {}
