import "reflect-metadata";
import dotenv from "dotenv";
import path from "path";
import fastify from "fastify";
import cookie from "fastify-cookie";
import authRoutes from "./auth/routes";
import initGraphqlApp from "./app";

dotenv.config({
  path: path.join(__dirname, `.env`),
});

(async () => {
  const httpServer = fastify({ logger: false });

  httpServer.register(cookie);

  httpServer.register(authRoutes);

  const graphqlServer = await initGraphqlApp();

  httpServer.register(graphqlServer.createHandler({ cors: false }));

  httpServer.listen(process.env.PORT || "3000", () =>
    console.log(
      `Server ready and listening at ==> http://localhost:${
        process.env.PORT || "3000"
      }${graphqlServer.graphqlPath}`
    )
  );
})().catch((err) => {
  console.error(err);
});
