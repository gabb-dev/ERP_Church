import { NextFunction, Request, Response, Router } from "express";
import { Routes } from "../interfaces/routes.interface";
import { ContributionsController } from "../controllers/contributions.controller";

export class ContributionsRouter implements Routes {
   constructor(
      private readonly router: Router,
      private readonly contributionsController: ContributionsController,
   ) { }

   routing(): void {
      throw new Error("Method not implemented.");
   }

   private findAll(req: Request, res: Response, next: NextFunction) {
      
   }

   getRouter(): Router {
      return this.router;
   }
}