
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
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

export default function TranslationProcessing() {
  const [translation, setTranslation] = useState<TranslationData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the current translation from localStorage
    const data = localStorage.getItem("currentTranslation");
    if (!data) {
      toast.error("No translation in progress");
      navigate("/");
      return;
    }

    const currentTranslation = JSON.parse(data) as TranslationData;
    setTranslation(currentTranslation);
    
    // Simulate translation processing with a timeout
    setLoading(true);
    const timer = setTimeout(() => {
      // Mock translation result based on the source text
      const mockResult = getMockTranslation(currentTranslation.text, currentTranslation.targetLanguage);
      
      // Update translation with result
      const updatedTranslation = {
        ...currentTranslation,
        status: "completed",
        result: mockResult
      };
      
      setTranslation(updatedTranslation);
      setLoading(false);
      
      // Update in localStorage
      localStorage.setItem("currentTranslation", JSON.stringify(updatedTranslation));
      
      // Also update in history
      const history = JSON.parse(localStorage.getItem("translationHistory") || "[]");
      const updatedHistory = history.map((item: TranslationData) => 
        item.id === updatedTranslation.id ? updatedTranslation : item
      );
      localStorage.setItem("translationHistory", JSON.stringify(updatedHistory));
      
      toast.success("Translation completed");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const getMockTranslation = (text: string, targetLang: string): string => {
    // Mock translations for demo purposes
    if (targetLang === "lv") {
      // Very simple mock Latvian translation
      return text
        .replace(/hello/gi, "sveiki")
        .replace(/good/gi, "labs")
        .replace(/thank you/gi, "paldies")
        .replace(/please/gi, "lūdzu")
        .replace(/welcome/gi, "laipni lūgti") || "Tulkojuma teksts";
    }
    
    // For other languages, append a note
    return text + " (translated to " + languageNames[targetLang] + ")";
  };

  const handleFinish = () => {
    navigate("/translation/result");
  };

  const handleCancel = () => {
    navigate("/");
  };

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
            <h1 className="text-2xl font-bold text-neutral-800">Processing Translation</h1>
            <p className="text-neutral-600 mt-1">Your translation is being processed</p>
          </div>
          
          <div className="p-6 space-y-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center p-12">
                <div className="w-16 h-16 border-4 border-t-brand-primary border-neutral-200 rounded-full animate-spin mb-4"></div>
                <p className="text-neutral-600">Translating your content...</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-neutral-50 rounded-md border border-neutral-200">
                  <h3 className="font-medium text-neutral-800">Source: {translation?.sourceLanguage && languageNames[translation.sourceLanguage]}</h3>
                  <p className="mt-2 text-neutral-700 whitespace-pre-wrap">{translation?.text}</p>
                </div>
                
                <div className="p-4 bg-neutral-50 rounded-md border border-neutral-200">
                  <h3 className="font-medium text-neutral-800">Target: {translation?.targetLanguage && languageNames[translation.targetLanguage]}</h3>
                  <p className="mt-2 text-neutral-700 whitespace-pre-wrap">{translation?.result}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="border-t border-neutral-200 bg-neutral-50 p-6 rounded-b-lg">
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-neutral-300 text-neutral-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleFinish}
                className="bg-brand-primary hover:bg-brand-secondary text-white px-8"
                disabled={loading}
              >
                {loading ? "Processing..." : "View Result"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
