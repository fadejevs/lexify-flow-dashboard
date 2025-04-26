
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Flag } from "lucide-react";
import { toast } from "sonner";

interface TranslationData {
  id: string;
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
  timestamp: string;
  status: string;
  result?: string;
}

const languageNames: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  lv: "Latvian",
  ru: "Russian",
  zh: "Chinese",
  ja: "Japanese",
  ar: "Arabic"
};

export default function TranslationResult() {
  const [translation, setTranslation] = useState<TranslationData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the current translation from localStorage
    const data = localStorage.getItem("currentTranslation");
    if (!data) {
      toast.error("No translation result available");
      navigate("/");
      return;
    }

    const currentTranslation = JSON.parse(data) as TranslationData;
    setTranslation(currentTranslation);
  }, [navigate]);

  const handleNewTranslation = () => {
    navigate("/");
  };

  const copyToClipboard = () => {
    if (translation?.result) {
      navigator.clipboard.writeText(translation.result);
      toast.success("Translation copied to clipboard");
    }
  };

  if (!translation) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-neutral-600 hover:text-neutral-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="bg-white rounded-lg shadow-lg border border-neutral-200">
          <div className="border-b border-neutral-200 bg-neutral-50 p-6 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-neutral-800">Translation Complete</h1>
                <p className="text-neutral-600 mt-1">Your translation is ready</p>
              </div>
              <div className="flex items-center">
                <Flag className="h-5 w-5 mr-2 text-neutral-500" />
                <span className="text-sm font-medium text-neutral-700">
                  {translation.sourceLanguage && languageNames[translation.sourceLanguage]} → {translation.targetLanguage && languageNames[translation.targetLanguage]}
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-neutral-50 rounded-md border border-neutral-200">
                <h3 className="font-medium text-neutral-800 mb-2">Source: {translation.sourceLanguage && languageNames[translation.sourceLanguage]}</h3>
                <p className="text-neutral-700 whitespace-pre-wrap">{translation.text}</p>
              </div>
              
              <div className="p-4 bg-brand-light rounded-md border border-neutral-200">
                <h3 className="font-medium text-neutral-800 mb-2">Target: {translation.targetLanguage && languageNames[translation.targetLanguage]}</h3>
                <p className="text-neutral-700 whitespace-pre-wrap">{translation.result}</p>
              </div>
            </div>
            
            <div className="p-4 bg-neutral-50 rounded-md border border-neutral-200">
              <h3 className="font-medium text-neutral-800 mb-2">Translation Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-neutral-500">Completed on</p>
                  <p className="text-neutral-700">{new Date(translation.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Translation ID</p>
                  <p className="text-neutral-700">{translation.id}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral-200 bg-neutral-50 p-6 rounded-b-lg">
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={copyToClipboard}
                className="border-neutral-300 text-neutral-700"
              >
                Copy Translation
              </Button>
              
              <Button
                onClick={handleNewTranslation}
                className="bg-brand-primary hover:bg-brand-secondary text-white px-8"
              >
                New Translation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
