import { DataSource, Repository } from "typeorm";
import { MinistryEntity } from "../entitys/Ministry.entity";
import { InternalRes } from "../types/internalRes";
import { LoggerUtil } from "../utils/logger/Logger.util";

import { MinistryModel } from "../models/Ministry.model";
import { RepositoryIF } from "../interfaces/repositorys.interface";

export class MinistryRepository implements RepositoryIF<MinistryEntity> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly ministryRepository: Repository<MinistryEntity> = dataSource.getRepository(
      MinistryEntity,
    ),
  ) {}
  findOne(data: string): Promise<InternalRes> {
    throw new Error("Method not implemented.");
  }

  async create(ministryEntity: MinistryEntity): Promise<InternalRes> {
    try {
      const newMinistry: MinistryModel = {
        uuid: crypto.randomUUID(),
        name: ministryEntity.name,
        lead_ministry: ministryEntity.lead_ministry,
        members: [], // VERIFICAR SE FOI ENVIADO MEMBROS
        branch: ministryEntity.branch,
      };
      await this.ministryRepository.save(newMinistry);
      return { status: true, message: "Criado", data: [] };
    } catch (e: any) {
      LoggerUtil.error(`MINISTRY MODEL --> Error ao salvar o ministério: ${e}`);
      return { status: false, error: e };
    }
  }

  async findAll(): Promise<InternalRes> {
    LoggerUtil.info("MINISTRY MODEL --> Consultando tabela Ministrys...");
    const ministrys: MinistryEntity[] = await this.ministryRepository.find({
      relations: ["lead_ministry", "members"],
      select: {
        members: {
          uuid: true,
          full_name: true,
          social_name: true,
          email: true,
        },

        lead_ministry: {
          uuid: true,
          full_name: true,
          social_name: true,
          telephone: true,
          email: true,
        },
      },
    });

    if (ministrys.length === 0) {
      LoggerUtil.info("MINISTRY MODEL --> Nenhum ministério achado");
      return {
        status: false,
        error: new Error("Nenhum ministério encontrado"),
      };
    }

    LoggerUtil.info("MISTRY MODEL --> Ministérios encontrados!");
    return { status: true, data: ministrys, message: "OK" };
  }

  async findMinistrys(uuids: string[]): Promise<InternalRes> {
    let ministrys: MinistryEntity[] = [];

    for (let uuidKey of uuids) {
      try {
        let ministry: MinistryEntity[] | null =
          await this.ministryRepository.find({
            where: { uuid: uuidKey },
          });

        if (!ministry) {
          throw new Error("Ministério inválido");
        }

        ministrys.push(ministry[0]);
      } catch (e: Error | any) {
        LoggerUtil.error(`MINISTRY MODEL --> Erro: ${e.message}`);
        LoggerUtil.error(`MINISTRY MODEL --> Ministério enviado: ${uuidKey}`);
        return { status: false, error: e.message };
      }
    }

    return { status: true, data: ministrys, message: "OK" };
  }

  async update(data: string): Promise<InternalRes> {
    return { status: false, error: new Error() };
  }
}
