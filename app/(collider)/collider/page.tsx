import {redirect} from 'next/navigation'

import {auth} from '@/auth'
import IdeaCollider from "@/components/collider/idea-collider";


export default async function IdeaColliderPage() {
    const session = await auth()

    if (!session?.user) {
        redirect(`/sign-in?next=/`)
    }


    return <IdeaCollider/>
}
