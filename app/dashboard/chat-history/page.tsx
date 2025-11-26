"use client"

import { useState } from "react"
import { Plus, Copy, ArrowRight, FileText, User } from "lucide-react"
import Link from "next/link"

interface ChatHistoryItem {
  id: string
  icon: string
  title: string
  url: string
  description: string
  timestamp: string
  endTime: Date
  clickCount: number
}

function formatEndTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) {
    return `${diffMins}m ago`
  } else if (diffHours < 24) {
    return `${diffHours}h ago`
  } else if (diffDays < 30) {
    return `${diffDays}d ago`
  } else {
    return date.toLocaleDateString()
  }
}

export default function ChatHistoryPage() {
  const [chatHistory] = useState<ChatHistoryItem[]>([
    {
      id: "1",
      icon: "💬",
      title: "What is Setu platform",
      url: "chat/hKWhPa",
      description: "Platform overview discussion",
      timestamp: "7m",
      endTime: new Date(Date.now() - 7 * 60000),
      clickCount: 27,
    },
    {
      id: "2",
      icon: "💼",
      title: "Integration setup help",
      url: "chat/ISnIPc",
      description: "API integration questions",
      timestamp: "10d",
      endTime: new Date(Date.now() - 10 * 86400000),
      clickCount: 48,
    },
    {
      id: "3",
      icon: "🔧",
      title: "Technical documentation",
      url: "chat/ISnIPc",
      description: "Developer resources inquiry",
      timestamp: "10d",
      endTime: new Date(Date.now() - 10 * 86400000),
      clickCount: 48,
    },
    {
      id: "4",
      icon: "📊",
      title: "Analytics dashboard",
      url: "chat/ISnIPc",
      description: "Data visualization questions",
      timestamp: "10d",
      endTime: new Date(Date.now() - 10 * 86400000),
      clickCount: 48,
    },
    {
      id: "5",
      icon: "🎯",
      title: "Payment gateway setup",
      url: "chat/XyZ123",
      description: "Transaction processing setup",
      timestamp: "2d",
      endTime: new Date(Date.now() - 2 * 86400000),
      clickCount: 35,
    },
    {
      id: "6",
      icon: "🔐",
      title: "Security best practices",
      url: "chat/AbC789",
      description: "Authentication and authorization",
      timestamp: "5d",
      endTime: new Date(Date.now() - 5 * 86400000),
      clickCount: 62,
    },
    {
      id: "7",
      icon: "🚀",
      title: "API rate limiting",
      url: "chat/DeF456",
      description: "Performance optimization tips",
      timestamp: "1h",
      endTime: new Date(Date.now() - 1 * 3600000),
      clickCount: 15,
    },
    {
      id: "8",
      icon: "📱",
      title: "Mobile SDK integration",
      url: "chat/GhI012",
      description: "React Native implementation",
      timestamp: "3d",
      endTime: new Date(Date.now() - 3 * 86400000),
      clickCount: 41,
    },
  ])

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-5 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-gray-900">Chat History</h1>
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
              <Plus className="h-4 w-4" />
              New Chat
            </button>
          </div>

          {/* Chat History Items */}
          <div className="divide-y divide-gray-100 max-h-[320px] overflow-y-auto">
            {chatHistory.map((item) => (
              <div key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 text-sm">{item.title}</span>
                      <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all">
                        <Copy className="h-3.5 w-3.5 text-gray-600" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="text-gray-300">•</span>
                      <span>Ended {formatEndTime(item.endTime)}</span>
                    </div>
                  </div>

                  {/* Description - Center */}
                  <div className="flex-1 text-center"></div>

                  {/* Stats */}
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                      Convert
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty Boxes Section */}
          <div className="p-6 grid grid-cols-2 gap-4">
            <Link href="/dashboard/reports">
              <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl hover:border-blue-400 transition-all cursor-pointer group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Finance Reports</h3>
                  <p className="text-sm text-gray-600 mb-4">View your financial analytics and reports</p>
                  <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                    <span>See Reports</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/dashboard/settings">
              <div className="h-64 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl hover:border-purple-400 transition-all cursor-pointer group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">User Profile</h3>
                  <p className="text-sm text-gray-500 mb-3">Finance Setu User</p>
                  <p className="text-xs text-gray-600 mb-4">Manage your account and preferences</p>
                  <div className="flex items-center gap-2 text-purple-600 font-medium text-sm group-hover:gap-3 transition-all">
                    <span>View Settings</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
