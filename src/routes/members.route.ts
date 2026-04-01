import { NextFunction, Request, Response, Router } from "express";
import { RoutesIF } from "../interfaces/routes.interface";
import { MembersController } from "../controllers/members.controller";
import { VerifyDtoMiddleware } from "../middlewares/verifyDTO.middleware";
import { MemberDTO } from "../dtos/member.dto";
import { VerifyParamsMiddleware } from "../middlewares/verifyPARAMS.middleware";

// CORRIGIR ENDPOITS DE ACORDO COM RESTFULL
export class MembersRouter implements RoutesIF {
  constructor(
    private router: Router,
    private readonly membersController: MembersController,
  ) {}

  routing(): void {
    this.router.get("/", this.findAll.bind(this));

    this.router.get(
      "/:uuid",
      (req: Request, res: Response, next: NextFunction) =>
        VerifyParamsMiddleware.verify(req, res, next, "S"),
      this.findOne.bind(this),
    );

    this.router.post(
      "/",
      (req: Request, res: Response, next: NextFunction) => {
        VerifyDtoMiddleware.verify(req, res, next, MemberDTO);
      },
      this.create.bind(this),
    );
  }

  private async findAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    await this.membersController.findAll(req, res);
  }

  private async findOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    await this.membersController.findOne(req, res);
  }

  private async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    await this.membersController.create(req, res);
  }

  getRouter(): Router {
    return this.router;
  }
}
