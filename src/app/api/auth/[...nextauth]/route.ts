import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";



export const OPTIONS: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 15
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            return { ...session, user: token };
        }
    },
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
            },
            async authorize(credentials) {

                const res = await fetch('https://exam.elevateegy.com/api/v1/auth/signin', {
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const user = await res.json();

                console.log("User Data : ", user);


                if (user.message === 'success' && user) {
                    return user
                }
                return null
            }
        })
    ],
    pages: {
        signIn: "/login",
        newUser: "/register",
    }
}

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };