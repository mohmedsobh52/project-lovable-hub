import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const categoryData = [
  { name: "أعمال خرسانية", value: 35 },
  { name: "أعمال كهربائية", value: 20 },
  { name: "أعمال ميكانيكية", value: 18 },
  { name: "تشطيبات", value: 15 },
  { name: "أخرى", value: 12 },
];

const valueData = [
  { name: "يناير", value: 320000 },
  { name: "فبراير", value: 450000 },
  { name: "مارس", value: 680000 },
  { name: "أبريل", value: 520000 },
  { name: "مايو", value: 890000 },
  { name: "يونيو", value: 750000 },
];

const COLORS = [
  "hsl(220, 70%, 55%)",
  "hsl(160, 60%, 45%)",
  "hsl(280, 60%, 55%)",
  "hsl(35, 80%, 55%)",
  "hsl(0, 60%, 55%)",
];

export function DashboardCharts() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">{t("categoryDistribution")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">{t("valueChart")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={valueData}>
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(v: number) => `${(v / 1000).toFixed(0)}K SAR`} />
              <Bar dataKey="value" fill="hsl(220, 70%, 55%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
