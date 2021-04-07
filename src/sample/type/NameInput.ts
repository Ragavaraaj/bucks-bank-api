import { InputType, Field, Int } from "type-graphql";
import { Name } from "../entities/Name";
import { Min } from "class-validator";

@InputType()
export class NameInput implements Partial<Name> {
  @Field()
  name: String;

  @Field()
  email: String;

  @Field(() => Int)
  @Min(2)
  phoneNumber: number;

  @Field()
  schoolName: String;

  @Field(() => Int)
  @Min(2)
  passedOutYear: number;
}
