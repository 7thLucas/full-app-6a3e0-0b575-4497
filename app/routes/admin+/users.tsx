import { useState, useEffect } from "react";
import { apiGet } from "~/lib/api.client";
import type { PublicUser } from "~/modules/authentication/authentication.types";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

interface UsersResponse {
  users: PublicUser[];
  total: number;
  page: number;
  limit: number;
}

export default function AdminUsersPage() {
  const [data, setData] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    apiGet<UsersResponse>("/api/auth/users", { page, limit: 20 })
      .then((res) => {
        if (res.success && res.data) setData(res.data);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const totalPages = data ? Math.ceil(data.total / 20) : 1;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <p className="mt-1 text-muted-foreground">
          All registered users on the platform
          {data && <span className="ml-2 text-primary font-medium">({data.total} total)</span>}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : !data || data.users.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-3xl mb-3">👥</p>
              <p className="text-muted-foreground">No users yet</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 px-4 text-left font-semibold text-muted-foreground">Username</th>
                      <th className="py-3 px-4 text-left font-semibold text-muted-foreground">Email</th>
                      <th className="py-3 px-4 text-left font-semibold text-muted-foreground">Role</th>
                      <th className="py-3 px-4 text-left font-semibold text-muted-foreground">Status</th>
                      <th className="py-3 px-4 text-left font-semibold text-muted-foreground">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.users.map((u, idx) => (
                      <tr
                        key={u.id}
                        className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${
                          idx % 2 === 0 ? "" : "bg-muted/10"
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                              {u.username[0].toUpperCase()}
                            </div>
                            <span className="font-medium text-foreground">{u.username}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{u.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                              u.role === "admin"
                                ? "bg-accent/15 text-accent"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                              u.is_active
                                ? "bg-secondary/15 text-secondary"
                                : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            {u.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {u.createdAt
                            ? new Date(u.createdAt).toLocaleDateString()
                            : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
