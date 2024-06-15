'use client'

import * as React from 'react'
import {useState} from 'react'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

import {motion} from 'framer-motion'

import {buttonVariants} from '@/components/ui/button'
import {cn} from '@/lib/utils'

interface SidebarItemProps {
    index: number
    children: React.ReactNode
}

export function SidebarItem({index, children}: SidebarItemProps) {
    const pathname = usePathname();
    const [name, setName] = useState('')

    const isActive = pathname === `/`;
    const shouldAnimate = false;


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
                href={`#`}
                className={cn(
                    buttonVariants({variant: 'ghost'}),
                    'group w-full px-8 transition-colors hover:bg-zinc-200/40 dark:hover:bg-zinc-300/10 h-full',
                    isActive && 'bg-zinc-200 pr-16 font-semibold dark:bg-zinc-800'
                )}
            >
                <div className="flex flex-col justify-between items-start w-full max-w-full overflow-hidden">
                    <div className="flex flex-row items-center w-full truncate">
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
