import express, { Request, Response, Router } from "express";

import dotenv from "dotenv";
dotenv.config();

import { MembersRouter } from "./routes/members.route";
import { MinistryRouter } from "./routes/ministry.route";

import { MembersController } from "./controllers/members.controller";
import { MinistryController } from "./controllers/ministry.controller";

import { MembersSerice } from "./services/members.service";
import { MinistryService } from "./services/ministry.service";

import { MinistryRepository } from "./repositories/ministry.repository";
import { MembersRepository } from "./repositories/members.repository";

import { logger } from "./config/pino/logger.config";
import { LoggerUtil } from "./utils/logger/Logger.util";
import PinoHttp from "pino-http";

import { AppDataSource } from "./config/database/data.config";
import { bootDB } from "./config/database/bootConnection.config";

export const app = express();

app.use(express.json());

const ministryModel: MinistryRepository = new MinistryRepository(AppDataSource);
const memberModel: MembersRepository = new MembersRepository(AppDataSource);

const membersService: MembersSerice = new MembersSerice(
  memberModel,
  ministryModel,
);
const ministryService: MinistryService = new MinistryService(
  ministryModel,
  memberModel,
);

const membersController: MembersController = new MembersController(
  membersService,
);
const ministryController: MinistryController = new MinistryController(
  ministryService,
);

const membersRouter: MembersRouter = new MembersRouter(
  Router(),
  membersController,
);
const ministryRouter: MinistryRouter = new MinistryRouter(
  Router(),
  ministryController,
);

bootDB(AppDataSource);
membersRouter.routing();
ministryRouter.routing();

app.use("/members", membersRouter.getRouter());
app.use("/ministrys", ministryRouter.getRouter());

app.listen(process.env.PORT || 8080, () => {
  LoggerUtil.info(
    `Servidor rodando em http://localhost:${process.env.PORT || 8080}`,
  );
});
