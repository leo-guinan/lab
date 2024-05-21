import {ChatMessage} from "@/components/chat-message";
import {nanoid} from "@/lib/utils";
import CollapsibleSection from "@/components/collapsible-section";

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
            answer: "💰 Yes, we are currently onboarding VCs and Angels who will provide you with feedback more pitch deck feedback. You can ask Score My Deck to find vertical specific investors in  or help you find demo days based on your pitch deck and the latest fundraising trends."

        },
        {
            question: "Can it write a personalized cold email to a VC?",
            answer: "✍️ Yes, Score My Deck can help you write a personalized cold email to a VC. It uses natural language processing to understand your pitch deck and the VC's preferences to craft a compelling email. Note: Keep emails to 100 words."
        },
    ]

    return (
        <div className="w-full max-w-xl">
            <ChatMessage user={user} message={{
                content: "Some **frequently asked questions** while you wait ☕️",
                role: "bot",
                id: nanoid()
            }}/>
            {questions.map((q, index) => (
                <div key={`question-${index}`}>
                    <CollapsibleSection title={q.question} headerColor="howTo-background"
                                        iconColor="#8BDDE4">
                        <>
                            <p>{q.answer}</p>
                        </>

                    </CollapsibleSection>

                </div>
            ))}
        </div>
    )
}