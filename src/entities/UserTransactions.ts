import { ObjectType, Field, ID, Int } from "type-graphql";
import { prop as DBProperty, getModelForClass, Ref } from "@typegoose/typegoose";
import { TransactionDetails } from "./TransactionDetails";
import { FieldResolverType } from "../utils/CommonTypes";

@ObjectType({ description: "The UserTransactions model" })
export class UserTransactions {
  private _id: String;

  @Field(() => ID)
  get id(): String {
    return this._id;
  }

  @Field(() => Int)
  @DBProperty()
  public total!: number;

  @Field(() => [TransactionDetails], { nullable: "items" })
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
