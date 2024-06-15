import {redirect} from 'next/navigation'

import {auth} from '@/auth'
import ConvertVideoToBlog from "@/components/converter/convert-video-to-blog";


export default async function UploadPitchDeckPage() {
    const session = await auth()

    if (!session?.user) {


        redirect(`/sign-in?next=/`)
    }


    return <ConvertVideoToBlog/>
}
