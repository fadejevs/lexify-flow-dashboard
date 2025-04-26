
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
        <div className="mt-6 space-y-6">
          <div className="p-4 bg-neutral-50 rounded-md border border-neutral-200">
            <p className="text-neutral-600">Begin a new translation project by entering your text and selecting languages for translation.</p>
          </div>
          <Button 
            onClick={handleStart} 
            className="w-full bg-brand-primary hover:bg-brand-secondary text-white group"
          >
            Start Translation
            <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
