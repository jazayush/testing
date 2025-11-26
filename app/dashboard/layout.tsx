"use client"

import type React from "react"

import { SimpleDashboardSidebar } from "@/components/SimpleDashboardSidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <SimpleDashboardSidebar />

      {/* Main content area */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
