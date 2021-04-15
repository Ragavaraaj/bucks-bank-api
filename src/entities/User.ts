import { ObjectType, Field, ID } from "type-graphql";
import {
  prop as DBProperty,
  getModelForClass,
  DocumentType,
  Ref,
} from "@typegoose/typegoose";
import { CreteUserInput } from "../inputTypes/UserInput";
import { CategoryType } from "./CategoryType";
import { UserTransactions } from "./UserTransactions";
import { REGEX_EMAIL } from "../utils/const";
import { FieldResolverType } from "../utils/CommonTypes";

@ObjectType({ description: "The User model" })
export class User {
  @Field(() => ID)
  public _id?: string;

  @Field()
  @DBProperty({ trim: true })
  public name!: string;

  @Field()
  @DBProperty({ match: REGEX_EMAIL, unique: true })
  public email!: string;

  @DBProperty({ minlength: 8 })
  public password!: string;

  @DBProperty({ ref: () => CategoryType })
  public categoryType!: Ref<CategoryType>;

  @DBProperty({ ref: () => UserTransactions })
  public userTransactions!: Ref<UserTransactions>;

  @DBProperty({ default: 0 })
  public tokenVersion?: number;

  public static createNewModel(
    input: CreteUserInput,
    categoryType: DocumentType<CategoryType>,
    userTransactions: DocumentType<UserTransactions>
  ) {
    return {
      ...input,
      categoryType: categoryType._id,
      userTransactions: userTransactions._id,
    };
  }
}

export interface IUserFieldResolver {
  categoryType: FieldResolverType<User, CategoryType>;
  userTransactions: FieldResolverType<User, UserTransactions>;
}

export const UserModel = getModelForClass(User);
