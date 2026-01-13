'use client'

import { ThemeToggler } from '@/components/togglers/ThemeToggler'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import {
  BarChart3,
  Bell,
  Database,
  Download,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MoreVertical,
  PlusCircle,
  Search,
  Settings,
  Shield,
  Upload,
  User,
  Users
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

/* ---------------- INNER LAYOUT (uses sidebar state) ---------------- */

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar()
  const isExpanded = state === 'expanded'

  return (
    <div className="flex min-h-screen w-full">
      {/* ---------------- SIDEBAR ---------------- */}
      <Sidebar
        collapsible="icon"
        variant="inset"
        className=" transition-all duration-300"
      >
        {/* Header */}
        <SidebarHeader className=" pt-6 pb-4">
          <div className={cn("flex",
            isExpanded ? "items-center justify-between" : "justify-center"
          )}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600">
                <Shield className="h-6 w-6 text-white" />
              </div>

              {isExpanded && (
                <div className="transition-opacity">
                  <h1 className="text-xl font-bold bg-linear-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                    AdminPanel
                  </h1>
                  <p className="text-xs text-gray-500">Dashboard v1.0</p>
                </div>
              )}
            </div>
          </div>

          {isExpanded && (
            <div className="mt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search..." className="pl-10" />
              </div>
            </div>
          )}

        </SidebarHeader>

        
          <SidebarSeparator  className='w-full p-0 ml-0'/>

        {/* Navigation */}
        <SidebarContent className={cn( isExpanded ? "items-start" : "items-center px-0")}>
          <SidebarGroup className={cn( isExpanded ? "items-center" : "items-start")}>
            <SidebarGroupLabel>MAIN</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive>
                    <Link href="#">
                      <LayoutDashboard className="h-5 w-5" />
                      {isExpanded && <span>Dashboard</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="#">
                      <Users className="h-5 w-5" />
                      {isExpanded && <span>Users</span>}
                      {isExpanded && <Badge className="ml-auto">24</Badge>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="#">
                      <FileText className="h-5 w-5" />
                      {isExpanded && <span>Content</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="#">
                      <Database className="h-5 w-5" />
                      {isExpanded && <span>Database</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="#">
                      <BarChart3 className="h-5 w-5" />
                      {isExpanded && <span>Analytics</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>QUICK ACTIONS</SidebarGroupLabel>
            <SidebarGroupContent className="space-y-2 min-w-7 w-full">
              <Button variant="outline" size={isExpanded ?"sm" : "icon-sm"} className={cn("w-full gap-2", isExpanded ? 'justify-start': 'justify-center')}>
                <PlusCircle className="h-4 w-4" />
                {isExpanded && <span>New Project</span>}
              </Button>
              <Button variant="outline" size={isExpanded ?"sm" : "icon-sm"} className={cn("w-full gap-2", isExpanded ? 'justify-start': 'justify-center')}>
                <Upload className="h-4 w-4" />
                {isExpanded && <span>Upload</span>}
              </Button>
              <Button variant="outline" size={isExpanded ?"sm" : "icon-sm"} className={cn("w-full gap-2", isExpanded ? 'justify-start': 'justify-center')}>
                <Download className="h-4 w-4" />
                {isExpanded && <span>Export</span>}
              </Button>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="p-4 border-t">
          <div className={cn("flex items-center", isExpanded ? "justify-between" : "justify-center")}>
            {isExpanded && (
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-sm font-semibold">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
              </div>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {
                  isExpanded ? (
                    <Button size="icon" variant="ghost">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  )
                }
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" /> Help
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <SidebarInset className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b  px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="lg:hidden" />
            <div>
              <h2 className="text-lg font-semibold">Dashboard Overview</h2>
              <p className="text-sm text-gray-500">Welcome back</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggler variant="circle" start="top-center" />
            <Button size="icon" variant="outline" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </SidebarInset>
    </div>
  )
}

/* ---------------- PROVIDER WRAPPER ---------------- */

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SidebarProvider>
  )
}
