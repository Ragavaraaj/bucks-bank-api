import { Resolver, Arg, Query, Mutation } from "type-graphql";
import { UserTransactions } from "../entities/UserTransactions";
import { TransactionDetails } from "../entities/TransactionDetails";
import {
  TransactionDetailsInput,
  NewSetTransactionsInput,
} from "../inputTypes/TransactionDetailsInput";
import {
  insertNewTransaction,
  getTransactionsDetailsFromUser,
  updateTransactionDetailsDB,
} from "../queries/UserTransactionQueries";

@Resolver()
export class UserTransactionResolver {
  @Mutation((_return) => UserTransactions, { nullable: false })
  async addNewTransaction(
    @Arg("input", { nullable: false }) input: TransactionDetailsInput
  ) {
    return await insertNewTransaction(input);
  }

  @Mutation((_return) => UserTransactions, { nullable: true })
  async updateTransactions(
    @Arg("input", { nullable: true })
    input: TransactionDetailsInput
  ) {
    return await updateTransactionDetailsDB(input);
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
