import { Resolver, Arg, Query, Mutation } from "type-graphql";
import { User, UserModel } from "../entities/User";
import { UserInput, changeDisplayNameInputs } from "../types/UserInput";

@Resolver()
export class UserResolver {
  @Query((_returns) => User, { nullable: false })
  async returnUser(@Arg("id", { nullable: false }) id: String) {
    return await UserModel.findById(id).exec();
  }

  @Query((_returns) => [User], { nullable: "items" })
  async returnAllUser() {
    return await UserModel.find({});
  }

  @Mutation((_returns) => User, { nullable: false })
  async addUser(@Arg("input", { nullable: false }) input: UserInput) {
    return await (await UserModel.create(input)).save();
  }

  @Mutation((_returns) => String)
  async deleteUser(@Arg("id", { nullable: false }) id: String) {
    await UserModel.findOneAndRemove({ _id: id }).exec();
    return "Success";
  }

  @Mutation((_returns) => User, { nullable: false })
  async changeDisplayName(
    @Arg("input", { nullable: false })
    { forId, withName }: changeDisplayNameInputs
  ) {
    return await UserModel.findOneAndUpdate(
      { _id: forId },
      { name: withName },
      { upsert: false, new: true }
    ).exec();
  }
}
