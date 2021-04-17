import { Resolver, Arg, Query, Mutation, Ctx } from "type-graphql";
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
import { MyContext } from "../utils/CommonTypes";

@Resolver()
export class UserTransactionResolver {
  @Mutation((_return) => UserTransactions, { nullable: false })
  async addNewTransaction(
    @Arg("input", { nullable: false }) input: TransactionDetailsInput,
    @Ctx() { payload }: MyContext
  ) {
    return await insertNewTransaction(payload!.userTransactionsId, input);
  }

  @Mutation((_return) => UserTransactions, { nullable: true })
  async updateTransactions(
    @Arg("input", { nullable: true })
    input: TransactionDetailsInput,
    @Ctx() { payload }: MyContext
  ) {
    return await updateTransactionDetailsDB(payload!.userTransactionsId, input);
  }
  @Query((_return) => [TransactionDetails], { nullable: "items" })
  async returnNextSetTransactions(
    @Arg("input", { nullable: false })
    { setNumber, minRecords = 10 }: NewSetTransactionsInput,
    @Ctx() { payload }: MyContext
  ) {
    return getTransactionsDetailsFromUser(
      payload!.userTransactionsId,
      minRecords * (setNumber - 1),
      minRecords * setNumber
    );
  }
}
