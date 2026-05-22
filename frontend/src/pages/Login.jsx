import { GalleryVerticalEnd } from "lucide-react"



import { LoginForm } from "@/components/login-form"
import backgroundImage from "@/assets/backgroundlogin.avif"


export function Login(){
  return(
    <div className="grid min-h-svh lg:grid-cols-2 bg-amber-50">
      <div className="flex min-w-0 flex-col gap-4 p-4 sm:p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
        <a href="#" className="flex items-center gap-2 font-medium">
        <div className="bg-black text-primary-foreground flex size-6 items-center justify-center rounded-md">
          <GalleryVerticalEnd className="size-4"/>
        </div>
        Koursera
        </a>
        </div>
        <div className="flex flex-1 items-center justify-center bg-white rounded-2xl px-4 py-8 sm:px-8 md:m-10 lg:m-20 xl:m-30">
          <div className="w-full max-w-sm">
            <LoginForm/>
          </div>
        </div>
      </div>
      <div className="bg-muted  relative hidden lg:block">
      <img src={backgroundImage} alt="Image"  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale "/>
      </div>
    </div>
  )
}























