import { ObjectType, Field, ID } from "type-graphql";
import { prop as DBProperty, getModelForClass } from "@typegoose/typegoose";
// import { CategoryType } from "./CategoryType";
import { REGEX_EMAIL } from "../utils/const";
// import { Ref } from "../utils/ref";

@ObjectType({ description: "The User model" })
export class User {
  @Field(() => ID)
  id: String;

  @Field()
  @DBProperty({ required: true, trim: true })
  name: String;

  @Field()
  @DBProperty({ required: true, match: REGEX_EMAIL, unique: true })
  email: String;

  @DBProperty({ required: true, minlength: 8 })
  password: String;

  // @Field(() => CategoryType)
  // @DBProperty({ required: true, ref: () => CategoryType })
  // categoryType: Ref<CategoryType>;
}

export const UserModel = getModelForClass(User);
