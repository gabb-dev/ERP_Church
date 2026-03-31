import { Request, Response } from "express";
import { MembersSerice } from "../services/members.service";
import { LoggerUtil } from "../utils/logger/Logger.util";
import { InternalRes } from "../types/internalRes";
import { UUID } from "node:crypto";

export class MembersController {
  constructor(readonly membersService: MembersSerice) {}

  async findOne(req: Request, res: Response): Promise<Response> {
    const uuid: string = req.params.uuid;

    const member: InternalRes = await this.membersService.findOne(uuid);

    if (!member.status) {
      return res
        .status(404)
        .json({ message: "Membro não encontrado", statusCode: 404 });
    }

    return res
      .status(200)
      .json({ message: "OK", statusCode: 200, member: member.data });
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    LoggerUtil.info("USER CONTROLLER --> Requisição feita");
    const list_user: InternalRes = await this.membersService.findAll();

    if (list_user.status === false) {
      return res
        .status(404)
        .json({ message: "Nenhum registro encontrado", statusCode: 404 });
    }

    return res.status(200).json({
      message: "OK",
      statusCode: 200,
      totalUsers: list_user.data.length,
      users: list_user.data,
    });
  }

  async create(req: Request, res: Response): Promise<Response> {
    LoggerUtil.info("USER CONTROLLER --> Requisição feita");

    const serviceResponse: InternalRes = await this.membersService.create(
      req.body,
    );

    if (!serviceResponse.status) {
      return res
        .status(403)
        .json({ message: "Error. Usuário não definido", statusCode: 403 });
    }

    return res.status(201).json({ message: "Create", statusCode: 201 });
  }
}
