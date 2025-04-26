
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Languages } from "lucide-react";

export default function TranslationInput() {
  const [text, setText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/translation/processing");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 text-neutral-600 hover:text-neutral-800 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="bg-white rounded-lg shadow-lg border border-neutral-200">
          <div className="border-b border-neutral-200 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 p-6 rounded-t-lg flex items-center gap-3">
            <Languages className="h-6 w-6 text-brand-primary" />
            <div>
              <h1 className="text-2xl font-bold text-neutral-800">New Translation</h1>
              <p className="text-neutral-600 mt-1">Enter your text and select languages</p>
            </div>
          </div>
          
          <div className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  Source Language
                </label>
                <Select onValueChange={setSourceLanguage} value={sourceLanguage}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select source language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                    <SelectItem value="lv">Latvian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  Target Language
                </label>
                <Select onValueChange={setTargetLanguage} value={targetLanguage}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select target language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                    <SelectItem value="lv">Latvian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700">Text to Translate</label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here..."
                className="min-h-[200px] resize-none bg-white"
              />
            </div>
          </div>
          
          <div className="border-t border-neutral-200 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 p-6 rounded-b-lg">
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="border-neutral-300 text-neutral-700 hover:bg-neutral-100"
              >
                Cancel
              </Button>
              <Button
                onClick={handleNext}
                className="bg-brand-primary hover:bg-brand-secondary text-white px-8 transition-colors duration-200"
                disabled={!text || !sourceLanguage || !targetLanguage}
              >
                Next Step
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
