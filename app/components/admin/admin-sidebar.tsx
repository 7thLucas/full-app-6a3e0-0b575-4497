import { Link, useLocation, Form } from "react-router";
import { useAuth } from "~/modules/authentication/use-authentication";
import { useConfigurables } from "~/modules/configurables";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const USER_NAV: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "⚡" },
  { label: "Notification Preferences", href: "/dashboard/notification-preferences", icon: "🔔" },
];

const ADMIN_NAV: NavItem[] = [
  { label: "Overview", href: "/admin", icon: "📊" },
  { label: "Users", href: "/admin/users", icon: "👥" },
  { label: "Notification Analytics", href: "/admin/notifications", icon: "📈" },
];

export function AdminSidebar() {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const { config } = useConfigurables();

  const appName = config?.appName ?? "Pathly";
  const logoUrl = config?.logoUrl;

  const isActive = (href: string) => {
    if (href === "/dashboard" || href === "/admin") {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  const navItems = isAdmin ? ADMIN_NAV : USER_NAV;

  return (
    <aside className="flex h-full w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-5">
        {logoUrl ? (
          <img src={logoUrl} alt={appName} className="h-8 w-8 rounded-lg object-cover" />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            {appName[0]}
          </div>
        )}
        <span className="text-lg font-bold text-sidebar-foreground">{appName}</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              isActive(item.href)
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </Link>
        ))}

        {/* Admin section for admin users on dashboard */}
        {isAdmin && location.pathname.startsWith("/dashboard") && (
          <>
            <div className="pt-4 pb-2 px-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-sidebar-foreground/50">
                My Account
              </p>
            </div>
            {USER_NAV.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </>
        )}
      </nav>

      {/* User Footer */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold shrink-0">
            {user?.username?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.username}</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">{user?.email}</p>
          </div>
        </div>
        <Form method="post" action="/auth/logout">
          <button
            type="submit"
            className="w-full rounded-lg border border-sidebar-border px-3 py-2 text-xs font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all"
          >
            Sign out
          </button>
        </Form>
      </div>
    </aside>
  );
}
