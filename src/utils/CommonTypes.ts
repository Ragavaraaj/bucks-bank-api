import { Ref, DocumentType } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

export type FieldResolverType<T, N> = (
  parent: T
) => Promise<DocumentType<N> | null>
  | Promise<Ref<N, ObjectId | undefined>[] | undefined>;
