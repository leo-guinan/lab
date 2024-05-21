import * as React from 'react'
import Link from 'next/link'
import {auth} from '@/auth'
import {Button} from '@/components/ui/button'
import {IconSeparator} from '@/components/ui/icons'
import {UserMenu} from '@/components/user-menu'
import {Banner} from "@/components/banner";

async function UserOrLogin() {
    const session = await auth()
    return (
        <>
            {session?.user ? (
                <>
                </>
            ) : (
                <Link href="/" target="_blank" rel="nofollow">
                    Home
                </Link>
            )}
            <div className="flex items-center">
                <IconSeparator className="size-6 text-muted-foreground/50"/>
                {session?.user ? (
                    <UserMenu user={session.user}/>
                ) : (
                    <Button variant="link" asChild className="-ml-2">
                        <Link href="/sign-in?callbackUrl=/">Login</Link>
                    </Button>
                )}
            </div>
        </>
    )
}

export function Header() {
    return (
        <header
            className="sticky top-0 z-50 flex flex-col items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">

            <div className="flex items-center">
                <React.Suspense fallback={<div className="flex-1 overflow-auto"/>}>
                    <Banner />

                    <UserOrLogin/>
                </React.Suspense>
            </div>
        </header>
    )
}
