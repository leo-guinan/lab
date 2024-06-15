'use client'
import * as React from 'react'
import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Link from "next/link";


export function DashboardSidebar() {


    return (
        <div className="flex flex-col h-full">

            <div className="px-2 my-4">
                <Link
                    href="/converter"
                    className={cn(
                        buttonVariants({variant: 'outline'}),
                        'h-10 w-full text-zinc-50 dark:text-gray-900 justify-start bg-standard dark:bg-gray-100 px-4 shadow-none transition-colors hover:bg-gray-100 hover:text-gray-900  dark:hover:bg-standard dark:hover:text-zinc-50'
                    )}
                >
                    Youtube To Blog Tool
                </Link>
                <Link
                    href="/collider"
                    className={cn(
                        buttonVariants({variant: 'outline'}),
                        'h-10 w-full text-zinc-50 dark:text-gray-900 justify-start bg-standard dark:bg-gray-100 px-4 shadow-none transition-colors hover:bg-gray-100 hover:text-gray-900  dark:hover:bg-standard dark:hover:text-zinc-50'
                    )}
                >
                    Idea Collider
                </Link>
                <Link
                    href="/writing"
                    className={cn(
                        buttonVariants({variant: 'outline'}),
                        'h-10 w-full text-zinc-50 dark:text-gray-900 justify-start bg-standard dark:bg-gray-100 px-4 shadow-none transition-colors hover:bg-gray-100 hover:text-gray-900  dark:hover:bg-standard dark:hover:text-zinc-50'
                    )}
                >
                    Writing Tool
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
            </React.Suspense>
        </div>
    )
}
