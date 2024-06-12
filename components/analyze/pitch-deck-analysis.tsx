'use client'
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import MarkdownBlock from "@/components/ui/markdown-block";

interface PitchDeckAnalysisProps {
    pitchDeckAnalysis: {
        concern: string
        title: string
    }[]
}

export default function PitchDeckAnalysis({pitchDeckAnalysis}: PitchDeckAnalysisProps) {
    return (
        <div className="text-base leading-6 cursor-text flex flex-col w-full h-auto"><Accordion type="multiple"
                                                                                                className="w-full">
            {pitchDeckAnalysis.map((analysis, index) => (
                <AccordionItem value={`question-${index}`} key={`question-${index}`}>
                    <AccordionTrigger iconColor="#FF7878">{analysis.title}</AccordionTrigger>
                    <AccordionContent>
                        <MarkdownBlock content={analysis.concern}/>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>

        </div>
    );
}
