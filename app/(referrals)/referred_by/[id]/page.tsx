import {auth} from '@/auth'
import {redirect} from "next/navigation";
import {prisma} from "@/lib/utils";

interface ReferredByIdPageProps {
    params: {
        id: string
    }
}

export default async function ReferredByIdPage({params}: ReferredByIdPageProps) {
    const session = await auth()


    if (session?.user) {
        console.log(`User is logged in and has params: ${params.id}`)
        await prisma.user.update({
            where: {
            id: session.user.id
          },
          data: {
            referredById: params.id
          }
        })
        // user is logged in so referral link doesn't make sense
        redirect("/")
    }



}
