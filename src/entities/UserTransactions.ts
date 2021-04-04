import { ObjectType, Field, ID, Int } from "type-graphql";
import { prop as DBProperty, getModelForClass } from "@typegoose/typegoose";
import { TransactionDetails } from "./TransactionDetails";

@ObjectType({ description: "The Category Type model" })
export class UserTransactions {
  @Field(() => ID)
  id: String;

  @Field(() => Int)
  @DBProperty({ required: true })
  total: number;

  @Field(() => [TransactionDetails], { nullable: "items" })
  @DBProperty({ type: () => TransactionDetails, required: true })
  transactions: [TransactionDetails];
}

export const UserTransactionsModel = getModelForClass(UserTransactions);
