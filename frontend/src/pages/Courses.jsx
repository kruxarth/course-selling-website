import { useQuery } from "@tanstack/react-query";
import { allCourses } from "@/api/auth.api";
import { BookOpen, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Courses() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: allCourses,
  });

  const courses = data?.courses ?? [];

  return (
    <div className="bg-[#FFFBEB] min-h-screen w-full">
      <div className="px-6 py-8 lg:px-10 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Browse Courses
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Explore all available courses and start learning today.
          </p>
        </div>

        {/* Error */}
        {isError && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-red-700">
            Failed to load courses: {error?.message || "Something went wrong"}
          </div>
        )}

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-96 rounded-xl" />
              ))
            : courses.map((course) => (
                <Card
                  key={course._id}
                  className="overflow-hidden border-amber-200 hover:shadow-md transition-shadow flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48">
                    {course.image?.url ? (
                      <>
                        <div className="absolute inset-0 z-10 bg-black/20" />
                        <img
                          src={course.image.url}
                          alt={course.title}
                          className="h-full w-full object-cover"
                        />
                      </>
                    ) : (
                      <div className="h-full w-full bg-amber-100 flex items-center justify-center">
                        <BookOpen size={48} className="text-amber-400" />
                      </div>
                    )}
                    <Badge className="absolute top-3 right-3 z-20 bg-[#FFE64D] text-black hover:bg-[#FFE64D]">
                      ₹{course.price}
                    </Badge>
                  </div>

                  {/* Content */}
                  <CardHeader>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="mt-auto">
                    {/* Seller */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="flex items-center justify-center bg-amber-200 rounded-full size-7 p-1">
                        <User size={14} />
                      </div>
                      <span>
                        by{" "}
                        <span className="font-medium text-gray-800">
                          {course.creatorId
                            ? `${course.creatorId.firstName} ${course.creatorId.lastName}`
                            : "Unknown"}
                        </span>
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button className="w-full bg-[#FFE64D] text-black hover:brightness-95 font-semibold">
                      Buy Course
                    </Button>
                  </CardFooter>
                </Card>
              ))}
        </div>

        {/* Empty state */}
        {!isLoading && courses.length === 0 && !isError && (
          <div className="text-center py-20">
            <BookOpen size={48} className="mx-auto text-amber-400 mb-4" />
            <p className="text-gray-500 text-lg">
              No courses available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
