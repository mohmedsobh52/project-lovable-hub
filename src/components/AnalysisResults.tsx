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

export interface BOQItem {
  itemNo: string;
  description: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
}

interface AnalysisResultsProps {
  items: BOQItem[];
}

const categoryColors: Record<string, string> = {
  "أعمال خرسانية": "bg-blue-500/10 text-blue-600",
  "أعمال كهربائية": "bg-amber-500/10 text-amber-600",
  "أعمال ميكانيكية": "bg-violet-500/10 text-violet-600",
  "تشطيبات": "bg-emerald-500/10 text-emerald-600",
  "أعمال ترابية": "bg-orange-500/10 text-orange-600",
  default: "bg-muted text-muted-foreground",
};

export function AnalysisResults({ items }: AnalysisResultsProps) {
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="p-12 text-center text-muted-foreground">
          {t("noData")}
        </CardContent>
      </Card>
    );
  }

  const total = items.reduce((s, i) => s + i.totalPrice, 0);

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{t("analysisResults")}</CardTitle>
        <Badge variant="secondary" className="text-base px-3 py-1 font-mono">
          {total.toLocaleString()} SAR
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto max-h-[500px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("itemNo")}</TableHead>
                <TableHead>{t("description")}</TableHead>
                <TableHead>{t("unit")}</TableHead>
                <TableHead>{t("quantity")}</TableHead>
                <TableHead>{t("unitPrice")}</TableHead>
                <TableHead>{t("totalPrice")}</TableHead>
                <TableHead>{t("category")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono">{item.itemNo}</TableCell>
                  <TableCell className="max-w-[250px] truncate">{item.description}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell className="font-mono">{item.quantity.toLocaleString()}</TableCell>
                  <TableCell className="font-mono">{item.unitPrice.toLocaleString()}</TableCell>
                  <TableCell className="font-mono font-medium">{item.totalPrice.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={categoryColors[item.category] || categoryColors.default}>
                      {item.category}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
