import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="min-w-0 flex-1 w-full overflow-auto">
        <div className="sticky top-0 z-10 bg-[#FFFBEB] p-2">
          <SidebarTrigger />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
