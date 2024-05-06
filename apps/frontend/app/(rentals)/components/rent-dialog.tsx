import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function RentDialog({ children }: React.PropsWithChildren) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Click click</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Rent car</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
