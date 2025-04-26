
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NewTranslationModal } from "./NewTranslationModal";
import { PlusIcon } from "lucide-react";

export function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-neutral-800 mb-8">Translation Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-neutral-700">Recent Translations</h2>
            <Button 
              onClick={() => setShowModal(true)}
              className="bg-brand-primary hover:bg-brand-secondary text-white"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              New Translation
            </Button>
          </div>
          
          <div className="p-8 text-center text-neutral-400">
            No translations yet. Start by creating a new translation.
          </div>
        </div>
      </div>
      
      <NewTranslationModal open={showModal} onOpenChange={setShowModal} />
    </div>
  );
}
