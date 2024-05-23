'use client'
import {useEffect, useState} from "react";
import {AnalysisChatMessage} from "@/lib/types";
import {LoadingProgressCircle} from "@/components/analyze/loading-score";
import ProgressBar from "@/components/progress-bar";
import {useTheme} from "next-themes";

const INITIAL_MESSAGE = "Feedback may take a few minutes. . .  \n"
const STEPS = [
    "Loading Deck  \n",
    "Performing Analysis  \n",
    "Writing Report  \n"
]

interface EmptyScreenProps {
    currentStep: number
    user: {
        name?: string | null
        image?: string | null
    }
}

export function EmptyScreen({currentStep, user}: EmptyScreenProps) {

    const [currentMessage, setCurrentMessage] = useState<AnalysisChatMessage>()

    const theme = useTheme()

    useEffect(() => {
        let message = INITIAL_MESSAGE
        for (let i = 0; i < STEPS.length; i++) {
            if (i < currentStep) {
                message += "✅ "
                message += STEPS[i]
            } else {
                message += STEPS[i]
            }
        }
        setCurrentMessage({
            id: "-1",
            content: message,
            role: "ai"
        })
    }, [currentStep]);

    if (!currentMessage) {
        return null
    }

    const deckColor = theme.theme === "dark" ? "#F9F9F9" : "#242424"

    return (
        <div className={'pb-[200px]'}>
            <div className="flex flex-col-reverse sm:flex-col w-full justify-center mx-auto max-w-2xl flex-wrap items-center xl:min-w-[500px]">
                <div className="flex flex-wrap xl:flex-nowrap flex-col sm:flex-row justify-center items-center w-full">
                    <LoadingProgressCircle title={"Market"} color="#8BDDE4"/>
                    <LoadingProgressCircle color="#FF7878" title="Team"/>
                    <LoadingProgressCircle color={deckColor} title="Deck Score"/>
                    <LoadingProgressCircle color="#FF7878" title="Product"/>
                    <LoadingProgressCircle color="#8BDDE4" title="Traction"/>
                </div>
                <div className="flex items-start justify-start w-full">
                    <div className="flex w-full sm:w-3/5 p-2 ml-4">
                        <ProgressBar color="bg-howTo" borderColor="border-howTo"/>
                    </div>
                </div>
            </div>
        </div>
    )
}