import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminMe, updateAdmin, updateCourse } from "@/api/admin.api";
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



export function AdminSettings(){
  const queryClient = useQueryClient();

  const {data, isLoading} = useQuery({
    queryKey: ["admin"],
    queryFn: getAdminMe
  });

  const admin = data?.admin ?? null;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(()=>{
    if(admin){
      setFirstName(admin.firstName || "");
      setLastName(admin.lastName || "");
    }
  }, [admin])

  const updateMutation = useMutation({
    mutationFn: getAdminMe,
    onSuccess: ()=>{
      queryClient.invalidateQueries({queryKey: ["admin"]});

    }
  })

  const handleSave = (e) => {
    e.preventDefault();
    updateMutation.mutate({firstName, lastName});
  };

  const hasChanges = admin && (firstName!==admin.firstName || lastName !== admin.lastName);

  const joinedDate = admin?.createdAt ? new Date(admin.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }): null;



  return(
    <div className="bg-">

    </div>
  )



}













