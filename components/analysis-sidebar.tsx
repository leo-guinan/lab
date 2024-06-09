'use client'
import * as React from 'react'
import {SyntheticEvent, useEffect} from 'react'
import {SidebarList} from '@/components/sidebar-list'
import {PitchDeckRequest} from "@prisma/client/edge";
import {CheckmarkIcon, MagnifyingGlassIcon} from "@/components/ui/icons";
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {clearCurrentDeck} from "@/app/actions/analyze";
import CreditModal from "@/components/credit-modal";
import useSwr, {useSWRConfig} from "swr";
import {getUserCredits} from "@/app/actions/user";

interface ChatHistoryProps {
    userId?: string
    decks: PitchDeckRequest[]
}


export function AnalysisSidebar({userId, decks}: ChatHistoryProps) {

    const [creditModalOpen, setCreditModalOpen] = React.useState(false)

    const {data} = useSwr(`${userId}/credits`, getUserCredits)
    const {mutate} = useSWRConfig()
    const showCredits = process.env.NEXT_PUBLIC_LIVE_MODE === 'true'
    const searchParams = useSearchParams()

    const clearExisting = async (e: SyntheticEvent) => {
        e.preventDefault()
        await clearCurrentDeck();
    }

    const openCreditModal = async (e: SyntheticEvent) => {
        setCreditModalOpen(true)
    }

    useEffect(() => {
        if (searchParams.has('success') && searchParams.has('session_id')) {
            void mutate(`${userId}/credits`)
        }
    }, [searchParams, userId])

    useEffect(() => {
        console.log("credits data", data)
        if (data !== undefined && data === 0) {
            setCreditModalOpen(true)
        }
    }, [data])

    return (
        <div className="flex flex-col h-full">
            {showCredits && (
                <div className="p-4 flex flex-row">
               <span className="flex flex-row justify-between items-center tracking-tighter">
                   <CheckmarkIcon className="size-8" overrideColor="#FFCC2F"/>
                   <span className="ml-2">Credits Available: {data || 0}</span>
                   <Link
                       onClick={openCreditModal}
                       href="#"
                       className='h-8 ml-2 items-center whitespace-nowrap tracking-tighter text-sm bg-[#60B258] text-gray-900 dark:text-zinc-50 justify-center p-2 rounded-md shadow-none transition-colors hover:bg-[#60B258] hover:text-gray-900 dark:hover:text-zinc-50 dark:hover:bg-[#60B258]'
                   > Add More
                </Link>
               </span>

                </div>
            )}
            <div className="px-2 my-4">
                <Link
                    onClick={clearExisting}
                    href="#"
                    className={cn(
                        buttonVariants({variant: 'outline'}),
                        'h-10 w-full text-zinc-50 dark:text-gray-900 justify-start bg-standard dark:bg-gray-100 px-4 shadow-none transition-colors hover:bg-gray-100 hover:text-gray-900  dark:hover:bg-standard dark:hover:text-zinc-50'
                    )}
                >
                    <MagnifyingGlassIcon className="-translate-x-2 stroke-2 size-8"/>
                    Analyze New Deck
                </Link>
            </div>
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
                <SidebarList userId={userId} decks={decks}/>
            </React.Suspense>
            <CreditModal open={creditModalOpen} setOpen={setCreditModalOpen}/>
        </div>
    )
}
