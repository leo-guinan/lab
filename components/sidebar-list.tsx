import {ThemeToggle} from '@/components/theme-toggle'
import * as React from 'react'

interface SidebarListProps {
    userId?: string
    children?: React.ReactNode
}


export function SidebarList({userId: _}: SidebarListProps) {

    return (
        <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex flex-row p-4 text-center items-center">

            </div>
            <div className="flex-1 overflow-auto">

            </div>
            <div className="flex items-center justify-between p-4">
                <ThemeToggle/>
                {/*<ClearHistory clearChats={clearChats} isEnabled={chats?.length > 0} />*/}
            </div>
        </div>
    )
}
