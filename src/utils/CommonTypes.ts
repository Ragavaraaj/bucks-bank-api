import { DocumentType } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

export type FieldResolverType<T, N> = (
  parent: T
) => Promise<DocumentType<N> | null>;

export type Ref<T> = T | ObjectId;
