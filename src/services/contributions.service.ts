import { ContributionsEntity } from "../entitys/Contributions.entity";
import { ServicesIF } from "../interfaces/services.interface";
import { InternalRes } from "../types/internalRes";

export class ContributionsService implements ServicesIF<ContributionsEntity> {
   findOne(data: string): Promise<InternalRes> {
      throw new Error("Method not implemented.");
   }
   findAll(): Promise<InternalRes> {
      throw new Error("Method not implemented.");
   }
   create(data: ContributionsEntity): Promise<InternalRes> {
      throw new Error("Method not implemented.");
   }
}
