import { AppLayout } from "@/components/AppLayout";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Phone, Mail, Building2 } from "lucide-react";

const contractors = [
  { name: "شركة البناء المتقدم", specialty: "أعمال خرسانية", phone: "0501234567", email: "info@advanced.sa", projects: 5, status: "active" },
  { name: "مؤسسة الكهرباء الحديثة", specialty: "أعمال كهربائية", phone: "0557654321", email: "contact@modern-elec.sa", projects: 3, status: "active" },
  { name: "شركة التكييف والتبريد", specialty: "أعمال ميكانيكية", phone: "0509876543", email: "info@cooling.sa", projects: 2, status: "active" },
  { name: "مؤسسة التشطيبات الراقية", specialty: "تشطيبات", phone: "0541112233", email: "info@luxury-finish.sa", projects: 4, status: "active" },
];

const Contractors = () => {
  const { t } = useLanguage();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{t("contractors")}</h2>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            {t("addProject")}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contractors.map((c, i) => (
            <Card key={i} className="border-none shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    {c.name}
                  </CardTitle>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600">
                    {c.projects} {t("projects")}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge variant="secondary">{c.specialty}</Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  <span dir="ltr">{c.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  {c.email}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Contractors;
