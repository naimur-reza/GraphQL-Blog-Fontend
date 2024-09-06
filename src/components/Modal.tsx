import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface ModalProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  color?: string;
}

const Modal = ({ title, icon, children, description, color }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`p-3 rounded-full ${color}`}>{icon}</Button>
      </DialogTrigger>
      <DialogContent className={" overflow-y-scroll max-h-screen"}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
