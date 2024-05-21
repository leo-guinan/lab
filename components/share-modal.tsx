'use client'
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"


export function ShareModal({userId}: {userId: string}) {

    const urlSafeRedirectUrl = encodeURIComponent(`https://app.scoremydeck.com/referred_by/${userId}/`)

    const redirectTo = `https://app.scoremydeck.com/sign-in?callbackUrl=${urlSafeRedirectUrl}`

    const handleCopy = () => {
         navigator.clipboard.writeText(redirectTo)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="rounded-lg p-2 bg-standard text-objections">share with a friend! 🚀</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Share Referral Link</DialogTitle>
                    <DialogDescription>Invite your friends to take part in the private beta!</DialogDescription>
                </DialogHeader>
                <div className="flex">
                    <div className="flex flex-col items-center space-y-4 w-full">
                        <Input readOnly value={redirectTo}/>
                        <Button onClick={handleCopy}>Copy Link</Button>
                    </div>
                </div>
                <DialogFooter>
                    <div>
                        <Button variant="outline">Close</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}