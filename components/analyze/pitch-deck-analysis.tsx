'use client'
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import {CodeBlock} from "@/components/ui/codeblock";
import {MemoizedReactMarkdown} from "@/components/markdown";
import Scores from "@/components/analyze/scores";
import AnalysisSection from "@/components/analyze/analysis_section";

interface PitchDeckAnalysisProps {
    pitchDeckAnalysis: {
        concern: string
        title: string
    }[]
}


export default function PitchDeckAnalysis({pitchDeckAnalysis}: PitchDeckAnalysisProps) {

    return (
        <div>

            <div className="text-base leading-6 cursor-text flex flex-col w-full overflow-visible">
                {pitchDeckAnalysis.map((analysis, index) => (
                    <div key={`analysis_section_${index}`}>
                        <AnalysisSection content={analysis.concern} title={analysis.title} />
                    </div>
                ))}

            </div>
        </div>
    );
}