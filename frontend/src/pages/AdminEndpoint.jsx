import { createCourse, getAdminCourses } from "@/api/admin.api";
import {  useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react";

export function AdminEndpoint(){
  

  const [title, setTitle] = useState("");





  const {data, isLoading, isError} = useQuery({
    queryKey: ["admin-courses"],
    queryFn: getAdminCourses
  });


  const createMutation = useMutation({
    mutationKey: ["admin-courses"],
    mutationFn: createCourse,
    onSuccess: ()=> {
      queryClient.invalidateQueries({queryKey: ["admin-courses"]});
      setTitle("");
    }
  })



  const handleCreate = () => {
    createMutation.mutate({title: title});
  }


  if(isLoading) return <div>"Loading courses</div>
  if(isError) return <div>"Error loading courses"</div>


  const courses = data?.courses ?? [];

  return(
    <>
    <h1>My courses</h1>
    <div>
      <div>
        <input type="text"
        value={title}
        onChange={(e)=> setTitle(e.target.value)}
        placeholder="Enter the title of the Course"
        />
        <button
        onClick={handleCreate}
        disabled={createMutation.isPending}
        className="border border-black"
        >
          {createMutation.isPending ? "Creating course" : "Add Course"}
        </button>
      </div>

      <ul>
        {courses.map((course)=>
        <li key={course._id}>
          {course.title} - {course.price}
        </li>
        )}

      </ul>
    </div>
    </>
  )

}
