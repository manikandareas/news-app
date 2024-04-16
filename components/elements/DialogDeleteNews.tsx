import { Loader2, Trash2 } from "lucide-react";
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
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNews } from "@/actions/news.actions";
import { toast } from "sonner";
import { useSession } from "@/context/SessionContext";

type DialogDeleteNewsProps = {
    id: number;
    slug: string;
};

const DialogDeleteNews: React.FC<DialogDeleteNewsProps> = (props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { user } = useSession();
    const queryClient = useQueryClient();
    const { isPending, mutate } = useMutation({
        mutationFn: () => deleteNews(props.id, props.slug),
        onSuccess: () => {
            toast.success("News deleted successfully");
            queryClient.invalidateQueries({
                queryKey: ["news", "editor", user?.id],
            });
            setIsOpen(false);
        },
        onError: () => {
            toast.error("Something went wrong");
            setIsOpen(false);
        },
    });
    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogTrigger asChild>
                <Button
                    variant={"outline"}
                    size={"icon"}
                    className="size-10 text-red-500 p-0"
                >
                    <Trash2 size={14} />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </DialogDescription>
                    <DialogFooter>
                        <Button
                            disabled={isPending}
                            onClick={() => setIsOpen(false)}
                            variant={"outline"}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isPending}
                            variant={"destructive"}
                            className="bg-red-500"
                            onClick={() => mutate()}
                        >
                            {isPending ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                " Delete"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
export default DialogDeleteNews;
