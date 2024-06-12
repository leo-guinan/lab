import {cn} from "@/lib/utils";
import PitchDeckAnalysis from "@/components/analyze/pitch-deck-analysis";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import MarkdownBlock from "@/components/ui/markdown-block";
import {User} from "@prisma/client/edge";

interface ReportProps {
    user: User,
    topObjection: string
    objectionsToOvercome: string
    howToAddress: string
    goToMarketStrategy: string
    pitchDeckAnalysis: {
        concern: string
        title: string
    }[]
}

export default function Report({
                                   topObjection,
                                   objectionsToOvercome,
                                   howToAddress,
                                   pitchDeckAnalysis,
                                   goToMarketStrategy,
                                   user
                               }: ReportProps) {
    return (
        <div className="relative px-8 mt-8 h-auto overflow-visible">
            <div className={cn('group relative mb-4 flex flex-1 items-start w-full')}>
                <div className="w-full max-w-xl h-auto">
                    <Accordion type="multiple" className="w-full">
                        <AccordionItem value={`pitch-deck-analysis`} key={`pitch-deck-analysis`}>
                            <AccordionTrigger iconColor="#FFCC2F">Pitch Deck Analysis</AccordionTrigger>
                            <AccordionContent>
                                <PitchDeckAnalysis pitchDeckAnalysis={pitchDeckAnalysis}/>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value={`gtm`} key={`gtm`}>
                            <AccordionTrigger iconColor="#FF7878">Go To Market Strategy</AccordionTrigger>
                            <AccordionContent>
                                {user.paidUser && (
                                    <MarkdownBlock content={goToMarketStrategy}/>

                                )}
                                {!user.paidUser && (
                                    <MarkdownBlock content={'This section is only available to paid users. Please buy credits to access this content.'} />
                                )}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value={`top-concerns`} key={`top-concerns`}>
                            <AccordionTrigger iconColor="#FF7878">Top Investor Concerns</AccordionTrigger>
                            <AccordionContent>
                                <MarkdownBlock content={topObjection}/>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value={`objections`} key={`objections`}>
                            <AccordionTrigger iconColor="#FFCC2F">Objections To Overcome</AccordionTrigger>
                            <AccordionContent>
                                <MarkdownBlock content={objectionsToOvercome}/>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value={`how-to-address`} key={`how-to-address`}>
                            <AccordionTrigger iconColor="#8BDDE4">How to address the concerns</AccordionTrigger>
                            <AccordionContent>
                                <MarkdownBlock content={howToAddress}/>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </div>
            </div>
        </div>
    )
}
