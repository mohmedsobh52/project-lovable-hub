import {
  LayoutDashboard,
  FolderKanban,
  FileSearch,
  Users,
  Settings,
  Globe,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { t, toggleLanguage, language } = useLanguage();

  const items = [
    { title: t("dashboard"), url: "/", icon: LayoutDashboard },
    { title: t("projects"), url: "/projects", icon: FolderKanban },
    { title: t("analysis"), url: "/analysis", icon: FileSearch },
    { title: t("contractors"), url: "/contractors", icon: Users },
    { title: t("settings"), url: "/settings", icon: Settings },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-bold uppercase tracking-wider">
            {!collapsed && (
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent text-base font-bold">
                {t("pms")}
              </span>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="hover:bg-accent/50 transition-colors"
                      activeClassName="bg-primary/10 text-primary font-semibold"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLanguage}
          className="w-full justify-start gap-2"
        >
          <Globe className="h-4 w-4 shrink-0" />
          {!collapsed && (language === "ar" ? "English" : "العربية")}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
