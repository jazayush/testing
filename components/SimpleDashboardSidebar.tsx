"use client"

import {
  Home,
  BarChart2,
  MessageSquare,
  FileText,
  History,
  Settings,
  HelpCircle,
  Github,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const navigationItems = [
  { name: "Home", icon: Home, href: "/dashboard" },
  { name: "Analysis", icon: BarChart2, href: "/dashboard/analysis" },
  { name: "Ask Setu", icon: MessageSquare, href: "/dashboard/ask-setu" },
  { name: "Financial Reports", icon: FileText, href: "/dashboard/reports" },
  { name: "Chat History", icon: History, href: "/dashboard/chat-history" },
]

export function SimpleDashboardSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const checkChatStatus = () => {
      if (pathname === "/dashboard/ask-setu") {
        const chatStarted = localStorage.getItem("askSetuChatStarted")
        if (chatStarted === "true") {
          setIsCollapsed(true)
        }
      }
    }

    checkChatStatus()

    // Listen for storage changes
    window.addEventListener("storage", checkChatStatus)

    // Also check periodically in case storage event doesn't fire (same tab)
    const interval = setInterval(checkChatStatus, 100)

    return () => {
      window.removeEventListener("storage", checkChatStatus)
      clearInterval(interval)
    }
  }, [pathname])

  useEffect(() => {
    if (pathname !== "/dashboard/ask-setu") {
      localStorage.removeItem("askSetuChatStarted")
      setIsCollapsed(false)
    }
  }, [pathname])

  return (
    <aside
      className={`h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-6 border-b border-gray-100">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">#</span>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-base text-gray-900">Finance Setu</h2>
              <p className="text-xs text-gray-500">mail.financesetu@gmail.com</p>
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">#</span>
            </div>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link key={item.name} href={item.href}>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
              </div>
            </Link>
          )
        })}
      </nav>

      <div className={`px-3 py-2 flex items-center gap-2 ${isCollapsed ? "justify-center" : ""}`}>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <Github className="h-5 w-5" />
        </a>
        {!isCollapsed && (
          <a
            href="mailto:mail.financesetu@gmail.com"
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <Mail className="h-5 w-5" />
          </a>
        )}
      </div>

      <div className="p-3 border-t border-gray-100 space-y-1">
        <Link href="/dashboard/settings">
          <div
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
          </div>
        </Link>

        <Link href="/dashboard/help">
          <div
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors cursor-pointer ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <HelpCircle className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">Help Center</span>}
          </div>
        </Link>
      </div>
    </aside>
  )
}
