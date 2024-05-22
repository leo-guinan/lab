import CollapsibleSection from "@/components/collapsible-section";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
//@ts-ignore
import remarkCollapse from "remark-collapse";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import {CodeBlock} from "@/components/ui/codeblock";
import {MemoizedReactMarkdown} from "@/components/markdown";
import {cn} from "@/lib/utils";
import PitchDeckAnalysis from "@/components/analyze/pitch-deck-analysis";

interface ReportProps {
    topObjection: string
    objectionsToOvercome: string
    howToAddress: string
    pitchDeckAnalysis: {
        concern: string
        title: string
    }[]
}

export default function Report({topObjection, objectionsToOvercome, howToAddress, pitchDeckAnalysis}: ReportProps) {
    return (
        <div className="relative px-8 mt-8">
            <div
                className={cn('group relative mb-4 flex flex-1 items-start w-full')}
            >
                <div className="w-full max-w-xl">

                    <CollapsibleSection title="Pitch Deck Analysis" headerColor="objections-background"
                                        iconColor="#FFCC2F">
                        <>
                            <PitchDeckAnalysis pitchDeckAnalysis={pitchDeckAnalysis}/>
                        </>
                    </CollapsibleSection>

                    <CollapsibleSection title="Top Investor Concerns" headerColor="concern-background"
                                        iconColor="#FF7878">
                        <>
                            <MemoizedReactMarkdown
                                className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                                remarkPlugins={[remarkGfm, remarkMath, [remarkCollapse, {test: 'Problem'}]]}
                                //@ts-ignore
                                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                                components={{
                                    p({children}) {
                                        return <p className="mb-2 last:mb-0">{children}</p>
                                    },
                                    code({node, inline, className, children, ...props}) {
                                        if (children.length) {
                                            if (children[0] == '▍') {
                                                return (
                                                    <span className="mt-1 cursor-default animate-pulse">▍</span>
                                                )
                                            }

                                            children[0] = (children[0] as string).replace('`▍`', '▍')
                                        }

                                        const match = /language-(\w+)/.exec(className || '')

                                        if (inline) {
                                            return (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            )
                                        }

                                        return (
                                            <CodeBlock
                                                key={Math.random()}
                                                language={(match && match[1]) || ''}
                                                value={String(children).replace(/\n$/, '')}
                                                {...props}
                                            />
                                        )
                                    }
                                }}
                            >
                                {topObjection}
                            </MemoizedReactMarkdown>
                        </>
                    </CollapsibleSection>
                    <CollapsibleSection title="Objections To Overcome" headerColor="objections-background"
                                        iconColor="#FFCC2F">
                        <>
                            <MemoizedReactMarkdown
                                className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                                remarkPlugins={[remarkGfm, remarkMath, [remarkCollapse, {test: 'Problem'}]]}
                                //@ts-ignore
                                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                                components={{
                                    p({children}) {
                                        return <p className="mb-2 last:mb-0">{children}</p>
                                    },
                                    code({node, inline, className, children, ...props}) {
                                        if (children.length) {
                                            if (children[0] == '▍') {
                                                return (
                                                    <span className="mt-1 cursor-default animate-pulse">▍</span>
                                                )
                                            }

                                            children[0] = (children[0] as string).replace('`▍`', '▍')
                                        }

                                        const match = /language-(\w+)/.exec(className || '')

                                        if (inline) {
                                            return (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            )
                                        }

                                        return (
                                            <CodeBlock
                                                key={Math.random()}
                                                language={(match && match[1]) || ''}
                                                value={String(children).replace(/\n$/, '')}
                                                {...props}
                                            />
                                        )
                                    }
                                }}
                            >
                                {objectionsToOvercome}
                            </MemoizedReactMarkdown>
                        </>
                    </CollapsibleSection>
                    <CollapsibleSection title="How to address the concerns" headerColor="howTo-background"
                                        iconColor="#8BDDE4">
                        <>
                            <MemoizedReactMarkdown
                                className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                                remarkPlugins={[remarkGfm, remarkMath, [remarkCollapse, {test: 'Problem'}]]}
                                //@ts-ignore
                                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                                components={{
                                    p({children}) {
                                        return <p className="mb-2 last:mb-0">{children}</p>
                                    },
                                    code({node, inline, className, children, ...props}) {
                                        if (children.length) {
                                            if (children[0] == '▍') {
                                                return (
                                                    <span className="mt-1 cursor-default animate-pulse">▍</span>
                                                )
                                            }

                                            children[0] = (children[0] as string).replace('`▍`', '▍')
                                        }

                                        const match = /language-(\w+)/.exec(className || '')

                                        if (inline) {
                                            return (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            )
                                        }

                                        return (
                                            <CodeBlock
                                                key={Math.random()}
                                                language={(match && match[1]) || ''}
                                                value={String(children).replace(/\n$/, '')}
                                                {...props}
                                            />
                                        )
                                    }
                                }}
                            >
                                {howToAddress}
                            </MemoizedReactMarkdown></>
                    </CollapsibleSection>


                </div>
            </div>
        </div>
    )
}