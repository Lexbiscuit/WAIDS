import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Sign in",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {

        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          body: JSON.stringify(
            { email: credentials.email },
          ),
          headers: { "Content-Type": "application/json" },
        });

        const { data } = await res.json();

        if (bcrypt.compare(credentials.password, data.password)) {
          return data;
        } else {
          return true;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hours
  }
};
export default NextAuth(authOptions);
