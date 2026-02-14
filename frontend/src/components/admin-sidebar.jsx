import { Package2, Settings, User2, ChevronUp, GalleryVerticalEnd } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import { getAdminMe } from "@/api/admin.api"

const items = [
  {
    title: "My Courses",
    url: "/admin/dashboard",
    icon: Package2,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ["admin"],
    queryFn: getAdminMe,
  })

  const admin = data?.admin ?? null

  return (
    <Sidebar className="border-r-2 border-amber-200">
      <SidebarHeader className="border-b border-amber-200 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-12 text-lg font-semibold hover:bg-amber-100 transition-colors">
              <div className="flex items-center justify-center rounded-xl h-8 w-8 bg-[#FFE64D] shadow-sm">
                <GalleryVerticalEnd size={18} />
              </div>
              <span className="text-amber-900">Koursera Admin</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-amber-700 font-medium text-xs uppercase tracking-wider mb-2">
            Admin Panel
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="h-10 rounded-xl font-medium text-gray-700 hover:bg-amber-100 hover:text-amber-900 transition-all duration-200 data-[active=true]:bg-[#FFE64D] data-[active=true]:text-amber-900 data-[active=true]:shadow-sm"
                  >
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-amber-200 pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-12 rounded-xl hover:bg-amber-100 transition-colors">
                  <div className="flex items-center justify-center rounded-full h-8 w-8 bg-amber-200 text-amber-800">
                    <User2 size={18} />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-gray-800">
                      {admin
                        ? `${admin.firstName} ${admin.lastName}`
                        : "Loading..."}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto text-gray-500" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] rounded-xl border-amber-200 bg-[#FFFBEB]"
              >
                <DropdownMenuItem
                  onSelect={() => navigate("/admin/settings")}
                  className="rounded-lg hover:bg-amber-100 cursor-pointer"
                >
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    localStorage.removeItem("admin-token")
                    navigate("/login", { replace: true })
                  }}
                  className="rounded-lg hover:bg-red-100 text-red-600 cursor-pointer"
                >
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
