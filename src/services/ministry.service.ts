import { MinistryEntity } from "../entitys/Ministry.entity";
import { MinistryRepository } from "../repositories/ministry.repository";
import { MinistryDTO } from "../dtos/ministry.dto";
import { LoggerUtil } from "../utils/logger/Logger.util";
import { InternalRes } from "../types/internalRes";
import { MembersRepository } from "../repositories/members.repository";
import { MemberEntity } from "../entitys/Member.entity";
import { ServicesIF } from "../interfaces/services.interface";

export class MinistryService implements ServicesIF<MinistryDTO> {
  constructor(
    private readonly ministryRepository: MinistryRepository,
    private readonly memberRepository: MembersRepository,
  ) {}

  async create(ministryDto: MinistryDTO): Promise<InternalRes> {
    if (typeof ministryDto.lead_ministry !== "string")
      return {
        status: false,
        error: new Error("Líder de ministério inválido (espera-se uma string)"),
      };

    const memberRes: InternalRes = await this.memberRepository.findOne(
      ministryDto.lead_ministry,
    );

    if (!memberRes.status) {
      return { status: false, error: memberRes.error };
    }

    const lead_ministry: MemberEntity = memberRes.data;
    const newMinistry: MinistryEntity = {
      lead_ministry: lead_ministry,
      name: ministryDto.name,
      branch: ministryDto.branch,
      members: [],
    };

    LoggerUtil.info("MINISTRY SERVICE --> Acessando o MINISTRY MODEL...");
    const repositoryResponse: InternalRes =
      await this.ministryRepository.create(newMinistry);

    repositoryResponse.status
      ? LoggerUtil.debug(`MINISTRY SERVICE --> Ministério cadastrado!`)
      : LoggerUtil.error(
          "MINISTRY SERVICE --> Error ao cadastrar o ministério",
        );

    if (!repositoryResponse.status) {
      return { status: false, error: new Error("Error ao criar o ministério") };
    }

    return { status: true, data: newMinistry, message: "Criado" };
  }

  async findAll(): Promise<InternalRes> {
    const repositoryResponse: InternalRes =
      await this.ministryRepository.findAll();

    if (!repositoryResponse.status) {
      return {
        status: false,
        error: new Error("Nenhum ministério encontrado"),
      };
    }

    return { status: true, data: repositoryResponse.data, message: "OK" };
  }

  async findOne(uuid: string): Promise<InternalRes> {
    const ministryRes: InternalRes =
      await this.ministryRepository.findMinistrys([uuid]);
    let ministry: MinistryEntity | null;

    ministryRes.status ? (ministry = ministryRes.data) : (ministry = null);

    if (ministryRes.status) {
      return { status: true, data: ministry, message: "OK" };
    }

    return { status: false, error: ministryRes.error };
  }
}
