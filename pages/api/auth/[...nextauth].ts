import { auth } from "@/app/utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOption = {
    pages: {
        signIn: '/'
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials): Promise<any> {
                return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '')
                    .then(
                        userCredential => {
                            if (userCredential.user) {
                                return userCredential.user;
                            }
                            return null;
                        }
                    ).catch(error => (console.log(error)))
            }
        })
    ]
}

export default NextAuth(authOption);