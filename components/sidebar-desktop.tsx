'use client'
import {Sidebar} from '@/components/sidebar'
import useSwr from 'swr'
import {AnalysisSidebar} from './analysis-sidebar'
import {getDecks} from "@/app/actions/analyze";

export function SidebarDesktop({userId}: { userId: string }) {

    const {data, isLoading, error} = useSwr(userId, getDecks);

    return (
        <Sidebar
            className="peer absolute inset-y-0 z-30 hidden -translate-x-full border-r bg-muted duration-300 ease-in-out data-[state=open]:translate-x-0 lg:flex lg:w-[250px] xl:w-[300px]">
            <AnalysisSidebar userId={userId} decks={data ?? []}/>
        </Sidebar>
    )
}
