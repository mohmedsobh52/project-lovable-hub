import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const projects = [
  { name: "مشروع برج السكني", status: "active", value: "1,200,000", date: "2026-03-15" },
  { name: "مجمع تجاري الرياض", status: "active", value: "850,000", date: "2026-03-10" },
  { name: "فيلا خاصة - جدة", status: "completed", value: "420,000", date: "2026-02-28" },
  { name: "مدرسة حكومية", status: "pending", value: "1,800,000", date: "2026-02-20" },
  { name: "مستشفى المدينة", status: "active", value: "3,500,000", date: "2026-01-15" },
];

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  completed: "bg-blue-500/10 text-blue-600 border-blue-200",
  pending: "bg-amber-500/10 text-amber-600 border-amber-200",
  cancelled: "bg-red-500/10 text-red-600 border-red-200",
};

export function RecentProjects() {
  const { t } = useLanguage();

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">{t("recentProjects")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("projectName")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("value")}</TableHead>
              <TableHead>{t("date")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, i) => (
              <TableRow key={i} className="hover:bg-muted/30">
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[project.status]}>
                    {t(project.status)}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono">{project.value} SAR</TableCell>
                <TableCell className="text-muted-foreground">{project.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
