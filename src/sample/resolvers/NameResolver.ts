import { Resolver, Arg, Query, Mutation } from "type-graphql";
import { Name, NameModel } from "../entities/Name";
import { NameInput } from "../type/NameInput";
import { SchoolDetails, SchoolDetailsModel } from "../entities/SchoolDetails";

@Resolver()
export class NameResolver {
  @Query((_returns) => Name, { nullable: false })
  async returnName(@Arg("id", { nullable: false }) id: string) {
    return await NameModel.findById(id).exec();
  }

  @Query((_returns) => [Name], { nullable: "items" })
  async returnAllNames() {
    return await NameModel.find({}).exec();
  }

  @Mutation((_returns) => [Name], { nullable: "items" })
  async addName(@Arg("input", { nullable: false }) input: NameInput) {
    const newSchoolDetailsModal = await SchoolDetailsModel.create(
      SchoolDetails.createNewModel(input.schoolName, input.passedOutYear)
    );
    await NameModel.create(Name.createNewModel(input, newSchoolDetailsModal));
    return await this.returnAllNames();
  }

  @Mutation((_returns) => [Name], { nullable: "items" })
  async deleteName(@Arg("name", { nullable: false }) name: string) {
    await NameModel.findOneAndRemove({ name }).exec();
    return await this.returnAllNames();
  }

  @Mutation((_returns) => [Name], { nullable: "items" })
  async changeName(
    @Arg("from", { nullable: false }) from: string,
    @Arg("to", { nullable: false }) to: string
  ) {
    const data = await NameModel.findOneAndUpdate(
      { name: from },
      { name: to },
      { upsert: false, new: true }
    ).exec();
    return data !== null ? await this.returnAllNames() : [];
  }

  @Mutation((_returns) => String, { nullable: false })
  async deleteAllNames() {
    await NameModel.remove({});
    await SchoolDetailsModel.remove({});
    return "Success";
  }
}
