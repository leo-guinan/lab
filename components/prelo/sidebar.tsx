import * as React from 'react'
import {SidebarList} from '@/components/sidebar-list'
import {PreloSidebarList} from "@/components/prelo/sidebar-list";

interface ChatHistoryProps {
    userId?: string
    isAdmin: boolean
    hasPrelo?: boolean
}

export async function PreloSidebar({userId, isAdmin, hasPrelo}: ChatHistoryProps) {
    return (
        <div className="flex flex-col h-full">
            {/*<div className="px-2 my-4">*/}
            {/*  <Link*/}
            {/*    href="/"*/}
            {/*    className={cn(*/}
            {/*      buttonVariants({ variant: 'outline' }),*/}
            {/*      'h-10 w-full justify-start bg-zinc-50 px-4 shadow-none transition-colors hover:bg-zinc-200/40 dark:bg-zinc-900 dark:hover:bg-zinc-300/10'*/}
            {/*    )}*/}
            {/*  >*/}
            {/*    <IconPlus className="-translate-x-2 stroke-2" />*/}
            {/*    Add Context*/}
            {/*  </Link>*/}
            {/*</div>*/}
            <React.Suspense
                fallback={
                    <div className="flex flex-col flex-1 px-4 space-y-4 overflow-auto">
                        {Array.from({length: 10}).map((_, i) => (
                            <div
                                key={i}
                                className="w-full h-6 rounded-md shrink-0 animate-pulse bg-zinc-200 dark:bg-zinc-800"
                            />
                        ))}
                    </div>
                }
            >
                {/* @ts-ignore */}
                <PreloSidebarList userId={userId} isAdmin={isAdmin} hasPrelo={hasPrelo}/>
            </React.Suspense>
        </div>
    )
}