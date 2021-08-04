import { Express, Request, Response } from "express";
import validateRequest from "./middleware/validateRequest";
import { createUserHandler } from "./controller/user.controller";
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionHandler } from "./controller/session.controller";
import { createUserSchema, createUserSessionSchema } from "./schema/user.schema";
import { requiresUser } from "./middleware";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  app.get('/api/sessions', requiresUser, getUserSessionHandler)
  app.post('/api/users', validateRequest(createUserSchema), createUserHandler)
  app.post('/api/sessions', validateRequest(createUserSessionSchema), createUserSessionHandler)
  app.delete('/api/sessions', requiresUser, invalidateUserSessionHandler)
}