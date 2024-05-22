'use client'
import { useEffect, useRef, useState } from "react";
import { MinusIcon, PlusIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export default function CollapsibleSection({
                                               title,
                                               children,
                                               headerColor,
                                               iconColor,
                                           }: {
    title: string
    children: React.ReactNode
    headerColor?: string
    iconColor?: string
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [height, setHeight] = useState("0px");
    const [transitionDuration, setTransitionDuration] = useState("0.5s");
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            const contentHeight = contentRef.current.scrollHeight;
            const duration = Math.min(1.5, contentHeight / 100); // Adjust this value to control the maximum duration
            setTransitionDuration(`${duration}s`);
            if (isOpen) {
                setHeight(`${contentHeight}px`);
            } else {
                setHeight("0px");
            }
        }
    }, [isOpen]);

    useEffect(() => {
        if (contentRef.current && isOpen) {
            requestAnimationFrame(() => {
                const contentHeight = contentRef?.current?.scrollHeight ?? 0;
                const duration = Math.min(1.5, contentHeight / 100); // Adjust this value to control the maximum duration
                setTransitionDuration(`${duration}s`);
                setHeight(`${contentHeight}px`);
            });
        }
    }, [children]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            if (contentRef.current) {
                const contentHeight = contentRef.current.scrollHeight;
                const duration = Math.min(1.5, contentHeight / 25); // Adjust this value to control the maximum duration
                setTransitionDuration(`${duration}s`);
                setHeight(`${contentHeight}px`);
                titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            setHeight("0px");
        }
    };

    return (
        <div className={cn("size-full mb-4")}>
            <button
                onClick={handleToggle}
                ref={titleRef}
                className={cn("rounded-full bg-green-600 text-base items-center flex w-full py-4 text-left", headerColor ? `bg-${headerColor}` : "")}
            >
                {isOpen ? (
                    <MinusIcon className="size-10 -ml-1" overrideColor={iconColor} />
                ) : (
                    <PlusIcon className="size-10 -ml-1" overrideColor={iconColor} />
                )}
                <span className="ml-4">{title}</span>
            </button>
            <div
                ref={contentRef}
                className="overflow-hidden"
                style={{
                    maxHeight: height,
                    transition: `max-height ${transitionDuration} cubic-bezier(0.25, 0.8, 0.25, 1)`
                }}
            >
                <div className="h-full p-6 border-t border-gray-200 ml-8 text-base overflow-y-auto">{children}</div>
            </div>
        </div>
    );
}