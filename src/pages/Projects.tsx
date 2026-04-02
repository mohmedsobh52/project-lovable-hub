import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Search, MapPin, User } from "lucide-react";

interface Project {
  id: number;
  name: string;
  client: string;
  location: string;
  budget: string;
  status: "active" | "completed" | "pending";
  progress: number;
}

const initialProjects: Project[] = [
  { id: 1, name: "مشروع برج السكني", client: "شركة الإنماء", location: "الرياض", budget: "1,200,000", status: "active", progress: 65 },
  { id: 2, name: "مجمع تجاري الرياض", client: "مجموعة العقار", location: "الرياض", budget: "850,000", status: "active", progress: 40 },
  { id: 3, name: "فيلا خاصة - جدة", client: "أحمد محمد", location: "جدة", budget: "420,000", status: "completed", progress: 100 },
  { id: 4, name: "مدرسة حكومية", client: "وزارة التعليم", location: "الدمام", budget: "1,800,000", status: "pending", progress: 10 },
  { id: 5, name: "مستشفى المدينة", client: "وزارة الصحة", location: "المدينة", budget: "3,500,000", status: "active", progress: 25 },
  { id: 6, name: "مركز رياضي", client: "الهيئة العامة للرياضة", location: "جدة", budget: "2,100,000", status: "active", progress: 55 },
];

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  completed: "bg-blue-500/10 text-blue-600 border-blue-200",
  pending: "bg-amber-500/10 text-amber-600 border-amber-200",
};

const Projects = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filtered = initialProjects.filter((p) => {
    const matchSearch = p.name.includes(search) || p.client.includes(search);
    const matchFilter = filter === "all" || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("searchProjects")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ps-9"
            />
          </div>
          <div className="flex gap-2">
            {["all", "active", "completed", "pending"].map((s) => (
              <Button
                key={s}
                size="sm"
                variant={filter === s ? "default" : "outline"}
                onClick={() => setFilter(s)}
              >
                {s === "all" ? t("allStatuses") : t(s)}
              </Button>
            ))}
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              {t("addProject")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <Card key={project.id} className="border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{project.name}</CardTitle>
                  <Badge variant="outline" className={statusColors[project.status]}>
                    {t(project.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  {project.client}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {project.location}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t("budget")}</span>
                  <span className="font-mono font-medium">{project.budget} SAR</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t("progress")}</span>
                    <span className="font-mono">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Projects;
