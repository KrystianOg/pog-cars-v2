import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { CarForm } from "./components/car-form";

export default function CarsPage() {
  return (
    <main>
      Cars page here
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <CarForm/>
        </DialogContent>
      </Dialog>
    </main>
  );
}
