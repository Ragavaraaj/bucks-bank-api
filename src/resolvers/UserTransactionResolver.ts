import { Resolver, Arg, Query, Mutation } from "type-graphql";
import { TransactionDetails } from "../entities/TransactionDetails";
import {
  TransactionDetailsInput,
  NewSetTransactionsInput,
} from "../inputTypes/TransactionDetailsInput";
import {
  insertNewTransaction,
  getTransactionsDetailsFromUser,
} from "../queries/UserTransactionQueries";

@Resolver()
export class UserTransactionResolver {
  @Mutation((_return) => String, { nullable: false })
  async addNewTransaction(
    @Arg("input", { nullable: false }) input: TransactionDetailsInput
  ) {
    return insertNewTransaction(input);
  }

  @Query((_return) => [TransactionDetails], { nullable: "items" })
  async returnNextSetTransactions(
    @Arg("input", { nullable: false })
    { id, setNumber, minRecords = 10 }: NewSetTransactionsInput
  ) {
    return getTransactionsDetailsFromUser(
      id,
      minRecords * (setNumber - 1),
      minRecords * setNumber
    );
  }
}
