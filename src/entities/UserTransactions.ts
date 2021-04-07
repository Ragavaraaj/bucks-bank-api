import { ObjectType, Field, ID, Int } from "type-graphql";
import { prop as DBProperty, getModelForClass } from "@typegoose/typegoose";
import { TransactionDetails } from "./TransactionDetails";
import { FieldResolverType, Ref } from "../utils/CommonTypes";

@ObjectType({ description: "The UserTransactions model" })
export class UserTransactions {
  @Field(() => ID)
  public id: String;

  @Field(() => Int)
  @DBProperty()
  public total!: number;

  @Field(() => [TransactionDetails], { nullable: "items" })
  @DBProperty({ type: () => [TransactionDetails] })
  public transactions!: Ref<TransactionDetails>[];

  public _doc: Partial<UserTransactions>;

  public static createNewModel() {
    return { total: 0, transactions: [] };
  }
}
export interface IUserTransactionsFieldResolver {
  transactions: FieldResolverType<UserTransactions, TransactionDetails[]>;
}

export const UserTransactionsModel = getModelForClass(UserTransactions);
