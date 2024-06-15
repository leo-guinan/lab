import {redirect} from 'next/navigation'

import {auth} from '@/auth'
import StartWriting from "@/components/writing/start-writing";
import Dashboard from "@/components/dashboard/dashboard";


export default async function UploadPitchDeckPage() {
    const session = await auth()

    if (!session?.user) {
        redirect(`/sign-in?next=/`)
    }


    return <Dashboard/>
}
