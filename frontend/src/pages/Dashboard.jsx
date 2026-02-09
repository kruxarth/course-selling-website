import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Award, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMe, getPurchases } from "@/api/auth.api";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
}

export function Dashboard() {
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });

  const { data: purchaseData, isLoading: coursesLoading } = useQuery({
    queryKey: ["purchases"],
    queryFn: getPurchases,
  });

  const user = userData?.user ?? null;
  const courses = purchaseData?.courses ?? [];
  const loading = userLoading || coursesLoading;

  const greeting = getGreeting();

  const statCards = [
    { label: "Total Enrolled", value: courses.length, icon: BookOpen },
    { label: "Completed", value: 0, icon: Award },
    { label: "In Progress", value: courses.length, icon: TrendingUp },
    { label: "Hours Spent", value: 0, icon: Clock },
  ];

  const activeCourse = courses.length > 0 ? courses[0] : null;

  return (
    <div className="bg-[#FFFBEB] min-h-screen w-full">
      <div className="px-6 py-8 lg:px-10 space-y-8">
        {/* Greeting */}
        <div>
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-9 w-80" />
              <Skeleton className="h-5 w-64" />
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold tracking-tight">
                {greeting}, {user?.firstName || "there"} 👋
              </h1>
              <p className="text-gray-500 mt-2 text-lg">
                Ready to continue your learning journey?
              </p>
            </>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-28 rounded-xl" />
              ))
            : statCards.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-xl bg-white border border-amber-200 p-5 shadow-sm flex justify-between items-end hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-500">{label}</span>
                    <span className="font-bold tabular-nums text-5xl">
                      {value}
                    </span>
                  </div>
                  <div className="flex items-center justify-center bg-amber-300 rounded-xl size-10 p-2">
                    <Icon size={22} />
                  </div>
                </div>
              ))}
        </div>

        {/* Continue Learning */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Pick where you left off...</h2>
          {loading ? (
            <Skeleton className="h-64 max-w-3xl rounded-xl" />
          ) : activeCourse ? (
            <Card className="relative w-full max-w-3xl flex flex-row overflow-hidden h-64 border-amber-200">
              <div className="relative w-1/3 shrink-0">
                <div className="absolute inset-0 z-30 bg-black/35" />
                <img
                  src={activeCourse.image?.url}
                  alt="Course cover"
                  className="relative z-20 h-full w-full object-cover brightness-60 grayscale dark:brightness-40"
                />
              </div>
              <div className="flex flex-col flex-1">
                <CardHeader>
                  <CardAction>
                    <Badge variant="secondary">Continue</Badge>
                  </CardAction>
                  <CardTitle className="text-3xl">
                    {activeCourse.title}
                  </CardTitle>
                  <CardDescription>
                    {activeCourse.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-col gap-3 mt-auto">
                  <Button className="w-full">Click to play</Button>
                  <Progress value={0} className="w-full" />
                </CardFooter>
              </div>
            </Card>
          ) : (
            <p className="text-gray-500">
              No courses yet. Browse courses to get started!
            </p>
          )}
        </div>

        {/* Enrolled Courses */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Courses</h2>
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-xl" />
              ))}
            </div>
          ) : courses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses.map((course) => (
                <Card
                  key={course._id}
                  className="overflow-hidden border-amber-200 hover:shadow-md transition-shadow"
                >
                  <div className="relative h-44">
                    <div className="absolute inset-0 z-10 bg-black/30" />
                    <img
                      src={course.image?.url}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Enrolled</span>
                      <span className="font-semibold text-[#D4A800]">
                        ₹{course.price}
                      </span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-amber-300 hover:bg-amber-50"
                    >
                      Continue
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              You haven't enrolled in any courses yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
