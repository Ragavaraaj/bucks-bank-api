import { ApolloServer } from "apollo-server-fastify";
import { buildSchema } from "type-graphql";
import mongoose from "mongoose";
import { TypegooseMiddleware } from "./middleware/TypegooseMiddleware";

// Resolvers
// import { NameResolver } from "./sample/resolvers/NameResolver";
// import { NameFieldResolver } from "./sample/resolvers/fieldResolver/NameFieldResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { CategoryTypeResolver } from "./resolvers/CategoryTypeResolver";
import { UserTransactionResolver } from "./resolvers/UserTransactionResolver";
import { UserTransactionsFieldResolver } from "./resolvers/fieldResolvers/UserTransactionsFieldResolver";
import { UserFieldResolver } from "./resolvers/fieldResolvers/UserFieldResolver";

export default async () => {
  const URI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}`;

  const connection = await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      CategoryTypeResolver,
      UserTransactionResolver,
      UserTransactionsFieldResolver,
      UserFieldResolver,
    ],
    // resolvers: [NameResolver, NameFieldResolver],
    emitSchemaFile: true,
    validate: false,
  });

  return new ApolloServer({
    schema,
    context: () => ({
      db: connection,
    }),
  });
};
