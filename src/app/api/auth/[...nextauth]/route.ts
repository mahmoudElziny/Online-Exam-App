import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";



export const options : NextAuthOptions = {
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
            async authorize(credentials){
                try{
                    const res =await axios.post('https://exam.elevateegy.com/api/v1/auth/signin', {
                        email : credentials?.email,
                        password : credentials?.password
                    })
                    if (res.status === 200 && res.data){
                        console.log(res.data);
                        
                        return res.data
                    }
                    return null
                } catch(error){
                    if(axios.isAxiosError(error)){
                        console.log(error);
                        if(error.status === 401){
                            console.log("wrong data" , credentials)
                        }
                    }
                }
                },
        })
    ],
    pages: {
        signIn: "/login",
        newUser: "/register",
    }
}

const handler = NextAuth(options); 

export { handler as GET, handler as POST };