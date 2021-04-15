import { Ref } from "@typegoose/typegoose";
import { CategoryTypeModel, CategoryType } from "../entities/CategoryType";

export const getCategoryType = async (id: Ref<CategoryType> | string) => {
  return await CategoryTypeModel.findById({ _id: id }).exec();
};

type CustomCategoryType = "customExpenditureType" | "customIncomeType";

export const updateCustomType = async (
  categoryTypeId: string,
  type: CustomCategoryType,
  newCategoryType: string[]
) => {
  const newData = await CategoryTypeModel.findByIdAndUpdate(
    { _id: categoryTypeId },
    {
      $addToSet: { [`${type}`]: { $each: newCategoryType } },
    },
    { new: true }
  ).exec();
  return newData && newData[type];
};
