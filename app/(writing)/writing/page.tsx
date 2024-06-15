import {redirect} from 'next/navigation'

import {auth} from '@/auth'
import StartWriting from "@/components/writing/start-writing";


export default async function UploadPitchDeckPage() {
    const session = await auth()

    if (!session?.user) {
        redirect(`/sign-in?next=/`)
    }


    return <StartWriting/>
}
