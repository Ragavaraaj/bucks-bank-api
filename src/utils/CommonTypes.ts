import { FastifyRequest, FastifyReply } from "fastify";
import { Ref, DocumentType, mongoose } from "@typegoose/typegoose";
import { ServerResponse } from "http";

export type FieldResolverType<T, N> = (
  parent: T
) =>
  | Promise<DocumentType<N> | null>
  | Promise<Ref<N, string | undefined>[] | undefined>;

export interface MyContext {
  res: FastifyReply<ServerResponse>;
  req: FastifyRequest;
  dbConn: typeof mongoose;
  payload?: {
    userId: string;
    userTransactionsId: string;
    userCategoryTypeId: string;
    tokenVersion: string;
  };
}
