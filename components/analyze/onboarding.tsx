import {ChatMessage} from "@/components/chat-message";
import {nanoid} from "@/lib/utils";
import CollapsibleSection from "@/components/collapsible-section";

export default function Onboarding({user}: { user: { name?: string | null, image?: string | null } }) {

    const questions = [
        {
            question: "How do I get started?",
            answer: "Check out your weakest deck scores and simply ask for some help."
        },
        {
            question: "How do I improve my deck?",
            answer: "Ask for help to rewrite the parts you want to improve. (see pitch deck analysis)"
        },
        {
            question: "Can you help with my GTM Strategy?",
            answer: "Yes, just ask co-pilot for a few successful competitors, then ask for their GTM strategy."
        }

    ]

    return (
        <div className="w-full max-w-xl">
            <ChatMessage user={user} message={{
                content: "In case you need help, here are some tips to get you started. 🚀",
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