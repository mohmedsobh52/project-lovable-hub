import { AppLayout } from "@/components/AppLayout";
import { KPIDashboard } from "@/components/KPIDashboard";
import { DashboardCharts } from "@/components/DashboardCharts";
import { RecentProjects } from "@/components/RecentProjects";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <KPIDashboard />
        <DashboardCharts />
        <RecentProjects />
      </div>
    </AppLayout>
  );
};

export default Index;
