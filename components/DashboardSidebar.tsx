"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, BarChart3, MessageSquare, FileText, History, Menu, Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Navigation items configuration
const navigationItems = [
  { name: "Home", icon: Home, href: "/dashboard" },
  { name: "Analysis", icon: BarChart3, href: "/dashboard/analysis" },
  { name: "Ask Setu", icon: MessageSquare, href: "/dashboard/ask-setu" },
  { name: "Financial Reports", icon: FileText, href: "/dashboard/reports" },
  { name: "Chat History", icon: History, href: "/dashboard/history" },
]

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isCollapsed ? "80px" : "280px",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative h-full bg-white border-r border-gray-200 flex flex-col"
    >
      {/* Header: Logo and Collapse Button */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h2 className="font-bold text-lg leading-none">Finance Setu</h2>
                <p className="text-xs text-gray-500">v 1.0</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isCollapsed && (
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-xl">S</span>
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`flex-shrink-0 hover:bg-gray-100 ${isCollapsed ? "absolute top-4 right-3" : ""}`}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
              >
                <Icon className="h-5 w-5 text-gray-700 group-hover:text-orange-500 flex-shrink-0" />
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium text-gray-700 group-hover:text-orange-500 whitespace-nowrap overflow-hidden"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Footer: Social Icons */}
      <div className="p-4 border-t border-gray-200">
        <div
          className={`flex ${isCollapsed ? "flex-col" : "flex-row"} gap-2 ${isCollapsed ? "items-center" : "justify-center"}`}
        >
          <Button variant="ghost" size="icon" asChild className="hover:bg-gray-100">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 text-gray-600 hover:text-gray-900" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hover:bg-gray-100">
            <a href="mailto:support@financesetu.com" aria-label="Email">
              <Mail className="h-5 w-5 text-gray-600 hover:text-gray-900" />
            </a>
          </Button>
        </div>
      </div>
    </motion.aside>
  )
}
