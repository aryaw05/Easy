import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogPreview(props: any) {
  const { children, input, onClick, disabled, Description } = props;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-7">Publish</Button>
      </DialogTrigger>
      <DialogContent className="w-">
        <DialogHeader>
          <DialogTitle>{input?.title}</DialogTitle>
          <DialogDescription>{Description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
        <DialogFooter>
          <Button
            disabled={disabled}
            onClick={() => onClick()}
            className="py-7"
          >
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
