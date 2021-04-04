import { ApolloServer } from "apollo-server-fastify";
import { buildSchema } from "type-graphql";
import mongoose from "mongoose";

// Resolvers
// import { NameResolver } from "./resolvers/NameResolver";
import { UserResolver } from "./resolvers/UserResolver";

export default async () => {
  const URI = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB}`;

  const connection = await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const schema = await buildSchema({
    resolvers: [UserResolver],
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
