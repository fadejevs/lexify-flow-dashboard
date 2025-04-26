
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Flag, ArrowRight } from "lucide-react";

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

export function TranslationHistory() {
  const [history, setHistory] = useState<TranslationData[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const data = localStorage.getItem("translationHistory");
    if (data) {
      const parsedData = JSON.parse(data) as TranslationData[];
      // Sort by timestamp, newest first
      const sortedData = [...parsedData].sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      setHistory(sortedData);
    }
  }, []);
  
  const viewTranslation = (translation: TranslationData) => {
    localStorage.setItem("currentTranslation", JSON.stringify(translation));
    navigate("/translation/result");
  };
  
  if (history.length === 0) {
    return (
      <div className="p-4 text-center text-neutral-500 bg-neutral-50 rounded-md">
        No translations yet
      </div>
    );
  }
  
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Languages</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.slice(0, 5).map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {new Date(item.timestamp).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Flag className="h-4 w-4 mr-2 text-neutral-500" />
                  <span>{languageNames[item.sourceLanguage]} → {languageNames[item.targetLanguage]}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.status === 'completed' ? 'Completed' : 'Processing'}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => viewTranslation(item)}
                  className="hover:bg-neutral-100"
                >
                  View
                  <ArrowRight className="ml-1 h-3 w-3"/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
