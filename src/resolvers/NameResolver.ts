import { Resolver, Arg, Query, Mutation } from "type-graphql";
import { Name, NameModel } from "../entities/Name";

@Resolver()
export class NameResolver {
  @Query((_returns) => Name, { nullable: false })
  async returnName(@Arg("id", { nullable: false }) id: String) {
    return await NameModel.findById(id).exec();
  }

  @Query((_returns) => [Name], { nullable: false })
  async retunAllNames() {
    return await NameModel.find({});
  }

  @Mutation((_returns) => [Name], { nullable: "items" })
  async addName(@Arg("name", { nullable: false }) name: String) {
    await NameModel.create({ name: name });
    return await this.retunAllNames();
  }

  @Mutation((_returns) => [Name], { nullable: "items" })
  async deleteName(@Arg("name", { nullable: false }) name: String) {
    await NameModel.findOneAndRemove({ name }).exec();
    return await this.retunAllNames();
  }

  @Mutation((_returns) => [Name], { nullable: "items" })
  async changeName(
    @Arg("from", { nullable: false }) from: String,
    @Arg("to", { nullable: false }) to: String
  ) {
    const data = await NameModel.findOneAndUpdate(
      { name: from },
      { name: to },
      { upsert: false, new: true }
    ).exec();
    return data !== null ? await this.retunAllNames() : [];
  }
}
