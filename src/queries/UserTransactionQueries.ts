import { Ref } from "@typegoose/typegoose";
import { UserModel } from "../entities/User";
import {
  UserTransactionsModel,
  UserTransactions,
} from "../entities/UserTransactions";
import {
  TransactionDetailsModel,
  TransactionDetails,
} from "../entities/TransactionDetails";
import { TransactionDetailsInput } from "../inputTypes/TransactionDetailsInput";

export const getUserTransactions = async (id: Ref<UserTransactions>) => {
  return await UserTransactionsModel.findById({
    _id: id,
  })
    .select({ transactions: 0 })
    .exec();
};
export const updateTransactionDetailsDB = async (
  transactionDetail: TransactionDetailsInput
) => {
  const { userId, transactionId, ...param } = transactionDetail;
  const user = await UserModel.findById({ _id: userId }).exec();
  const userTransactions = await UserTransactionsModel.findOneAndUpdate(
    { _id: user?.userTransactions, "transactions._id": transactionId },
    { $set: { "transactions.$": param } },
    { new: true }
  ).exec();
  return userTransactions;
};

export const getTransactionsDetailsFromUser = async (
  id: String,
  from: number,
  to: number
) => {
  const user = await UserModel.findById({ _id: id });
  const userTransactions = await UserTransactionsModel.findById({
    _id: user?.userTransactions,
  }).exec();

  return userTransactions?.transactions.slice(from, to);
};

export const getTransactionsDetails = async (
  id: String,
  from: number,
  to: number
) => {
  const userTransactions = await UserTransactionsModel.findById({
    _id: id,
  });
  return userTransactions?.transactions.slice(from, to);
};

export const insertNewTransaction = async (input: TransactionDetailsInput) => {
  const newTransaction = await TransactionDetailsModel.create(
    TransactionDetails.createNewModel(input)
  );
  const user = await UserModel.findById({ _id: input.userId }).exec();
  return await UserTransactionsModel.findByIdAndUpdate(
    { _id: user?.userTransactions },
    { $push: { transactions: newTransaction } },
    { new: true }
  );
};
