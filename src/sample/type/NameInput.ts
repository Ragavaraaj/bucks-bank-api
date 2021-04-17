import { InputType, Field, Int } from "type-graphql";
import { Name } from "../entities/Name";
import { Min } from "class-validator";

@InputType()
export class NameInput implements Partial<Name> {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => Int)
  @Min(2)
  phoneNumber: number;

  @Field()
  schoolName: string;

  @Field(() => Int)
  @Min(2)
  passedOutYear: number;
}
