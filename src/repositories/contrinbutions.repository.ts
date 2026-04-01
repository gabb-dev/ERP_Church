import { ContributionsEntity } from "../entitys/Contributions.entity";
import { RepositoryIF } from "../interfaces/repositorys.interface";
import { InternalRes } from "../types/internalRes";

export class ContributionsRepository implements RepositoryIF<ContributionsEntity> {
   findOne(data: string): Promise<InternalRes> {
      throw new Error("Method not implemented.");
   }
   findAll(): Promise<InternalRes> {
      throw new Error("Method not implemented.");
   }
   create(data: ContributionsEntity): Promise<InternalRes> {
      throw new Error("Method not implemented.");
   }
   update(data: string): Promise<InternalRes> {
      throw new Error("Method not implemented.");
   }
}
