'use client'

import * as React from 'react'
import {useEffect, useState} from 'react'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

import {motion} from 'framer-motion'

import {buttonVariants} from '@/components/ui/button'
import {cn, formatToday} from '@/lib/utils'
import {PitchDeckRequest} from "@prisma/client/edge";
import {getDeckName} from "@/app/actions/analyze";
import {ClipboardIcon} from "@/components/ui/icons";

interface SidebarItemProps {
    index: number
    deck: PitchDeckRequest
    children: React.ReactNode
}

export function SidebarItem({index, deck, children}: SidebarItemProps) {
    const pathname = usePathname();
    const [name, setName] = useState(deck?.name)

    const isActive = pathname === `/report/${deck.id}`;
    const shouldAnimate = false;
    const formattedDate = formatToday(deck?.createdAt);
    useEffect(() => {
        const checkForName = async () => {
            if (!deck?.name) {
                setName(await getDeckName(deck.id));
            }
        }
        checkForName()
    })

    if (!deck?.id) return null;

    return (
        <motion.div
            className="relative h-auto" // Adjusted height for better flexibility
            variants={{
                initial: {
                    height: 0,
                    opacity: 0
                },
                animate: {
                    height: 'auto',
                    opacity: 1
                }
            }}
            initial={shouldAnimate ? 'initial' : undefined}
            animate={shouldAnimate ? 'animate' : undefined}
            transition={{
                duration: 0.25,
                ease: 'easeIn'
            }}
        >
            <Link
                href={`/report/${deck.id}`}
                className={cn(
                    buttonVariants({variant: 'ghost'}),
                    'group w-full px-8 transition-colors hover:bg-zinc-200/40 dark:hover:bg-zinc-300/10 h-full',
                    isActive && 'bg-zinc-200 pr-16 font-semibold dark:bg-zinc-800'
                )}
            >
                <div className="flex flex-col justify-between items-start w-full max-w-full overflow-hidden">
                    <div className="flex flex-row items-center w-full truncate">
                        <ClipboardIcon className="mr-2 shrink-0"/>
                        <span className="truncate shrink text-base">
                            {formattedDate}
                        </span>
                    </div>
                    {name && (
                        <div className="text-xs text-zinc-400 dark:text-zinc-600 ml-2">
                            {name}
                        </div>
                    )}

                </div>
            </Link>
            {isActive && <div className="absolute right-2 top-1">{children}</div>}
        </motion.div>
    );
}
