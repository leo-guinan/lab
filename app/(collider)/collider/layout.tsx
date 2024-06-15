import {SidebarDesktop} from '@/components/sidebar-desktop'
import {auth} from "@/auth";
import {redirect} from "next/navigation";

interface ContextLayoutProps {
    children: React.ReactNode
}


export default async function ColliderLayout({children}: ContextLayoutProps) {

    const session = await auth()

    if (!session?.user) {
        redirect(`/sign-in?next=/analyze`)
    }

    return (
        <>
            <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
                <SidebarDesktop />
                <div
                    className="group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
                    {children}
                </div>
            </div>
        </>
    )
}
