import { Resolver, Arg, Query, Mutation, Ctx } from "type-graphql";
import { compare, hash } from "bcryptjs";
import { LoginResponse } from "../entities/LoginResponse";
import { createAccessToken, sendRefreshToken } from "../auth";
import { MyContext } from "../utils/CommonTypes";
import { User } from "../entities/User";
import {
  LoginUserInput,
  UpdateUserBasicDetails,
  CreteUserInput,
} from "../inputTypes/UserInput";
import {
  deleteUserFromDb,
  deleteAllUserFromDb,
  changeUserDetailsInDb,
  addNewUseIntoDb,
  getAllUserFromDb,
  getUserFromDbWithId,
  getUserFromDbWithEmail,
} from "../queries/UserQueries";

@Resolver()
export class UserResolver {
  @Query((_returns) => User, { nullable: false })
  async returnUser(@Ctx() { payload }: MyContext) {
    return await getUserFromDbWithId(payload!.userId);
  }

  @Query((_returns) => [User], { nullable: "items" })
  async returnAllUser() {
    return await getAllUserFromDb();
  }

  @Query((_returns) => String)
  async bye(@Ctx() { payload }: MyContext) {
    console.log(payload);

    return "Bye";
  }

  @Mutation((_returns) => User, { nullable: false })
  async createUser(@Arg("input", { nullable: false }) input: CreteUserInput) {
    const hashedPassword = await hash(input.password, 12);
    const hashedInput = { ...input, password: hashedPassword };
    return await addNewUseIntoDb(hashedInput);
  }

  @Mutation(() => LoginResponse)
  async loginUser(
    @Arg("input", { nullable: false }) input: LoginUserInput,
    @Ctx() { res }: MyContext
  ) {
    const user = await getUserFromDbWithEmail(input.email);
    if (!user) {
      throw new Error("could not find user");
    }
    const valid = await compare(input.password, user!.password);
    if (!valid) {
      throw new Error("bad password");
    }
    // login successful

    sendRefreshToken(res, user);

    return {
      accessToken: createAccessToken(user),
      user: user._id,
    };
  }
  @Mutation(() => String)
  async logoutUser(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, null);

    return "Success";
  }

  @Mutation((_returns) => String)
  async deleteUser(@Ctx() { payload }: MyContext) {
    await deleteUserFromDb(
      payload!.userId,
      payload!.userCategoryTypeId,
      payload!.userTransactionsId
    );
    return "Success";
  }

  @Mutation((_returns) => User, { nullable: false })
  async updateUserBasicDetails(
    @Arg("input", { nullable: false })
    userDetail: UpdateUserBasicDetails,
    @Ctx() { payload }: MyContext
  ) {
    return await changeUserDetailsInDb(payload!.userId, userDetail);
  }

  @Mutation((_returns) => String, { nullable: false })
  async deleteAllData() {
    await deleteAllUserFromDb();
    return "Success";
  }
}
