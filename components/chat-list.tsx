import {Separator} from '@/components/ui/separator'
import {ChatMessage} from '@/components/chat-message'
import {AnalysisChatMessage} from "@/lib/types";
import {cn} from "@/lib/utils";
import Image from "next/image";
import ChatMessageLoading from "@/components/analyze/chat-message-loading";
import Onboarding from "@/components/analyze/onboarding";

export interface ChatList {
    messages: AnalysisChatMessage[]
    user: {
        name?: string | null
        image?: string | null
    }
    chatMessageLoading: boolean
}

export function ChatList({messages, user, chatMessageLoading}: ChatList) {
    const circleColors = ['bg-loadStart', 'bg-loadNext', 'bg-loadMiddle', 'bg-loadEnd'];

    if (!messages.length) {
        return (
            <>
                <Onboarding user={user} />
            </>
        )
    }

    return (
        <div className="relative px-4">
            {messages.map((message, index) => (
                <div key={index}>
                    <ChatMessage message={message} user={user}/>
                    {index < messages.length - 1 && (
                        <Separator className="my-4 md:my-8"/>
                    )}
                </div>
            ))}
            {chatMessageLoading && (
                <>
                    <Separator className="my-4 md:my-8"/>

                    <div className={cn('group relative mb-4 flex items-start')}>

                        <div
                            className='flex size-8 shrink-0 select-none items-center justify-center rounded-full bg-primary text-primary-foreground'

                        >
                            <Image src="/logo.png" width={32} height={32} alt="Score My Deck Logo" className="rounded-full"/>


                        </div>
                        <ChatMessageLoading circleColors={circleColors}/>

                    </div>
                </>
            )}

        </div>
    )
}