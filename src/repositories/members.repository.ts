import { DataSource, Repository } from "typeorm";
import { MemberEntity } from "../entitys/Member.entity";
import { LoggerUtil } from "../utils/logger/Logger.util";
import { InternalRes } from "../types/internalRes";
import { MemberModel } from "../models/Member.model";
import { RepositoryIF } from "../interfaces/repositorys.interface";

export class MembersRepository implements RepositoryIF<MemberEntity> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly memberRepository: Repository<MemberModel> = dataSource.getRepository(
      MemberModel,
    ),
  ) {}

  async create(member: MemberEntity): Promise<InternalRes> {
    const newMember: MemberModel = {
      uuid: crypto.randomUUID(),
      full_name: member.full_name,
      social_name: member.social_name,
      date_birth: member.date_birth,
      sex: member.sex,
      email: member.email,
      passwordHash: member.passwordHash,
      telephone: member.telephone,
      address: JSON.stringify(member.address),
      date_baptism: member.date_baptism,
      ministry: member.ministrys,
      status: "Ativo",
      presence: 0,
    };

    try {
      await this.memberRepository.save(newMember);

      LoggerUtil.info(`MODEL --> Usuário cadastrado!`);
      return { status: true, data: newMember, message: "Criado" };
    } catch (e: any) {
      LoggerUtil.error(`MODEL --> Error ao cadastrar o usuário ${e}`);
      return { status: false, error: e };
    }
  }

  async findAll(): Promise<InternalRes> {
    try {
      const users: MemberModel[] = await this.memberRepository.find({
        relations: ["ministry"],
      });

      users.map((value) => (value.address = JSON.parse(value.address)));

      return { status: true, data: users, message: "OK" };
    } catch (e) {
      LoggerUtil.error(
        `USER MODEL --> ERROR ao tentar buscar todos os usuários do banco de dados: ${e}`,
      );
      return {
        status: false,
        error: new Error("Não foi possível achar os usuários"),
      };
    }
  }

  async findOne(uuid: string): Promise<InternalRes> {
    try {
      const member: null | MemberModel = await this.memberRepository.findOne({
        where: { uuid: uuid },
        relations: ["ministry"],
        select: { ministry: true },
      });

      if (!member) throw Error("Usuário nao encontrado");

      return { status: true, data: member, message: "OK" };
    } catch (e: any) {
      LoggerUtil.error(`MEMBERS REPOSITORY --> ERROR: ${e.message}`);
      return { status: false, error: e.message };
    }
  }

  update(data: string): Promise<InternalRes> {
    throw new Error("Method not implemented.");
  }
}
