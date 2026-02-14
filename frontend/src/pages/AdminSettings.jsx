import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminMe, updateAdmin } from "@/api/admin.api";
import { CalendarDays, Mail, Save, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function AdminSettings() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: getAdminMe,
  });

  const admin = data?.admin ?? null;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (admin) {
      setFirstName(admin.firstName || "");
      setLastName(admin.lastName || "");
    }
  }, [admin]);

  const mutation = useMutation({
    mutationFn: updateAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });

  const handleSave = (e) => {
    e.preventDefault();
    mutation.mutate({ firstName, lastName });
  };

  const hasChanges =
    admin && (firstName !== admin.firstName || lastName !== admin.lastName);

  const joinedDate = admin?.createdAt
    ? new Date(admin.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="bg-[#FFFBEB] min-h-screen w-full">
      <div className="px-6 py-8 lg:px-10 space-y-8 max-w-3xl">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
          <p className="text-gray-500 mt-2 text-lg">
            Manage your admin account details
          </p>
        </div>

        {/* Profile Card */}
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-2xl">Profile Information</CardTitle>
            <CardDescription>
              Update your name and view account details
            </CardDescription>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="space-y-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-6">
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="border-amber-200 focus-visible:ring-amber-400"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="border-amber-200 focus-visible:ring-amber-400"
                  />
                </div>

                {/* Email (read-only) */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="email"
                      value={admin?.email || ""}
                      disabled
                      className="border-amber-200 bg-amber-50/50"
                    />
                    <Badge
                      variant="outline"
                      className="shrink-0 border-amber-300 text-amber-700"
                    >
                      <Mail size={12} className="mr-1" />
                      Read only
                    </Badge>
                  </div>
                </div>

                <Separator className="bg-amber-200" />

                {/* Save Button */}
                <Button
                  type="submit"
                  disabled={!hasChanges || mutation.isPending}
                  className="bg-[#FFE64D] text-black hover:brightness-95 font-semibold disabled:opacity-50"
                >
                  {mutation.isPending ? (
                    "Saving..."
                  ) : mutation.isSuccess ? (
                    <>
                      <CheckCircle size={16} className="mr-2" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>

                {mutation.isError && (
                  <p className="text-red-600 text-sm">
                    Failed to update profile. Please try again.
                  </p>
                )}
              </form>
            )}
          </CardContent>
        </Card>

        {/* Account Info Card */}
        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-2xl">Account</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-6 w-64" />
            ) : (
              <div className="flex items-center gap-3 text-gray-600">
                <div className="flex items-center justify-center bg-amber-200 rounded-full size-9 p-2">
                  <CalendarDays size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member since</p>
                  <p className="font-medium text-gray-800">
                    {joinedDate || "Unknown"}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
