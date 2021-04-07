import { ObjectType, Field, ID, Int } from "type-graphql";
import {
  prop as DBProperty,
  getModelForClass,
  DocumentType,
} from "@typegoose/typegoose";
import { SchoolDetails } from "./SchoolDetails";
import { NameInput } from "../type/NameInput";
import { FieldResolverType } from "../../utils/CommonTypes";

@ObjectType({ description: "The Name model" })
export class Name {
  @Field(() => ID)
  public id: String;

  @Field()
  @DBProperty()
  public name!: String;

  @Field(() => Int)
  @DBProperty({ min: 2 })
  public phoneNumber!: number;

  @DBProperty({ ref: () => SchoolDetails })
  public schoolDetails!: SchoolDetails;

  constructor(input: NameInput, schoolDetails: DocumentType<SchoolDetails>) {
    this.name = input.name;
    this.phoneNumber = input.phoneNumber;
    this.schoolDetails = schoolDetails._id;
  }
}

export interface INameFieldResolver {
  schoolDetails: FieldResolverType<Name, SchoolDetails>;
}

export const NameModel = getModelForClass(Name);
