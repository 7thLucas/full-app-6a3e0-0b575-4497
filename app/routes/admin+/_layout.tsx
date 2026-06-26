import { redirect, Outlet } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { getUserFromRequest } from "~/modules/authentication/authentication.server";
import { UserRole } from "~/modules/authentication/authentication.types";
import { AdminSidebar } from "~/components/admin/admin-sidebar";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = getUserFromRequest(request);
  if (!user) return redirect("/auth/login");
  if (user.role !== UserRole.Admin) return redirect("/dashboard");
  return null;
}

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
