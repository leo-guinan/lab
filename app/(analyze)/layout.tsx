import {SidebarDesktop} from '@/components/sidebar-desktop'
import {Banner} from "@/components/banner";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

interface ContextLayoutProps {
    children: React.ReactNode
}

export const fetchCache = 'force-no-store'

export default async function AnalysisLayout({children}: ContextLayoutProps) {

    const session = await auth()

    if (!session?.user) {
        redirect(`/sign-in?next=/analyze`)
    }

    return (
        <>
            <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">
                <SidebarDesktop userId={session.user.id}/>
                <div
                    className="group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
                    {children}
                </div>
            </div>
        </>
    )
}
