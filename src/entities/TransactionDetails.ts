import { ObjectType, Field, ID, Int } from "type-graphql";
import { prop as DBProperty, getModelForClass } from "@typegoose/typegoose";
import { TransactionDetailsInput } from "../inputTypes/TransactionDetailsInput";
import { TRANSACTION_TYPE } from "../utils/Enums";

@ObjectType({ description: "The TransactionDetails model" })
export class TransactionDetails {
  @Field(() => ID)
  public id: String;

  @Field(() => String)
  @DBProperty({ enum: TRANSACTION_TYPE })
  public type!: TRANSACTION_TYPE;

  @Field(() => Int)
  @DBProperty()
  public amount!: number;

  @Field({ nullable: true })
  @DBProperty()
  public description?: String;

  @Field({ nullable: true })
  @DBProperty()
  public img?: String;

  public static createNewModel(input: TransactionDetailsInput) {
    return { ...input };
  }
}

export const TransactionDetailsModel = getModelForClass(TransactionDetails);
