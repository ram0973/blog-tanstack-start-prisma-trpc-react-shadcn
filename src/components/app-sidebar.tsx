import { Calendar, Home, Inbox, Newspaper, Search, Settings, StickyNote, UsersRound } from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
 
// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Posts",
    url: "/dashboard/posts",
    icon: Newspaper,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: UsersRound,
  },
]
 
export function AppSidebar() {
  return (
    <Sidebar style={
        {
          //"--sidebar-width": "calc(var(--spacing) * 42)",
          //"--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Blog</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}