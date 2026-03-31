import { DataSource } from "typeorm";
import { CultModel } from "../../models/Cult.model";
import { MemberModel } from "../../models/Member.model";
import { MinistryModel } from "../../models/Ministry.model";

export const AppDataSource: DataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST_DB,
  port: Number(process.env.PORT_DB),
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
  synchronize: true, // CUIDADO EM PROD
  logging: true,
  entities: [CultModel, MemberModel, MinistryModel],
});
