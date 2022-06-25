import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";

import clintPromise from "../../../lib/mongodb";

export default NextAuth({
  adapter: MongoDBAdapter(clintPromise),
  secret: "Ayan2704",
  providers: [
    GoogleProvider({
      clientId:
        "985797178386-gt17h1lj8hob3bcufqi2g7etjb3a240g.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    LinkedInProvider({
      clientId: "7727mlkt7tvppr",
      clientSecret: "j9rjPxITXqAUByTJ",
    }),
  ],
});
