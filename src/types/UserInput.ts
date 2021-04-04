import { InputType, Field } from "type-graphql";
import { User } from "../entities/User";
import { Min, Matches } from "class-validator";
import { REGEX_EMAIL } from "../utils/const";

@InputType()
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

@InputType()
export class changeDisplayNameInputs {
  @Field()
  forId: String;

  @Field()
  withName: String;
}
