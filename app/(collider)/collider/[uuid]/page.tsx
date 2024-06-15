import {redirect} from 'next/navigation'

import {auth} from '@/auth'
import ConvertVideoToBlog from "@/components/converter/convert-video-to-blog";

interface ColliderResultPageProps {
    params: {
        uuid: string
    }
}

export default async function ColliderResultPage({params}: ColliderResultPageProps) {
    const session = await auth()

    if (!session?.user) {


        redirect(`/sign-in?next=/`)
    }


    return <ConvertVideoToBlog/>
}
