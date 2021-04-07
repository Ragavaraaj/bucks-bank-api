import { ObjectType, Field, ID, Int } from "type-graphql";
import { prop as DBProperty, getModelForClass } from "@typegoose/typegoose";

@ObjectType({ description: "The Name model" })
export class SchoolDetails {
  @Field(() => ID)
  public id?: String;

  @Field()
  @DBProperty()
  public shoolName!: String;

  @Field(() => Int)
  @DBProperty({ min: 2 })
  public passedOutYear!: number;

  constructor(schoolName: String, passedOutYear: number) {
    this.shoolName = schoolName;
    this.passedOutYear = passedOutYear;
  }
}

export const SchoolDetailsModel = getModelForClass(SchoolDetails);
