import { useState, useCallback } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileSpreadsheet, FileText } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const isExcel = selectedFile?.name.match(/\.(xlsx|xls|csv)$/i);

  return (
    <Card
      className={`border-2 border-dashed transition-colors cursor-pointer ${
        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50"
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <CardContent className="p-8 flex flex-col items-center gap-3">
        <label className="cursor-pointer flex flex-col items-center gap-3 w-full">
          <input
            type="file"
            className="hidden"
            accept=".xlsx,.xls,.csv,.pdf"
            onChange={handleChange}
          />
          {selectedFile ? (
            <>
              {isExcel ? (
                <FileSpreadsheet className="h-12 w-12 text-emerald-500" />
              ) : (
                <FileText className="h-12 w-12 text-red-500" />
              )}
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </>
          ) : (
            <>
              <Upload className="h-12 w-12 text-muted-foreground/50" />
              <p className="font-medium text-muted-foreground">{t("uploadDesc")}</p>
              <p className="text-xs text-muted-foreground">Excel, CSV, PDF</p>
            </>
          )}
        </label>
      </CardContent>
    </Card>
  );
}
