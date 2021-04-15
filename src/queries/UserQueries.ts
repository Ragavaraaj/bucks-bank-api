import { UserModel, User } from "../entities/User";
import {
  CreteUserInput,
  UpdateUserBasicDetails,
} from "../inputTypes/UserInput";
import { CategoryTypeModel, CategoryType } from "../entities/CategoryType";
import {
  UserTransactionsModel,
  UserTransactions,
} from "../entities/UserTransactions";

export const deleteUserFromDb = async (
  userId: string,
  categoryTypeId: string,
  userTransactionsId: string
) => {
  await UserTransactionsModel.findOneAndRemove({
    _id: userTransactionsId,
  }).exec();
  await CategoryTypeModel.findOneAndRemove({ _id: categoryTypeId }).exec();
  await UserModel.findOneAndRemove({ _id: userId }).exec();
};

export const deleteAllUserFromDb = async () => {
  await UserModel.deleteMany({});
  await CategoryTypeModel.deleteMany({});
  await UserTransactionsModel.deleteMany({});
};

export const getAllUserFromDb = async () => {
  return await UserModel.find({}).exec();
};

export const getUserFromDbWithId = async (id: string) => {
  return await UserModel.findById({ _id: id }).exec();
};

export const getUserFromDbWithEmail = async (email: string) => {
  return await UserModel.findOne({ email: email });
};

export const changeUserDetailsInDb = async (
  userId: string,
  userDetail: UpdateUserBasicDetails
) => {
  return await UserModel.findOneAndUpdate({ _id: userId }, userDetail, {
    upsert: false,
    new: true,
  }).exec();
};

export const addNewUseIntoDb = async (input: CreteUserInput) => {
  const newCategoryType = await CategoryTypeModel.create(
    CategoryType.createNewModel()
  );
  const newUserTransactions = await UserTransactionsModel.create(
    UserTransactions.createNewModel()
  );
  return await (
    await UserModel.create(
      User.createNewModel(input, newCategoryType, newUserTransactions)
    )
  ).save();
};
