import { AppSidebar } from "@/components/app-sidebar";
import { AvatarDropdown } from "@/components/navbar/avatar-dropdown";
import ThemeToggle from "@/components/theme-toggle";
import { AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, createFileRoute, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: IndexComponent,
});

function IndexComponent() {
  const location = useLocation()
  const breadcrumbs = location.pathname.substring(1).split("/").map((item) => item.toUpperCase())
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* {JSON.stringify(location.pathname)}
      {JSON.stringify(breadcrumbs)} */}
      <main className="min-h-svh p-4 flex-1">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>TODO</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex">
            <div className="mr-2">
              <ThemeToggle />
            </div>
            <AvatarDropdown />
          </div>
        </header>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
