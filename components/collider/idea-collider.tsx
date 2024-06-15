'use client'

import {useCallback, useEffect, useRef, useState} from "react";
import useSWRSubscription, {SWRSubscriptionOptions} from "swr/subscription";
import MarkdownBlock from "@/components/ui/markdown-block";

export default function IdeaCollider() {

    const [videoUrl, setVideoUrl] = useState('');
    const [video2Url, setVideo2Url] = useState('');
    const [audienceDescription, setAudienceDescription] = useState('');
    const [intersection, setIntersection] = useState('');
    const [generatedMarkdown, setGeneratedMarkdown] = useState('');
    const socketRef = useRef<WebSocket | null>(null)
    const [blogPost, setBlogPost] = useState<string>("")
    const [blogTitle, setBlogTitle] = useState<string>("")
    const [blogOutline, setBlogOutline] = useState<string>("")
    const uuid = "testing"
    const [shouldReconnect, setShouldReconnect] = useState(true);

    const connectWebSocket = useCallback(() => {
        if (!process.env.NEXT_PUBLIC_WEBSOCKET_URL) return;
        const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}toolkit/${uuid}/`);
        socketRef.current = socket;

        socket.addEventListener('open', () => {
            console.log('WebSocket connection opened.');
        });

        socket.addEventListener('message', (event) => {
            if (event.data) {
                const parsedData = JSON.parse(event.data.toString());
                setGeneratedMarkdown("Finished Generating");
                console.log(parsedData);
                setBlogPost(parsedData.result);
            }
        });

        socket.addEventListener('close', () => {
            console.log('WebSocket connection closed.');
            if (shouldReconnect) {
                setTimeout(() => connectWebSocket(), 5000); // Attempt to reconnect after 5 seconds
            }
        });

        socket.addEventListener('error', (event) => {
            console.error('WebSocket error: ', event);
            socket.close();
        });
    }, [shouldReconnect]);
    const sendVideoToProcess = useCallback((video_url: string, audience: string, video_2_url: string, intersection: string) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                youtube_url: video_url,
                other_youtube_url: video_2_url,
                intersection: intersection,
                audience,
                message: "For shits! And giggles!",
                type: "idea_collider"
            }));
        } else {
            console.error("WebSocket is not open. Ready state: ", socketRef.current?.readyState);
        }
    }, []);

    useEffect(() => {
        connectWebSocket();
        return () => {
            setShouldReconnect(false);
            socketRef.current?.close();
        };
    }, [connectWebSocket]);

    const {
        data,
        error
    } = useSWRSubscription(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}toolkit/${uuid}/` as string, (key, {next}: SWRSubscriptionOptions<number, Error>) => {
        console.log("key", key)
        connectWebSocket(); // initiate WebSocket connection

        const socket = socketRef.current;
        if (socket) {
            socket.addEventListener('message', (event) => next(null, event.data));
            // @ts-ignore
            socket.addEventListener('error', (event) => next(event.error));
        }

        return () => socket?.close();
    })


    useEffect(() => {
        if (!data) return
        const parsedData = JSON.parse(data.toString())
        setGeneratedMarkdown("Finished Generating")
        console.log(parsedData)
        // setBlogTitle(parsedData.title)
        // setBlogOutline(parsedData.outline)
        setBlogPost(parsedData.result)
    }, [data])

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted")
        console.log(videoUrl, audienceDescription, intersection, video2Url)
        sendVideoToProcess(videoUrl, audienceDescription, video2Url, intersection)
        // Logic to process the form and generate markdown
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center w-full">
                <div className="p-6 rounded-lg shadow-lg w-full">
                    <h1 className="text-2xl font-bold mb-4">Idea Collider</h1>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label className="block  text-sm font-bold mb-2" htmlFor="videoUrl">
                                YouTube Video URL
                            </label>
                            <input
                                type="text"
                                id="videoUrl"
                                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block  text-sm font-bold mb-2" htmlFor="videoUrl">
                                YouTube Video URL 2
                            </label>
                            <input
                                type="text"
                                id="video2Url"
                                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                value={video2Url}
                                onChange={(e) => setVideo2Url(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block  text-sm font-bold mb-2" htmlFor="audienceDescription">
                                What type of ideas do you want to create from the intersection?
                            </label>
                            <textarea
                                id="intersection"
                                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                rows={4}
                                value={intersection}
                                onChange={(e) => setIntersection(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block  text-sm font-bold mb-2" htmlFor="audienceDescription">
                                Audience Description
                            </label>
                            <textarea
                                id="audienceDescription"
                                className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                rows={4}
                                value={audienceDescription}
                                onChange={(e) => setAudienceDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Process
                            </button>
                        </div>
                    </form>
                    {generatedMarkdown && (
                        <div className="mt-6 p-4 rounded h-full ">
                            <h2 className="text-xl font-bold mb-2 ">{blogTitle}</h2>
                            <pre className="">{blogOutline}</pre>
                            <MarkdownBlock content={blogPost}/>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}