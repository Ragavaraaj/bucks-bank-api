import { ObjectType, Field, ID, Int } from "type-graphql";
import { prop as DBProperty, getModelForClass } from "@typegoose/typegoose";

@ObjectType({ description: "The Name model" })
export class SchoolDetails {
  public _id?: string;

  @Field(() => ID)
  get id(): string {
    return this._id ?? "NO ID";
  }

  @Field()
  @DBProperty()
  public shoolName!: string;

  @Field(() => Int)
  @DBProperty({ min: 2 })
  public passedOutYear!: number;

  public static createNewModel(schoolName: string, passedOutYear: number) {
    return {
      shoolName: schoolName,
      passedOutYear: passedOutYear,
    };
  }
}

export const SchoolDetailsModel = getModelForClass(SchoolDetails);
