import { Router } from "express";

export interface RoutesIF {
  routing(): void;
  getRouter(): Router;
}
