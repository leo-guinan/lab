import {ChatMessage} from "@/components/chat-message";
import {nanoid} from "@/lib/utils";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import MarkdownBlock from "@/components/ui/markdown-block";

export default function FAQ({user}: { user: { name?: string | null, image?: string | null } }) {

    const questions = [
        {
            question: "How does it work?",
            answer: "🤖 Score My Deck uses a combination of machine learning and human expertise to analyze your pitch deck and provide you with a detailed report on how to improve it."
        },
        {
            question: "What is a fundraising copilot?",
            answer: "🤝 Meet your personal fundraising co-pilot: a powerful tool that levels the playing field for founders. Forget endless pitch deck revisions, investor cold calls, and grant application anxiety. Imagine an AI advisor in your corner, guiding you like ChatGPT on steroids for fundraising."
        },
        {
            question: "Can I ask it to find me some investors?",
            answer: "✅ Yes, you can ask Score My Deck to help you find investors and get their LinkedIn URL. It will provide you with a list of potential investors based on your pitch deck, your funding stage and the latest fundraising trends."
        },
        {
            question: "Will you be onboarding VCs and Angels?",
            answer: "💰Yes, we are currently onboarding VCs and Angels who will soon be able to add more context while providing you with feedback on your pitch deck. You can ask Score My Deck to find the latest fundraising trends, the current pre-seed valuations and the right investor equity stake holding."

        },
        {
            question: "Can it write a personalized cold email to a VC?",
            answer: "✍️ Yes, Score My Deck can help you write a personalized cold email to a VC. It uses natural language processing to understand your pitch deck and the VC's preferences to craft a compelling email. Note: Keep emails to 100 words."
        },
        {
            question: "How do credits work?",
            answer: "😌We've kept it super simple.\n" +
                "You get 50 credits for $10.\n" +
                "Normal chat messages (1 credit)\n" +
                "Investor lookups cost (2 credits)\n" +
                "Emails cost (5 credits).\n" +
                "A full deck analysis will only cost you 10 credits"
        }
    ]

    return (
        <div className="w-full max-w-xl">
            <ChatMessage user={user} message={{
                content: "Some **frequently asked questions** while you wait ☕️",
                role: "bot",
                id: nanoid()
            }}/>
            <Accordion type="multiple" className="w-full">
                {questions.map((q, index) => (
                    <AccordionItem value={`question-${index}`} key={`question-${index}`}>
                        <AccordionTrigger iconColor="#8BDDE4">{q.question}</AccordionTrigger>
                        <AccordionContent>
                            <MarkdownBlock content={q.answer}   />
                        </AccordionContent>
                    </AccordionItem>
                ))}


            </Accordion>

        </div>
    )
}