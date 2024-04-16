import { ModeToggle } from "../ui/mode-toggle";
import DialogSignOut from "./DialogSignOut";

type FooterEditorProps = {};

const FooterEditor: React.FC<FooterEditorProps> = () => {
    return (
        <footer className="flex text-muted-foreground  items-center sticky backdrop-blur-sm w-full bottom-0 justify-center border-t bg-background/80">
            <ModeToggle />
            <DialogSignOut />
        </footer>
    );
};
export default FooterEditor;
