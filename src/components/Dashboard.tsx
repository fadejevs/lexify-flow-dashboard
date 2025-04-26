
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { NewTranslationModal } from "./NewTranslationModal";
import { TranslationHistory } from "./TranslationHistory";
import { PlusIcon } from "lucide-react";

export function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [totalTranslations, setTotalTranslations] = useState(0);
  const [uniqueLanguages, setUniqueLanguages] = useState(0);

  useEffect(() => {
    // Get statistics from translation history
    const history = JSON.parse(localStorage.getItem("translationHistory") || "[]");
    
    setTotalTranslations(history.length);
    
    // Count unique languages
    if (history.length > 0) {
      const languages = new Set<string>();
      history.forEach((item: any) => {
        if (item.sourceLanguage) languages.add(item.sourceLanguage);
        if (item.targetLanguage) languages.add(item.targetLanguage);
      });
      setUniqueLanguages(languages.size);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-neutral-800 mb-2">Translation Dashboard</h1>
              <p className="text-neutral-600">Manage and create your translations</p>
            </div>
            <Button 
              onClick={() => setShowModal(true)}
              className="bg-brand-primary hover:bg-brand-secondary text-white px-6"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              New Translation
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Recent Translations Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200 md:col-span-2">
              <h2 className="text-xl font-semibold text-neutral-700 mb-4">Recent Translations</h2>
              <TranslationHistory />
            </div>
            
            {/* Stats Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-neutral-200">
              <h2 className="text-xl font-semibold text-neutral-700 mb-4">Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-neutral-50 rounded-md text-center">
                  <p className="text-2xl font-bold text-brand-primary">{totalTranslations}</p>
                  <p className="text-sm text-neutral-600">Total Translations</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-md text-center">
                  <p className="text-2xl font-bold text-brand-primary">{uniqueLanguages}</p>
                  <p className="text-sm text-neutral-600">Languages</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Button 
                  onClick={() => setShowModal(true)}
                  className="w-full bg-brand-light hover:bg-brand-primary text-brand-dark hover:text-white transition-colors"
                >
                  Start New Translation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <NewTranslationModal open={showModal} onOpenChange={setShowModal} />
    </div>
  );
}
