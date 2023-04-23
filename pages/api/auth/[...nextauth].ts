import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 1, // 1 minute
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        // const res = await fetch("/your/endpoint", {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // })
        // const user = await res.json()
  
        // if (res.ok && user) {
        //   return user
        // }
        
        const {name, password} = credentials as {
          name: string,
          password: string,
        };

        if(name === 'lucas' && password === "12345") {
          return {id: '1', name: 'Lucas', email: 'llucasy@gmail.com'}
        }

        throw new Error("Invalid credentials")
        // return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
