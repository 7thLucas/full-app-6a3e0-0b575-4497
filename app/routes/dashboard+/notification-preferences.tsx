import { redirect } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { getUserFromRequest } from "~/modules/authentication/authentication.server";
import { NotificationPrefsForm } from "~/notification-prefs/components/notification-prefs-form";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = getUserFromRequest(request);
  if (!user) return redirect("/auth/login");
  return null;
}

export default function NotificationPreferencesPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Notification Preferences</h1>
        <p className="mt-1 text-muted-foreground">
          Control which coaching emails you receive, how often, and when.
        </p>
      </div>
      <NotificationPrefsForm />
    </div>
  );
}
