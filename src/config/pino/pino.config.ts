import { Request, Response } from "express";
import { app } from "../../main";
import { logger } from "./logger.config";
import { Logger } from "pino";
import { ReqId } from "pino-http";

app.use(
  PinoHttp({
    logger,
    customSuccessMessage: (req: Request) => {
      return `Request feita: ${req.method} ${req.url}`;
    },
    serializers: {
      req: (req: Request) => ({
        id: req.id,
        method: req.method,
        host: req.host,
        url: req.url,
        userAgent: req.headers["user-agent"],
        body: req.body,
      }),
      res: (res: Response) => ({
        statusCode: res.statusCode,
        body: res.json,
      }),
    },

    redact: {
      paths: ["req.headers.authorization", "req.body.password"],
      remove: true,
    },
  }),
);

function PinoHttp(arg0: {
  logger: Logger<never, boolean>;
  customSuccessMessage: (req: Request, res: Response) => string;
  serializers: {
    req: (req: Request) => {
      id: ReqId;
      method: string;
      host: string;
      url: string;
      userAgent: string | undefined;
      body: [];
    };
    res: (res: Response) => { statusCode: number; body: {} };
  };
  redact: { paths: string[]; remove: boolean };
}): any {
  throw new Error("Function not implemented.");
}
