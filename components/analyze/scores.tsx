import {CircularProgressBar} from "@/components/analyze/score";
import {useEffect, useState} from "react";
import {useTheme} from "next-themes";

interface ScoresProps {
    scores: {
        market: {
            score: number
            reason: string
            delta?: number
        },
        team: {
            score: number
            reason: string
            delta?: number
        },
        product: {
            score: number
            reason: string
            delta?: number
        },
        traction: {
            score: number
            reason: string
            delta?: number

        },
        final: {
            score: number
            reason: string
            delta?: number
        }
    } | null
}

export default function Scores({scores}: ScoresProps) {
    const [displayScores, setDisplayScores] = useState<boolean>(false)
    const theme = useTheme()

    const overrideColor = theme.theme === "dark" ? "#F9F9F9" : "#242424"

    useEffect(() => {
        if (scores?.market && scores?.team && scores?.product && scores?.traction && scores?.final) {
            setDisplayScores(true)
        }
    }, [scores])

    return (
        <>
            {scores && displayScores && (
                <div
                    className="flex flex-col flex-wrap xl:flex-nowrap sm:flex-row w-full justify-center mx-auto max-w-2xl items-center xl:min-w-[500px]">
                    <CircularProgressBar progress={scores.market.score} title="Market" delta={scores?.market?.delta ?? 0}/>
                    <CircularProgressBar progress={scores.team.score} title="Team" delta={scores?.team?.delta ?? 0}/>
                    <CircularProgressBar progress={scores.final.score} title="Deck Score"
                                         overrideColor={overrideColor} delta={scores?.final?.delta ?? 0}/>
                    <CircularProgressBar progress={scores.product.score} title="Product" delta={scores?.product?.delta}/>
                    <CircularProgressBar progress={scores.traction.score} title="Traction" delta={scores?.product?.delta}/>

                </div>
            )}
        </>
    );
}