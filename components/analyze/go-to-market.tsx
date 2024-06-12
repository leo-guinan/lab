'use client'
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import MarkdownBlock from "@/components/ui/markdown-block";

interface GoToMarketProps {
    strategy: {
        description: string
        step: string
    }[]
}

export default function GoToMarket({strategy}: GoToMarketProps) {
    return (
        <div className="text-base leading-6 cursor-text flex flex-col w-full h-auto"><Accordion type="multiple"
                                                                                                className="w-full">
            {strategy.map((analysis, index) => (
                <AccordionItem value={`question-${index}`} key={`question-${index}`}>
                    <AccordionTrigger iconColor="#FF7878" className="truncate text-left">{analysis.step}</AccordionTrigger>
                    <AccordionContent>
                        <MarkdownBlock content={analysis.description}/>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>

        </div>
    );
}
