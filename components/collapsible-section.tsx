'use client'
import {useState, useRef, useEffect} from "react";
import {MinusIcon, PlusIcon} from "@/components/ui/icons";
import {cn} from "@/lib/utils";

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
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            if (isOpen) {
                setHeight(`${contentRef.current.scrollHeight}px`);
            } else {
                setHeight("0px");
            }
        }
    }, [isOpen]);

    useEffect(() => {
        if (contentRef.current && isOpen) {
            requestAnimationFrame(() => {
                setHeight(`${contentRef.current?.scrollHeight}px`);
            });
        }
    }, [children]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            if (contentRef.current) {
                setHeight(`${contentRef.current.scrollHeight}px`);
            }
        } else {
            setHeight("0px");
        }
    };

    return (
        <div className={cn("w-full mb-8")}>
            <button
                onClick={handleToggle}
                className={cn("rounded-full bg-green-600 text-2xl items-center flex w-full py-4 text-left", headerColor ? `bg-${headerColor}` : "")}
            >
                {isOpen ? (
                    <MinusIcon className="size-10" overrideColor={iconColor} />
                ) : (
                    <PlusIcon className="size-10" overrideColor={iconColor} />
                )}
                <span className="ml-4">{title}</span>
            </button>
            <div
                ref={contentRef}
                className="overflow-hidden transition-max-height duration-500 ease-out"
                style={{ maxHeight: height, }}
            >
                <div className="p-6 border-t border-gray-200 ml-8">{children}</div>
            </div>
        </div>
    );
}