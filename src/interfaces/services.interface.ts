import { InternalRes } from "../types/internalRes";

export interface ServicesIF<T> {
  findOne(data: string): Promise<InternalRes>;
  findAll(): Promise<InternalRes>;
  create(data: T): Promise<InternalRes>;
}
