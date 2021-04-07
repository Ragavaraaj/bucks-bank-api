import { ObjectType, Field, ID } from "type-graphql";
import {
  prop as DBProperty,
  getModelForClass,
  DocumentType,
} from "@typegoose/typegoose";
import { UserInput } from "../inputTypes/UserInput";
import { CategoryType } from "./CategoryType";
import { UserTransactions } from "./UserTransactions";
import { REGEX_EMAIL } from "../utils/const";
import { FieldResolverType, Ref } from "../utils/CommonTypes";

@ObjectType({ description: "The User model" })
export class User {
  @Field(() => ID)
  public id: String;

  @Field()
  @DBProperty({ trim: true })
  public name!: String;

  @Field()
  @DBProperty({ match: REGEX_EMAIL, unique: true })
  public email!: String;

  @DBProperty({ minlength: 8 })
  public password!: String;

  @DBProperty({ ref: () => CategoryType })
  public categoryType!: Ref<CategoryType>;

  @DBProperty({ ref: () => UserTransactions })
  public userTransactions!: Ref<UserTransactions>;

  public _doc: Partial<User>

  public static createNewModel(
    input: UserInput,
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
