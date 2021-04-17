import { InputType, Field, Int } from "type-graphql";
import { TransactionDetails } from "../entities/TransactionDetails";
import { TRANSACTION_TYPE } from "../utils/Enums";

@InputType({ description: "input type to add new transaction" })
export class TransactionDetailsInput implements Partial<TransactionDetails> {
  
  @Field(() => String, {nullable: true})
  transactionId?: String;

  @Field(() => String)
  type: TRANSACTION_TYPE;

  @Field(() => Int)
  amount: number;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  img: string;
}

@InputType({ description: "input type to get data for pagination" })
export class NewSetTransactionsInput {
  @Field(() => Int)
  setNumber: number;

  @Field(() => Int, { nullable: true })
  minRecords?: number;
}
