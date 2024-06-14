import {PrismaClient, User} from '@prisma/client/edge'
import {PrismaAdapter} from "@auth/prisma-adapter";
import NextAuth, {type DefaultSession} from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import {withAccelerate} from '@prisma/extension-accelerate'
import Resend from "@auth/core/providers/resend";

declare module 'next-auth' {
    interface Session {
        user: {
            /** The user's id. */
            id: string
        } & DefaultSession['user']
    }
}

const prisma = new PrismaClient().$extends(withAccelerate())

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [Resend({
        // If your environment variable is named differently than default
        from: "no-reply@auth.scoremydeck.com"
    }), GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })],
    basePath: '/api/auth',
    secret: process.env.AUTH_SECRET,
    callbacks: {
        // @ts-ignore
        jwt({token, profile}) {
            console.log(token)
            if (profile) {
                console.log(profile)
                token.id = profile.id
                token.image = profile.avatar_url || profile.picture
            }
            return token
        },
        // @ts-ignore
        session: async ({session, token}) => {
            const user = session?.user as User
            if (session?.user && token?.id) {
                session.user.id = String(token.id)
            }
            if (user && !user.loopsId) {

                try {

                    const userOnListOptions = {
                        method: 'GET',
                        headers: {Authorization: `Bearer ${process.env.LOOPS_API_KEY}`}
                    };

                    const userOnListResponse = await fetch(`https://app.loops.so/api/v1/contacts/find?email=${user.email}`, userOnListOptions)
                    const userOnList = await userOnListResponse.json()
                    if (userOnList.length > 0) {
                        await prisma.user.update({
                            where: {
                                id: user.id
                            },
                            data: {
                                loopsId: userOnList[0].id
                            }
                        })
                        const eventOptions = {
                            method: 'POST',
                            headers: {Authorization: `Bearer  ${process.env.LOOPS_API_KEY}`, 'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                "userId": user.id,
                                "eventName":"userSignup",
                                "eventProperties":{}
                            })
                        };
                        // eventually need to handle case when this fails, but for now, don't worry about it
                        const eventAnswer = await fetch('https://app.loops.so/api/v1/events/send', eventOptions)
                        console.log(eventAnswer)




                        return session
                    }

                    const options = {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(
                            {
                                email: user.email,
                                name: user.name,
                                source: "API",
                                subscribed: true,
                                userGroup: "Score My Deck Users",
                                userId: user.id
                            }
                        )
                    };

                    const result = await fetch('https://app.loops.so/api/v1/contacts/create', options)

                    const answer = await result.json()
                    if (!answer.success) {
                        console.error("Error adding user to loops campaign", answer)
                    } else {
                        await prisma.user.update({
                            where: {
                                id: user.id
                            },
                            data: {
                                loopsId: answer.id
                            }
                        })
                        const eventOptions = {
                            method: 'POST',
                            headers: {Authorization: `Bearer  ${process.env.LOOPS_API_KEY}`, 'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                "userId": user.id,
                                "eventName":"userSignup",
                                "eventProperties":{}
                            })
                        };
                        // eventually need to handle case when this fails, but for now, don't worry about it
                        const eventAnswer = await fetch('https://app.loops.so/api/v1/events/send', eventOptions)
                        console.log(eventAnswer)
                    }
                } catch (e) {
                    console.error("Error adding user to loops campaign", e)
                }


            }
            return session
        },
        // @ts-ignore
        authorized({auth}) {

            return !!auth?.user // this ensures there is a logged in user for -every- request
        },

    },
    pages: {
        signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
    },
}

export const {
    handlers: {GET, POST},
    auth
    // @ts-ignore
} = NextAuth(authOptions)
