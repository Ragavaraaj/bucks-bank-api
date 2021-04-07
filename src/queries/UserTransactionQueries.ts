import { UserModel } from "../entities/User";
import { UserTransactionsModel } from "../entities/UserTransactions";
import {
  TransactionDetailsModel,
  TransactionDetails,
} from "../entities/TransactionDetails";

export const getUserTransactions = async (id: String) => {
  return await UserTransactionsModel.findById({
    _id: id,
  })
    .select({ transactions: 0 })
    .exec();
};

export const getTransactionsDetailsFromUser = async (
  id: String,
  from: number,
  to: number
) => {

  console.log("from => ", from, "to => ", to);
  const user = await UserModel.findById({ _id: id });

  console.log("User => ", user);
  const userTransactions = await UserTransactionsModel.findById({
    _id: user?.userTransactions,
  }).exec();

  console.log("userTransactions => ", userTransactions);
  const data = userTransactions?.transactions.slice(from, to);

  console.log("data => ", data);
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

export const insertNewTransaction = async <T>(input: T | any) => {
  const newTransaction = await TransactionDetailsModel.create(
    TransactionDetails.createNewModel(input)
  );
  const user = await UserModel.findById({ _id: input.userId }).exec();
  await UserTransactionsModel.findByIdAndUpdate(
    { _id: user?.userTransactions },
    { $push: { transactions: newTransaction } },
    { new: true }
  );
  return "Success";
};
