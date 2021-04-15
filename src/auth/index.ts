import { DocumentType } from "@typegoose/typegoose";
import { FastifyReply } from "fastify";
import { ServerResponse } from "http";
import { sign } from "jsonwebtoken";
import { User } from "../entities/User";

export const createAccessToken = (user: DocumentType<User>) => {
  return sign(
    {
      userId: user._id,
      userTransactionsId: user.userTransactions,
      userCategoryTypeId: user.categoryType,
      tokenVersion: user.tokenVersion,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" }
  );
};

export const createRefreshToken = (user: DocumentType<User>) => {
  return sign(
    {
      userId: user._id,
      tokenVersion: user.tokenVersion,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "2d" }
  );
};

export const sendRefreshToken = (
  res: FastifyReply<ServerResponse>,
  user: DocumentType<User> | null
) => {
  res.setCookie("jid", user ? createRefreshToken(user) : "", {
    httpOnly: true,
  });
};
