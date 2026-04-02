import { AppLayout } from "@/components/AppLayout";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const Settings = () => {
  const { t, language, setLanguage } = useLanguage();

  return (
    <AppLayout>
      <div className="max-w-2xl space-y-6">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t("language")}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button
              variant={language === "ar" ? "default" : "outline"}
              onClick={() => setLanguage("ar")}
            >
              {t("arabic")}
            </Button>
            <Button
              variant={language === "en" ? "default" : "outline"}
              onClick={() => setLanguage("en")}
            >
              {t("english")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;
