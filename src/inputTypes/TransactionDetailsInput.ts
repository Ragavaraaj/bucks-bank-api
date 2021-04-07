import { InputType, Field, Int } from "type-graphql";
import { TransactionDetails } from "../entities/TransactionDetails";
import { TRANSACTION_TYPE } from "../utils/Enums";

@InputType({ description: "input type to add new transaction" })
export class TransactionDetailsInput implements Partial<TransactionDetails> {
  @Field(() => String)
  userId: String;

  @Field(() => String)
  type: TRANSACTION_TYPE;

  @Field(() => Int)
  amount: number;

  @Field({ nullable: true })
  description: String;

  @Field({ nullable: true })
  img: String;
}

@InputType({ description: "input type to get data for pagination" })
export class NewSetTransactionsInput {
  @Field(() => String)
  id: String;

  @Field(() => Int)
  setNumber: number;

  @Field(() => Int, { nullable: true })
  minRecords?: number;
}
