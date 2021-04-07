import { Resolver, Arg, Query, Mutation } from "type-graphql";
import { UpdateCustomTypeInput } from "../inputTypes/CategoryTypeInput";
import { CategoryType } from "../entities/CategoryType";
import {
  getCategoryTypeFromUser,
  updateCustomType,
} from "../queries/CategoryTypeQueries";

@Resolver()
export class CategoryTypeResolver {
  @Query((_returns) => CategoryType)
  async returnCustomType(@Arg("id", { nullable: false }) id: String) {
    return await getCategoryTypeFromUser(id);
  }

  @Mutation((_returns) => [String])
  async updateCustomExpenditureType(
    @Arg("input", { nullable: false })
    { id, newCategoryType }: UpdateCustomTypeInput
  ) {
    return await updateCustomType(id, "customExpenditureType", newCategoryType);
  }

  @Mutation((_returns) => [String], {
    nullable: false,
  })
  async updateCustomIncomeType(
    @Arg("input", { nullable: false })
    { id, newCategoryType }: UpdateCustomTypeInput
  ) {
    return await updateCustomType(id, "customIncomeType", newCategoryType);
  }
}
