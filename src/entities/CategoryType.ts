import { ObjectType, Field, ID } from "type-graphql";
import { prop as DBProperty, getModelForClass } from "@typegoose/typegoose";
import { DEFAULT_INCOME_TYPE, DEFAULT_EXPENDITURE_TYPE } from "../types/Enums";

@ObjectType({ description: "The Category Type model" })
export class CategoryType {
  @Field(() => ID)
  id: String;

  @Field(() => [String])
  @DBProperty({
    enum: DEFAULT_INCOME_TYPE,
    type: String,
    lowercase: true,
  })
  defaultIncomeType: [DEFAULT_INCOME_TYPE];

  @Field(() => [String])
  @DBProperty({
    enum: DEFAULT_EXPENDITURE_TYPE,
    type: String,
    lowercase: true,
  })
  defaultExpenditureType: [DEFAULT_EXPENDITURE_TYPE];

  @Field(() => [String], { nullable: "items" })
  @DBProperty({ type: String, lowercase: true })
  customIncomeType: [String];

  @Field(() => [String], { nullable: "items" })
  @DBProperty({ type: String, lowercase: true })
  customExpenditureType: [String];
}

export const CategoryTypeModel = getModelForClass(CategoryType);
