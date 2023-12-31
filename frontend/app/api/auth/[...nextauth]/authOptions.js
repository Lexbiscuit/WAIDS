import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import clientPromise from "@/libs/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email: credentials.email }),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        const user = data.user[0];

        if (!user) {
          throw new Error("User not found");
        }

        if (user.status === "suspended") {
          throw new Error("This account has been suspended.");
        }

        const match = await bcrypt.compare(credentials.password, user.password);

        if (match) {
          return {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } else {
          throw new Error("Invalid password");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
