import { ObjectType, Field, ID, Int } from "type-graphql";
import {
  prop as DBProperty,
  getModelForClass,
  DocumentType,
  Ref,
} from "@typegoose/typegoose";
import { SchoolDetails } from "./SchoolDetails";
import { NameInput } from "../type/NameInput";
import { FieldResolverType } from "../../utils/CommonTypes";

@ObjectType({ description: "The Name model" })
export class Name {
  public _id?: String;

  @Field(() => ID)
  get id(): String {
    return this._id ?? "NO ID";
  }

  @Field()
  @DBProperty()
  public name!: String;

  @Field(() => Int)
  @DBProperty({ min: 2 })
  public phoneNumber!: number;

  @DBProperty({ ref: () => SchoolDetails })
  public schoolDetails!: Ref<SchoolDetails>;

  public static createNewModel(
    input: NameInput,
    schoolDetails: DocumentType<SchoolDetails>
  ) {
    return {
      ...input,
      schoolDetails: schoolDetails._id,
    };
  }
}

export interface INameFieldResolver {
  schoolDetails: FieldResolverType<Name, SchoolDetails>;
}

export const NameModel = getModelForClass(Name);
