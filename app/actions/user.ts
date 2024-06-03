'use server'

import { auth } from "@/auth"
import {User} from "@prisma/client/edge";

export async function getUserCredits() {
    const session = await auth()
    if (!session?.user) {
        return 0
    }


    return (session.user as User).credits
}