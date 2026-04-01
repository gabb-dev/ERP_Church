import { InternalRes } from "../types/internalRes";

export interface RepositoryIF<T> {
  findOne(data: string): Promise<InternalRes>;
  findAll(): Promise<InternalRes>;
  create(data: T): Promise<InternalRes>;
  update(data: string): Promise<InternalRes>;
}
