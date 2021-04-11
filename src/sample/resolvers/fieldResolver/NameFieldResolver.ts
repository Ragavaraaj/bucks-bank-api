import { Resolver, FieldResolver, Root } from "type-graphql";
import { Name, INameFieldResolver } from "../../entities/Name";
import {
  SchoolDetails,
  SchoolDetailsModel,
} from "../../entities/SchoolDetails";

@Resolver((_of) => Name)
export class NameFieldResolver implements INameFieldResolver {
  @FieldResolver((_type) => SchoolDetails, { nullable: false })
  async schoolDetails(@Root() name: Name) {
    return await SchoolDetailsModel.findById({
      _id: name.schoolDetails,
    }).exec();
  }
}
