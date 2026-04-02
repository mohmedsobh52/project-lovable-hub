import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent } from "@/components/ui/card";
import { FolderKanban, DollarSign, ListChecks, Activity } from "lucide-react";

const kpis = [
  { key: "totalProjects", icon: FolderKanban, value: "12", color: "text-blue-500", bg: "bg-blue-500/10" },
  { key: "totalValue", icon: DollarSign, value: "4.2M", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { key: "totalItems", icon: ListChecks, value: "1,847", color: "text-amber-500", bg: "bg-amber-500/10" },
  { key: "activeProjects", icon: Activity, value: "7", color: "text-violet-500", bg: "bg-violet-500/10" },
];

export function KPIDashboard() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.key} className="border-none shadow-md hover:shadow-lg transition-shadow bg-card">
          <CardContent className="p-5 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${kpi.bg}`}>
              <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t(kpi.key)}</p>
              <p className="text-2xl font-bold">{kpi.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
