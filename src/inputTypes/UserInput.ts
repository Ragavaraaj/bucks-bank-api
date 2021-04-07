import { InputType, Field } from "type-graphql";
import { User } from "../entities/User";
import { Min, Matches } from "class-validator";
import { REGEX_EMAIL } from "../utils/const";

@InputType({ description: "input type to add new user" })
export class UserInput implements Partial<User> {
  @Field()
  name: String;

  @Field()
  @Matches(REGEX_EMAIL)
  email: String;

  @Field()
  @Min(8)
  password: String;
}

@InputType({ description: "input type to update user's display name" })
export class changeDisplayNameInputs {
  @Field()
  id: String;

  @Field()
  name: String;
}
