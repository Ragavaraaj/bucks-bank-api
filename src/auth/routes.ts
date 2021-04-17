import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { verify } from "jsonwebtoken";
import { getUserFromDbWithId } from "../queries/UserQueries";
import { createAccessToken, sendRefreshToken } from ".";

type RouteType = (a: FastifyInstance, b: RouteShorthandOptions) => any;

const routes: RouteType = async (httpServer, _) => {
  httpServer.post("/refreshToken", async (req, res) => {
    const token = req.cookies.jid;
    console.log(token);

    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;

    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    // token is valid and
    // we can send back an access token
    const user = await getUserFromDbWithId(payload.userId);

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, user);

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });
};

export default routes;

// httpServer.post<{ Body: authLoginBody }>("/login", async (req, res) => {
//   const input = req.body;
//   console.log(input);
//   const user = await getUserFromDbWithEmail(input.email);
//   if (!user) {
//     throw new Error("could not find user");
//   }
//   const valid = await compare(input.password, user!.password);
//   if (!valid) {
//     throw new Error("bad password");
//   }
//   // login successful
//   sendRefreshToken(res, user);
//   res.send({
//     accessToken: createAccessToken(user),
//   });
// });
