import { InputType, Field } from "type-graphql";
import { User } from "../entities/User";
import { Min, Matches } from "class-validator";
import { REGEX_EMAIL } from "../utils/const";

@InputType({ description: "input type to add new user" })
export class CreteUserInput implements Partial<User> {
  @Field()
  name: string;

  @Field()
  @Matches(REGEX_EMAIL)
  email!: string;

  @Field()
  @Min(8)
  password!: string;
}

@InputType({ description: "input type to login" })
export class LoginUserInput implements Partial<User> {
  @Field()
  @Matches(REGEX_EMAIL)
  email: string;

  @Field()
  @Min(8)
  password!: string;
}

@InputType({ description: "input type to update user's display name" })
export class UpdateUserBasicDetails {
  @Field()
  name?: string;

  @Field({ nullable: true })
  email?: string;
}
