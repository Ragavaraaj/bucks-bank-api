import { UserModel } from "../entities/User";
import { CategoryTypeModel } from "../entities/CategoryType";

export const getCategoryTypeFromUser = async (id: String) => {
  const user = await UserModel.findById({ _id: id });
  return await CategoryTypeModel.findById({ _id: user?.categoryType }).exec();
};

export const getCategoryType = async (id: String) => {
  return await CategoryTypeModel.findById({ _id: id }).exec();
};

type CustomCategoryType = "customExpenditureType" | "customIncomeType";

export const updateCustomType = async (
  id: String,
  type: CustomCategoryType,
  newCategoryType: String[]
) => {
  const user = await UserModel.findById({ _id: id }).exec();
  const newData = await CategoryTypeModel.findByIdAndUpdate(
    { _id: user?.categoryType },
    {
      $addToSet: { [`${type}`]: { $each: newCategoryType } },
    },
    { new: true }
  ).exec();
  return newData && newData[type];
};
