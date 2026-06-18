import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MembersController } from "./controllers/members.controller";
import { MembersService } from "./services/members.service";
import { MembersRepository } from "./repositories/members.repository";
import { MemberEntity } from "./entities/member.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MemberEntity])],
  controllers: [MembersController],
  providers: [MembersService, MembersRepository],
  exports: [MembersService, MembersRepository],
})
export class MembersModule {}
