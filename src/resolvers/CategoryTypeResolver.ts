import { Resolver, Arg, Query, Mutation, Ctx } from "type-graphql";
import { UpdateCustomTypeInput } from "../inputTypes/CategoryTypeInput";
import { CategoryType } from "../entities/CategoryType";
import {
  getCategoryType,
  updateCustomType,
} from "../queries/CategoryTypeQueries";
import { MyContext } from "../utils/CommonTypes";

@Resolver()
export class CategoryTypeResolver {
  @Query((_returns) => CategoryType)
  async returnCustomType(@Ctx() { payload }: MyContext) {
    return await getCategoryType(payload!.userCategoryTypeId);
  }

  @Mutation((_returns) => [String])
  async updateCustomExpenditureType(
    @Arg("input", { nullable: false })
    { newCategoryType }: UpdateCustomTypeInput,
    @Ctx() { payload }: MyContext
  ) {
    return await updateCustomType(
      payload!.userCategoryTypeId,
      "customExpenditureType",
      newCategoryType
    );
  }

  @Mutation((_returns) => [String], {
    nullable: false,
  })
  async updateCustomIncomeType(
    @Arg("input", { nullable: false })
    { newCategoryType }: UpdateCustomTypeInput,
    @Ctx() { payload }: MyContext
  ) {
    return await updateCustomType(
      payload!.userCategoryTypeId,
      "customIncomeType",
      newCategoryType
    );
  }
}
