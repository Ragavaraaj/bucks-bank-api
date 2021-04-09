import { ObjectType, Field, ID } from "type-graphql";
import { prop as DBProperty, getModelForClass } from "@typegoose/typegoose";
import {
  ARRAY_OF_DEFAULT_INCOME_TYPE,
  ARRAY_OF_DEFAULT_EXPENDITURE_TYPE,
} from "../utils/Enums";

@ObjectType({ description: "The CategoryType model" })
export class CategoryType {
  public _id?: String;

  @Field(() => ID)
  get id(): String {
    return this._id ?? "NO ID";
  }

  @Field(() => [String])
  @DBProperty({
    type: () => [String],
    lowercase: true,
  })
  public defaultIncomeType!: String[];

  @Field(() => [String])
  @DBProperty({
    type: () => [String],
    lowercase: true,
  })
  public defaultExpenditureType!: String[];

  @Field(() => [String], { nullable: "items" })
  @DBProperty({ type: () => [String], lowercase: true })
  public customIncomeType!: String[];

  @Field(() => [String], { nullable: "items" })
  @DBProperty({ type: () => [String], lowercase: true })
  public customExpenditureType!: String[];

  public static createNewModel() {
    return {
      defaultIncomeType: ARRAY_OF_DEFAULT_INCOME_TYPE,
      defaultExpenditureType: ARRAY_OF_DEFAULT_EXPENDITURE_TYPE,
      customIncomeType: [],
      customExpenditureType: [],
    };
  }
}

export const CategoryTypeModel = getModelForClass(CategoryType);
