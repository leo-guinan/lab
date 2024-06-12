'use client'
import {ChatList} from "@/components/chat-list";
import {ChatScrollAnchor} from "@/components/chat-scroll-anchor";
import {EmptyScreen} from "@/components/empty-screen";
import {ChatPanel} from "@/components/chat-panel";
import {useEffect, useRef, useState} from "react";
// import {sendPreloChatMessage} from "@/app/actions/prelo";
import {PitchDeckScores} from "@/lib/types";
import {sendChatMessage} from "@/app/actions/analyze";
import Scores from "@/components/analyze/scores";
import {nanoid} from "@/lib/utils";
import Report from "@/components/analyze/report";
import FAQ from "@/components/analyze/faq";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {ScrollArea} from "@/components/ui/scroll-area";
import type {SWRSubscriptionOptions} from 'swr/subscription'
import useSWRSubscription from 'swr/subscription'
import AnalysisCompletedModal from "@/components/analyze/analysis-completed-modal";
import useSWR, {mutate} from "swr";
import {getUserCredits} from "@/app/actions/user";
import {User} from "@prisma/client/edge";

interface PreloChatMessage {
    id: string
    content: string
    role: string
}

interface AnalysisChatProps {
    messages: PreloChatMessage[]
    uuid: string
    scores: PitchDeckScores
    title: string
    concern: string
    objections: string
    howToAddress: string
    goToMarketStrategy: {
        description: string
        step: string
    }[]
    pitchDeckAnalysis: {
        title: string
        concern: string
    }[]
    user: User
}

export default function AnalysisChat({
                                         messages,
                                         uuid,
                                         scores,
                                         title,
                                         user,
                                         concern,
                                         objections,
                                         howToAddress,
                                         pitchDeckAnalysis,
                                         goToMarketStrategy
                                     }: AnalysisChatProps) {
    const [displayedMessages, setDisplayedMessages] = useState<PreloChatMessage[]>(messages)
    const [isLoading, setIsLoading] = useState(false)
    const [input, setInput] = useState('')
    const [loadedScores, setLoadedScores] = useState<PitchDeckScores | null>(scores)
    const [displayedTitle, setDisplayedTitle] = useState<string>(title)
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [completedDialogOpen, setCompletedDialogOpen] = useState<boolean>(false)
    const [chatMessageLoading, setChatMessageLoading] = useState(false)
    const [displayedConcern, setDisplayedConcern] = useState<string>(concern)
    const [displayedObjection, setDisplayedObjection] = useState<string>(objections)
    const [displayedHowToAddress, setDisplayedHowToAddress] = useState<string>(howToAddress)
    const [displayedGoToMarketStrategy, setDisplayedGoToMarketStrategy] = useState<{
        description: string
        step: string
    }[]>(goToMarketStrategy)
    const [displayedPitchDeckAnalysis, setDisplayedPitchDeckAnalysis] = useState<{
        title: string,
        concern: string
    }[]>(pitchDeckAnalysis)
    const {data: credits} = useSWR(`${user.id}/credits`, getUserCredits)

    const {
        data,
        error
    } = useSWRSubscription(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}prelo/${uuid}/` as string, (key, {next}: SWRSubscriptionOptions<number, Error>) => {
        console.log("key", key)
        const socket = new WebSocket(key)
        socket.addEventListener('message', (event) => next(null, event.data))
        // @ts-ignore
        socket.addEventListener('error', (event) => next(event.error))
        return () => socket.close()
    })


    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [displayedMessages]); // Dependency array includes the data triggering the scroll

    useEffect(() => {
        if (!data) return
        const parsedData = JSON.parse(data.toString())

        if (parsedData.scores) {
            setLoadedScores(parsedData.scores)
        }
        if (parsedData.name) {
            setDisplayedTitle(parsedData.name)
        }
        if (parsedData.top_concern) {
            setDisplayedConcern(parsedData.top_concern)
            setCompletedDialogOpen(true)
        }
        if (parsedData.objections) {
            setDisplayedObjection(parsedData.objections)
        }
        if (parsedData.how_to_overcome) {
            setDisplayedHowToAddress(parsedData.how_to_overcome)
        }
        if (parsedData.pitch_deck_analysis) {
            setDisplayedPitchDeckAnalysis(parsedData.pitch_deck_analysis.concerns)
        }
        if (parsedData.gtm_strategy) {
            setDisplayedGoToMarketStrategy(parsedData.gtm_strategy)
        }
    }, [data])


    const sendMessage = async (message: { content: string, role: "user" }) => {
        if (!message.content) return
        setIsLoading(true)
        try {
            setDisplayedMessages([...displayedMessages,
                {
                    content: message.content,
                    role: message.role,
                    id: "temp"
                },
            ])
            setChatMessageLoading(true)

            const response = await sendChatMessage(uuid, message);
            await mutate(`${user.id}/credits`)

            if (!response) {
                console.error("No response")
                return
            }
            setChatMessageLoading(false)

            setDisplayedMessages([...displayedMessages,
                {
                    content: message.content,
                    role: message.role,
                    id: "temp"
                },
                {
                    content: response,
                    role: 'assistant',
                    id: nanoid()
                }
            ])
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)

        }
    }
    return (
        <>
            <div className={'pt-4 md:pt-10 size-full mx-auto box-border'}>
                {displayedConcern && displayedObjection && displayedHowToAddress && displayedPitchDeckAnalysis ? (
                    <>
                        <div className="flex flex-col-reverse sm:flex-row h-full">
                            <ResizablePanelGroup direction="horizontal">
                                <ResizablePanel>
                                    <div
                                        className="flex flex-col w-full h-full">
                                        <div className="flex flex-col p-y-12 w-4/5 mx-auto h-full">
                                            <ScrollArea className="flex flex-col size-full pb-8">
                                                <ChatList messages={displayedMessages} user={user}
                                                          chatMessageLoading={chatMessageLoading}/>
                                                <ChatScrollAnchor/>
                                            </ScrollArea>
                                            <div className="relative">
                                                <ChatPanel
                                                    isLoading={isLoading}
                                                    input={input}
                                                    setInput={setInput}
                                                    sendMessage={sendMessage}
                                                    credits={credits ?? 0}

                                                />
                                            </div>
                                            <div ref={bottomRef}/>
                                        </div>
                                    </div>

                                </ResizablePanel>
                                <ResizableHandle/>
                                <ResizablePanel>
                                    <div className="flex flex-col size-full overflow-y-scroll">
                                        <div className="mx-auto border-box w-4/5">
                                            <h1 className="flex justify-center w-full mx-auto mt-2 mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-50 sm:text-4xl">{displayedTitle}</h1>
                                            <ScrollArea className="flex flex-col size-full">
                                                <Scores scores={loadedScores}/>
                                                <Report topObjection={displayedConcern}
                                                        objectionsToOvercome={displayedObjection}
                                                        howToAddress={displayedHowToAddress}
                                                        pitchDeckAnalysis={displayedPitchDeckAnalysis}
                                                        goToMarketStrategy={displayedGoToMarketStrategy}
                                                        user={user}

                                                />
                                            </ScrollArea>
                                        </div>
                                    </div>

                                </ResizablePanel>
                            </ResizablePanelGroup>


                        </div>

                    </>
                ) : (
                    <>
                        <div className="flex flex-col-reverse sm:flex-row h-[calc(100vh-200px)]">
                            <div className="flex flex-col size-full sm:w-1/2 overflow-y-scroll pb-[200px]  ">
                                <div className="mx-auto border-box w-4/5">
                                    <FAQ user={user}/>
                                </div>
                            </div>
                            <div className="flex flex-col size-full sm:w-1/2 overflow-y-scroll">
                                <div className="flex flex-col w-4/5 mx-auto">
                                    <h1 className="flex justify-center w-full mx-auto mt-2 mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-50 sm:text-4xl">{displayedTitle}</h1>
                                    <EmptyScreen/>
                                </div>
                            </div>
                        </div>

                    </>

                )}
            </div>
            <AnalysisCompletedModal open={completedDialogOpen} setOpen={setCompletedDialogOpen}/>
        </>
    )

}