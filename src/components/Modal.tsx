import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal = ({ title, icon, children, description }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>{icon}</DialogTrigger>
      <DialogContent>
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
