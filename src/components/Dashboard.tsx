
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NewTranslationModal } from "./NewTranslationModal";
import { PlusIcon, Languages, Activity, Sparkles } from "lucide-react";

export function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-brand-primary/10 rounded-lg">
                <Languages className="h-8 w-8 text-brand-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-neutral-800 mb-2">Translation Dashboard</h1>
                <p className="text-neutral-600">Manage and create your translations</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowModal(true)}
              className="bg-brand-primary hover:bg-brand-secondary text-white px-6 transition-colors duration-200"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              New Translation
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200 hover:border-brand-primary/50 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="h-5 w-5 text-brand-primary" />
                <h2 className="text-xl font-semibold text-neutral-700">Recent Translations</h2>
              </div>
              <div className="p-4 text-center text-neutral-500 bg-neutral-50 rounded-md border border-neutral-100">
                No translations yet
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200 hover:border-brand-primary/50 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-5 w-5 text-brand-primary" />
                <h2 className="text-xl font-semibold text-neutral-700">Statistics</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-50 rounded-md text-center border border-neutral-100">
                  <p className="text-2xl font-bold text-brand-primary">0</p>
                  <p className="text-sm text-neutral-600">Total Translations</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-md text-center border border-neutral-100">
                  <p className="text-2xl font-bold text-brand-primary">0</p>
                  <p className="text-sm text-neutral-600">Languages</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200 hover:border-brand-primary/50 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-4">
                <PlusIcon className="h-5 w-5 text-brand-primary" />
                <h2 className="text-xl font-semibold text-neutral-700">Quick Actions</h2>
              </div>
              <Button 
                onClick={() => setShowModal(true)}
                className="w-full bg-brand-light hover:bg-brand-primary text-brand-dark hover:text-white transition-colors duration-200"
              >
                Start New Translation
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <NewTranslationModal open={showModal} onOpenChange={setShowModal} />
    </div>
  );
}
