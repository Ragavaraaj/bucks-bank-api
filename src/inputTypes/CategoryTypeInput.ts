import { InputType, Field } from "type-graphql";

@InputType({
  description: "input type to update custom income or expenditure arr type",
})
export class UpdateCustomTypeInput {
  @Field()
  id: String;

  @Field(() => [String])
  newCategoryType: String[];
}
