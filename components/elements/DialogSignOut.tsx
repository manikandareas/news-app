"use client";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { signOut } from "@/actions/auth.actions";
import { toast } from "sonner";

type DialogSignOutProps = {};

const DialogSignOut: React.FC<DialogSignOutProps> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignOut = async () => {
        try {
            setIsLoading(true);
            await signOut().then((res) => {
                if (res?.success) {
                    router.push("/auth/sign-in");
                }
            });
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsOpen(false);
            setIsLoading(false);
        }
    };

    const router = useRouter();
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogTrigger asChild>
                <Button
                    variant={"link"}
                    size={"default"}
                    className="text-muted-foreground"
                >
                    Sign out
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action will remove your session
                    </DialogDescription>
                    <DialogFooter>
                        <Button
                            disabled={isLoading}
                            onClick={() => setIsOpen(false)}
                            variant={"outline"}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            variant={"destructive"}
                            className="bg-red-500"
                            onClick={handleSignOut}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                " Sign Out"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
export default DialogSignOut;
