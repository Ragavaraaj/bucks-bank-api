import { ObjectType, Field, ID } from "type-graphql";
import { prop as DBProperty, getModelForClass } from "@typegoose/typegoose";
import {
  ARRAY_OF_DEFAULT_INCOME_TYPE,
  ARRAY_OF_DEFAULT_EXPENDITURE_TYPE,
} from "../utils/Enums";

@ObjectType({ description: "The CategoryType model" })
export class CategoryType {
  @Field(() => ID)
  public _id?: string;

  @Field(() => [String])
  @DBProperty({
    type: () => [String],
    lowercase: true,
  })
  public defaultIncomeType!: string[];

  @Field(() => [String])
  @DBProperty({
    type: () => [String],
    lowercase: true,
  })
  public defaultExpenditureType!: string[];

  @Field(() => [String], { nullable: "items" })
  @DBProperty({ type: () => [String], lowercase: true })
  public customIncomeType!: string[];

  @Field(() => [String], { nullable: "items" })
  @DBProperty({ type: () => [String], lowercase: true })
  public customExpenditureType!: string[];

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
