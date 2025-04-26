
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function NewTranslationModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const navigate = useNavigate();

  const handleStart = () => {
    onOpenChange(false);
    navigate("/translation/input");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-neutral-800">Start New Translation</DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          <p className="text-neutral-600">Begin a new translation project by entering your text and selecting languages.</p>
          <Button onClick={handleStart} className="w-full bg-brand-primary hover:bg-brand-secondary text-white">
            Start Translation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
