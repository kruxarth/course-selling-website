import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "@/api/admin.api";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  BookOpen,
  Save,
  CheckCircle,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export function AdminEndpoint(){
    const queryClient = useQueryClient();
    const fileInputRef = useRef(null);
    const editFileInputRef = useRef(null);

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const [title, setTitle] = useState("");
    const [description, setDescription ] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editImage, setEditImage] = useState(null);
    const [editImagePreview, setEditImagePreview] = useState(null);

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["admin-courses"],
        queryFn: getAdminCourses,
    });

    const courses = data?.courses ?? [];
    
    const createMutation = useMutation({
        mutationFn: createCourse, 
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["admin-courses"]});
            resetCreateForm();
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateCourse,
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: ["admin-courses"]});
            setEditingCourse(null);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: deleteCourse,
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ["admin-courses"]});
            setDeleteConfirmId(null);
        }
    });

    const resetCreateForm = () => {
        setTitle("");
        setDescription("");
        setPrice("");
        setImage(null);
        setImagePreview(null);
        setShowCreateForm(false);
        if(fileInputRef.current) fileInputRef.current.value = "";
    }

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if(file){
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleEditImageChange = (e) => {
        const file = e.target.files?.[0];
        if(file){
            setEditImage(file);
            setEditImagePreview(URL.createObjectURL(file));
        }
    };

    const handleCreate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        if(image) formData.append("image", image);
        createMutation.mutate(formData);
    };

    const startEditing = (course) => {
        setEditingCourse(course);
        setEditTitle(course.title);
        setEditDescription(course.description);
        setEditPrice(course.price.toString());
        setEditImage(null);
        setEditImagePreview(course.image?.url || null);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", editTitle);
        formData.append("description", editDescription);
        formData.append("price", editPrice);
        if(editImage) formData.append("image", editImage);
        updateMutation.mutate({courseId: editingCourse._id, formData});
    };

    const handleDelete = (courseId)=> {
        deleteMutation.mutate(courseId);
    };

    return(
        <div className="bg-amber-200 min-h-screen w-full">
            <div className="px-6 py-8 lg: px-10 space-y-8">

            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        My Courses
                    </h1>
                    <p className="text-gray-500 mt-2 text-lg">
                        Create, edit and manage your course
                    </p>
                </div>
                {!showCreateForm && (
                    <Button
                    onClick={()=> setShowCreateForm(true)}
                    className="bg-amber-300 text-black hover:brightness-95 font-semibold"
                    >
                    <Plus size={18} className="mr-2" />New Course
                    </Button>
                )}
            </div>

            {showCreateForm && (
                <Card className="border-amber-200">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Create New Course

                            </CardTitle>

                            <CardDescription>
                                Fill in the details to publish a new course
                            </CardDescription>
                        </div>
                        <Button
                        variant="ghost"
                        size="icon"
                        onClick={resetCreateForm}
                        className="hover:bg-amber-100"
                        >
                            <X size={20}/>
                        </Button>
                        </div>
                    </CardHeader>

                    <ContentContent>
                        <form action="" onSubmit={handleCreate} className="space-y-5">
                        <div>
                            <Label htmlFor="title">
                            Title
                            </Label>
                            <Input
                            id = "title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder = "e.g. Complete React Course"
                            className="border-amber-200 focus-visible:ring-amber-400" required
                            />
                        </div>
                            
                        <div className="space-y-2">
                        <Label htmlFor="description" >Description</Label>
                        <textarea name="" id="description"
                        value={description}
                        onChange={(e)=> setDescription(e.target.value)}
                        placeholder="What will Students learn?"
                        rows={3}
                        required
                        className="w-full rounded-md border border-amber-200 
                        bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
                        />
                        </div> 

                        <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                            id="price"
                            type="number"
                            min="0"
                            value={price}
                            onChange={(e)=> setPrice(e.target.value)}
                            placeholder="499"
                            className="border-amber-200 focus-visible:ring-amber-400" required
                            />
                            
                        </div>

                        <div className="space-y-2">
                            <Label>Course Image</Label>
                            <div 
                            onClick={()=> fileInputRef.current?.click()}
                            className="cursor-pointer border-2 border-dashed border-amber-300 rounded-x1 p-6 flex flex-col items-center justify-center gap-2 hover:bg-amber-50 transition-colors"
                            >
                               {imagePreview ? ( 
                               <img
                               src={imagePreview}
                               alt="Preview"
                               className="h-32 w-full object-cover rounded-lg"
                               />
                               )
                               :
                               (
                                <>
                                <Upload size={32} className="text-amber-400"/>
                                <p>Click to upload an image</p>
                                <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                                
                                </>
                               )
                               }
                            </div>
                               <input type="file"
                               ref={fileInputRef}
                               accept="image/png, image/jpeg, image/jpg"
                               onChange="hidden"
                               />

                        </div>
                        <Separator className="bg-amber-200"/>

                        <div className="flex items-center gap-3">
                               <Button
                               type="submit"
                               disabled={createMutation.isPending}
                               className="bg-amber-400 text-black hover:brightness-95 font-semibold"
                               >
                                {createMutation.isPending ? (
                                    "creating.."
                                ):
                                createMutation.isSuccess ? (
                                    <>
                                    <CheckCircle size={16} className="mr-2"/>
                                    Created!
                                    </>
                                ):(
                                    <>
                                    <Plus size={16} className="mr-2"/>
                                    Create Course
                                    </>
                                    
                                )
                                }
                               </Button>
                               <Button
                               type="button"
                               variant="outline"
                               onClick={resetCreateForm}
                               className="border-amber-200 hover:bg-amber-100"
                               >
                                Cancel
                               </Button>
                        </div>

                                createMutation.isError && (
                                    <p className="text-red-600 text-sm">
                                    Failed to create course: {""}
                                    {createMutation.error?.response?.data?.error || "Something went wrong"}
                                    </p>
                                )
                        </form>

                    </ContentContent>
                </Card>
            )}


            {isError && (
                <div className="rounded-x1 bg-red-50 border  border-red-200 p-4">
                    Failed to load courses: {error?.message || "Something went wrong"}
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading
                ? Array.from({length: 3}).map((_, i)=> (
                    <Skeleton key={i} className="h-80 rounded-xl" />
                ))
            :
            courses.map((courses)=> {
                const isEditing = editingCourse?._id ==== course._id;
                if(isEditing){
                    return(
                        <Card
                        key={course._id}
                        className="border-amber-400 border-2 flex flex-col"
                        >
                            <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                                Edit Course
                            </CardTitle>
                            <Button
                            variant="ghost"
                            size="icon"
                            onClick= {()=> setEditingCourse(null)}
                            className="hover:bg-amber-100 h-8 w-8"
                            >
                                <X size={16}/>
                            </Button>
                            </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <form
                                 action=""
                                 onSubmit={handleUpdate}
                                 className="space-y-4"
                                 id={`edit-form-${course.id}`}>
                                    <div
                                    className="space-y-1"
                                    >
                                    <Label
                                    className="text-xs"
                                    >Title</Label>
                                    <Input
                                    value={editTitle}
                                    onChange = {editTitle}
                                    className="border-amber-200 focus-visible:ring-amber-400 h-9 text-sm" required
                                    />
                                    </div>
                                    <div
                                    className="space-y-1"
                                    >
                                    <Label className="text-xs">
                                    Description
                                    </Label>
                                    <textarea name=""
                                     id=""
                                     value={editDescription}
                                     onChange={setEditDescription(e.target.value)}
                                     rows={2}
                                     required
                                     className="w-full rounded-md border border-amber-200 bg-transparent px-3 py-2"
                                     ></textarea>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    )
                }
            })
            }
                


            </div>
            </div>
        </div>
    )


}



















