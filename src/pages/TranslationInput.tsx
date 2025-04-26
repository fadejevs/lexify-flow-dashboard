
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

export default function TranslationInput() {
  const [text, setText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/translation/processing");
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-neutral-800 mb-6">Enter Translation Details</h1>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Source Language</label>
                <Select onValueChange={setSourceLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Target Language</label>
                <Select onValueChange={setTargetLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
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
                className="h-40"
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="border-neutral-300 text-neutral-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleNext}
                className="bg-brand-primary hover:bg-brand-secondary text-white"
                disabled={!text || !sourceLanguage || !targetLanguage}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
