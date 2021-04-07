import { Resolver, FieldResolver, Root} from "type-graphql";
import { User, IUserFieldResolver } from "../../entities/User";
import { CategoryType } from "../../entities/CategoryType";
import { getCategoryType } from "../../queries/CategoryTypeQueries";
import { getUserTransactions } from "../../queries/UserTransactionQueries";
import { UserTransactions } from "../../entities/UserTransactions";

@Resolver(() => User)
export class UserFieldResolver implements IUserFieldResolver {
  @FieldResolver(() => CategoryType, { nullable: false })
  async categoryType(@Root() parent: User) {
    return await getCategoryType(parent._doc.categoryType);
  }

  @FieldResolver(() => UserTransactions, { nullable: false })
  async userTransactions(@Root() parent: User) {
    
    return await getUserTransactions(parent._doc.userTransactions:);
  }
}
