import { Outlet } from "react-router-dom"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin-sidebar"

export function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="min-w-0 flex-1 w-full overflow-auto">
        <div className="sticky top-0 z-10 bg-[#FFFBEB] p-2">
          <SidebarTrigger />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
