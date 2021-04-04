import { ObjectType, Field, ID, Int } from "type-graphql";
import { prop as DBProperty, getModelForClass } from "@typegoose/typegoose";
import { TRANSACTION_TYPE } from "../types/Enums";

@ObjectType({ description: "The Category Type model" })
export class TransactionDetails {
  @Field(() => ID)
  id: String;

  @Field(() => String)
  @DBProperty({ enum: TRANSACTION_TYPE, type: () => String, required: true })
  category: TRANSACTION_TYPE;

  @Field()
  @DBProperty({ required: true })
  type: String;

  @Field(() => Int)
  @DBProperty({ required: true })
  amount: number;

  @Field({ nullable: true })
  @DBProperty()
  description: String;

  @Field()
  @DBProperty({ nullable: true })
  img: String;
}

export const TransactionDetailsModel = getModelForClass(TransactionDetails);
