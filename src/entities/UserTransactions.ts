import { ObjectType, Field, ID, Int } from "type-graphql";
import {
  prop as DBProperty,
  getModelForClass,
  Ref,
} from "@typegoose/typegoose";
import { TransactionDetails } from "./TransactionDetails";
import { FieldResolverType } from "../utils/CommonTypes";

@ObjectType({ description: "The UserTransactions model" })
export class UserTransactions {
  @Field(() => ID)
  public _id?: string;

  @Field(() => Int)
  @DBProperty()
  public total!: number;

  @DBProperty({ type: () => [TransactionDetails] })
  public transactions!: Ref<TransactionDetails>[];

  public static createNewModel() {
    return { total: 0, transactions: [] };
  }
}
export interface IUserTransactionsFieldResolver {
  transactions: FieldResolverType<UserTransactions, TransactionDetails>;
}

export const UserTransactionsModel = getModelForClass(UserTransactions);
