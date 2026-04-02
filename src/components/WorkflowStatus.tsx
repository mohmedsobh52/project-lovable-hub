import { useLanguage } from "@/hooks/useLanguage";
import { Upload, FileText, BarChart3, Network, Download, Check } from "lucide-react";

interface WorkflowStatusProps {
  currentStep: number;
}

export function WorkflowStatus({ currentStep }: WorkflowStatusProps) {
  const { t, isRTL } = useLanguage();

  const steps = [
    { key: "upload", icon: Upload },
    { key: "extract", icon: FileText },
    { key: "analyze", icon: BarChart3 },
    { key: "wbs", icon: Network },
    { key: "export", icon: Download },
  ];

  return (
    <div className="flex items-center justify-between w-full py-4">
      {steps.map((step, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;
        return (
          <div key={step.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                    ? "bg-primary/20 text-primary ring-2 ring-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
              </div>
              <span className={`text-xs font-medium ${isCurrent ? "text-primary" : "text-muted-foreground"}`}>
                {t(step.key)}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mt-[-1.25rem] ${
                  isCompleted ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
