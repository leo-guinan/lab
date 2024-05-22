import {ShareModal} from "@/components/share-modal";
import {auth} from "@/auth";

export async function Banner() {

    const session = await auth();
    if (!session?.user) {
        return null
    }

    return (
        <>
            <div className="absolute top-0 left-0 w-full flex  justify-start bg-objections p-2">
                <h1 className="text-3xl font-bold sm:text-4xl flex items-center sm:justify-start flex-col sm:flex-row mx-auto sm:mx-0">
                <span
                    className="text-standard mr-4">
                        welcome to our private beta 🎉
            </span>
                    <ShareModal userId={session.user.id} />
                </h1>
            </div>
        </>
    )
}