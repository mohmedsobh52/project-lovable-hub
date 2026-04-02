import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { FileUpload } from "@/components/FileUpload";
import { WorkflowStatus } from "@/components/WorkflowStatus";
import { AnalysisResults, type BOQItem } from "@/components/AnalysisResults";
import { parseExcelFile } from "@/lib/excel-utils";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const Analysis = () => {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [items, setItems] = useState<BOQItem[]>([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setStep(1);

    try {
      const isExcel = file.name.match(/\.(xlsx|xls|csv)$/i);
      if (isExcel) {
        setStep(2);
        const parsed = await parseExcelFile(file);
        setItems(parsed);
        setStep(3);
      } else {
        // PDF - show placeholder
        setStep(2);
        setTimeout(() => {
          setItems([
            { itemNo: "1", description: "أعمال حفر وردم", unit: "م³", quantity: 500, unitPrice: 45, totalPrice: 22500, category: "أعمال ترابية" },
            { itemNo: "2", description: "خرسانة مسلحة للأساسات", unit: "م³", quantity: 200, unitPrice: 1200, totalPrice: 240000, category: "أعمال خرسانية" },
            { itemNo: "3", description: "توريد وتركيب كابلات كهربائية", unit: "م.ط", quantity: 1500, unitPrice: 85, totalPrice: 127500, category: "أعمال كهربائية" },
            { itemNo: "4", description: "أعمال دهانات داخلية", unit: "م²", quantity: 3000, unitPrice: 35, totalPrice: 105000, category: "تشطيبات" },
            { itemNo: "5", description: "نظام تكييف مركزي", unit: "وحدة", quantity: 8, unitPrice: 15000, totalPrice: 120000, category: "أعمال ميكانيكية" },
          ]);
          setStep(3);
        }, 1500);
      }
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">{t("workflowStatus")}</CardTitle>
          </CardHeader>
          <CardContent>
            <WorkflowStatus currentStep={step} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FileUpload onFileSelect={(f) => { setFile(f); setStep(0); setItems([]); }} />
          <Card className="border-none shadow-md flex items-center justify-center">
            <CardContent className="p-8">
              <Button
                size="lg"
                disabled={!file || loading}
                onClick={handleAnalyze}
                className="w-full text-base gap-2"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {t("startAnalysis")}
              </Button>
            </CardContent>
          </Card>
        </div>

        <AnalysisResults items={items} />
      </div>
    </AppLayout>
  );
};

export default Analysis;
