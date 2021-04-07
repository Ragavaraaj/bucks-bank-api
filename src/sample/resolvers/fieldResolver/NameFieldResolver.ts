import { Resolver, FieldResolver, Root } from "type-graphql";
import { Name, NameModel, INameFieldResolver } from "../../entities/Name";
import {
  SchoolDetails,
  SchoolDetailsModel,
} from "../../entities/SchoolDetails";

@Resolver((_of) => Name)
export class NameFieldResolver implements INameFieldResolver {
  @FieldResolver((_type) => SchoolDetails, { nullable: false })
  async schoolDetails(@Root() name: Name) {
    console.log("field resolver => schoolDetails", name);

    const data = await NameModel.findById({ _id: name.id }).exec();
    return (await SchoolDetailsModel.findById({ _id: data!.id }).exec())!;
  }

  @FieldResolver(() => String, { nullable: false })
  yolo() {
    console.log("field resolver => yolo ");
    return "Yolo";
  }
}
