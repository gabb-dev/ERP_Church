import { NextFunction, Request, Response, Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import { MinistryController } from "../controllers/ministry.controller";
import { VerifyDtoMiddleware } from "../middlewares/verifyDTO.middleware";
import { MinistryDTO } from "../dtos/ministry.dto";

// CORRIGIR ENDPOINTS DE ACORDO COM RESTFULL
export class MinistryRouter implements Routes {
  constructor(
    private readonly router: Router,
    private readonly ministryController: MinistryController,
  ) {}

  routing(): void {
    this.router.post(
      "/create",
      (req: Request, res: Response, next: NextFunction) => {
        VerifyDtoMiddleware.verifyDTO(req, res, next, MinistryDTO);
      },
      this.create.bind(this)
    );

    this.router.get("/", this.findAll.bind(this));
    this.router.get("/:uuid", this.findOne.bind(this));
  }

  getRouter(): Router {
    return this.router;
  }

  private findAll(req: Request, res: Response, next: NextFunction) {
    this.ministryController.findAll(req, res);
  }

  private findOne(req: Request, res: Response, next: NextFunction) {
    this.ministryController.findOne(req, res);
  }

  private create(req: Request, res: Response, next: NextFunction) {
    this.ministryController.create(req, res);
  }
}
