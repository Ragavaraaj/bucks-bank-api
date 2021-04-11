import { ObjectType, Field, ID, Int } from "type-graphql";
import { prop as DBProperty, getModelForClass } from "@typegoose/typegoose";

@ObjectType({ description: "The Name model" })
export class SchoolDetails {
  public _id?: String;

  @Field(() => ID)
  get id(): String {
    return this._id ?? "NO ID";
  }

  @Field()
  @DBProperty()
  public shoolName!: String;

  @Field(() => Int)
  @DBProperty({ min: 2 })
  public passedOutYear!: number;

  public static createNewModel(schoolName: String, passedOutYear: number) {
    return {
      shoolName: schoolName,
      passedOutYear: passedOutYear,
    };
  }
}

export const SchoolDetailsModel = getModelForClass(SchoolDetails);
