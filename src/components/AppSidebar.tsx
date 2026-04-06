import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Droplets, AlertTriangle, BarChart3, Heart, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/donors", icon: Users, label: "Donors" },
  { to: "/inventory", icon: Droplets, label: "Blood Stock" },
  { to: "/requests", icon: AlertTriangle, label: "Requests" },
  { to: "/compatibility", icon: Search, label: "Compatibility" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Heart className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-lg font-bold text-sidebar-foreground">BloodLink</h1>
            <p className="text-xs text-sidebar-foreground/60">Blood Bank System</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent rounded-lg p-4">
          <p className="text-xs text-sidebar-foreground/60 font-medium">System Status</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-sidebar-foreground/80">All systems online</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
