import {
    AlertDialog,
    AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from './ui/alert-dialog'
import {createCheckoutSession} from "@/app/actions/stripe";
import {CheckmarkIcon} from "@/components/ui/icons";


export default function CreditModal({open, setOpen}: { open: boolean, setOpen: (value: boolean) => void }) {
    const handleAddCredits = async () => {
        await createCheckoutSession({redirectUrl: window.location.href});
    }

    return (
        <AlertDialog open={open} onOpenChange={(value) => setOpen(value)}>
            <AlertDialogContent className="flex flex-col items-center justify-center bg-muted/50">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex pt-16 text-4xl font-extrabold justify-center">How Credits Work 🤔</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col pb-8 text-gray-900 dark:text-zinc-50  justify-center">
                        <h1 className="flex text-xl justify-center">We&apos;ve kept it super simple</h1>
                        <h2 className="flex text-lg text-objections justify-center pb-8">You get 50 Credits for $10</h2>

                        <p className="flex flex-row justify-start items-center text-lg py-2 pl-4"><CheckmarkIcon className="size-8 mr-4" overrideColor="#FFCC2F" /> Normal chat messages (1 credit)</p>
                        <p className="flex flex-row justify-start items-center text-lg py-2 pl-4"><CheckmarkIcon className="size-8 mr-4"  overrideColor="#FFCC2F" /> Investor lookups cost (2 credits)</p>
                        <p className="flex flex-row justify-start items-center text-lg py-2 pl-4"><CheckmarkIcon className="size-8 mr-4"  overrideColor="#FFCC2F" /> Emails cost (5 credits).</p>
                        <p className="flex flex-row justify-start items-center text-lg py-2 pl-4"><CheckmarkIcon className="size-8 mr-4"  overrideColor="#FFCC2F" /> A full deck analysis will only cost you 10 credits</p>

                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col sm:flex-col pb-16 space-y-4">
                    <AlertDialogAction className="flex bg-[#60B258] text-3xl p-8 text-gray-900 dark:text-zinc-50" onClick={handleAddCredits}>Add
                        50
                        Credits
                    </AlertDialogAction>
                    <AlertDialogCancel className="flex">Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
