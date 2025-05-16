import { RequestHandler } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export type WithError<T = {}> = T & { error: string; details: string };

export type ExpressHandler<
  ReqBody = any,
  ResBody = any,
  Params extends ParamsDictionary = ParamsDictionary,
  Query = ParsedQs
> = RequestHandler<Params, Partial<WithError<ResBody>>, Partial<ReqBody>, Query>;
