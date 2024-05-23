// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx
'use client'

import {cn} from '@/lib/utils'
import {ChatMessageActions} from '@/components/chat-message-actions'
import Image from 'next/image'
import ChatUser from "@/components/analyze/chat-user";
import MarkdownBlock from "@/components/ui/markdown-block";

export interface ChatMessageProps {
    message: {
        content: string
        role: string
        id: string
    },
    user: {
        name?: string | null
        image?: string | null

    }
}

export function ChatMessage({message, user, ...props}: ChatMessageProps) {
    return (
        <div
            className={cn('group relative mb-4 flex items-start max-w-xl')}
            {...props}
        >
            <div
                className={cn(
                    'flex size-8 shrink-0 select-none items-center justify-center rounded-full ',
                    message.role === 'user'
                        ? ''
                        : 'bg-primary text-primary-foreground'
                )}
            >
                {message.role === 'user' ? <ChatUser user={user}/> :
                    <Image src="/logo.png" width={32} height={32} alt="Score My Deck Logo" className="rounded-full"/>}
            </div>
            <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
                <MarkdownBlock content={message.content}/>
                <ChatMessageActions message={message}/>
            </div>
        </div>
    )
}
