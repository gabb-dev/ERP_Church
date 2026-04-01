import { MemberEntity } from "../entitys/Member.entity";
import { MembersRepository } from "../repositories/members.repository";
import { MinistryRepository } from "../repositories/ministry.repository";
import { MemberDTO } from "../dtos/member.dto";
import { LoggerUtil } from "../utils/logger/Logger.util";
import { InternalRes } from "../types/internalRes";
import { ServicesIF } from "../interfaces/services.interface";

export class MembersSerice implements ServicesIF<MemberDTO> {
  constructor(
    private readonly membersRepository: MembersRepository,
    private readonly ministryRepository: MinistryRepository,
  ) {}

  async create(member: MemberDTO): Promise<InternalRes> {
    LoggerUtil.info("USER SERVICE --> Criando o usuário...");

    const newMember: MemberEntity = {
      full_name: member.full_name,
      social_name: member.social_name,
      date_birth: member.date_birth,
      date_baptism: member.date_baptism,
      sex: member.sex,
      telephone: member.telephone,
      email: member.email,
      passwordHash: member.password, // VERIFICAR DEPOIS
      address: member.address,
      ministrys: [],
    };

    if (member.ministrys.length != 0) {
      const ministryRes: InternalRes =
        await this.ministryRepository.findMinistrys(member.ministrys);

      if (!ministryRes.status) {
        LoggerUtil.error("USER SERVICE -> Error ao procurar ministérios");
      } else {
        newMember.ministrys.push(ministryRes.data);
      }
    }

    const memberRes: InternalRes =
      await this.membersRepository.create(newMember);

    memberRes.status
      ? LoggerUtil.info(`USER SERVICE --> Usuário criado!`)
      : LoggerUtil.error("USER SERVICE --> ERROR ao criar usuário");

    return { status: true, message: "OK", data: newMember };
  }

  async findAll(): Promise<InternalRes> {
    LoggerUtil.info("USER SERVICE --> Consultando banco...");
    const response: InternalRes = await this.membersRepository.findAll();

    if (!response.status)
      return { status: false, error: new Error("Nenhum usuário encontrado") };

    const members: MemberEntity[] = await response.data;

    return { status: true, data: members, message: "OK" };
  }

  async findOne(uuid: string): Promise<InternalRes> {
    const member: InternalRes = await this.membersRepository.findOne(uuid);

    if (member.status) {
      member.data.address = JSON.parse(member.data.address);
      return { status: true, data: member.data, message: "OK" };
    }

    return { status: false, error: new Error("Nenhum usuário encontrado") };
  }
}
