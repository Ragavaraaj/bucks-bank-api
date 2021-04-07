import * as dotenv from "dotenv";
import * as path from "path";
import fastify from "fastify";
import "reflect-metadata";
import initGraphqlApp from "./app";

dotenv.config({
  path: path.join(__dirname, `.env`),
});

initGraphqlApp()
  .then(async (graphqlServer) => {
    const httpServer = fastify({ logger: false });
    httpServer.register(graphqlServer.createHandler({ cors: false }));
    httpServer.listen(process.env.PORT || "3000", () =>
      console.log(
        `Server ready and listening at ==> http://localhost:${
          process.env.PORT || "3000"
        }${graphqlServer.graphqlPath}`
      )
    );
  })
  .catch((err) => {
    console.error(err);
  });
