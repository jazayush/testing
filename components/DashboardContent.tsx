"use client"

import { useState } from "react"
import {
  Search,
  Settings,
  LayoutGrid,
  Moon,
  Sun,
  Bell,
  Plus,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Send,
  Paperclip,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function DashboardContent() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [selectedTask, setSelectedTask] = useState<any>(null)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    document.documentElement.classList.toggle("dark")
  }

  const tasks = [
    {
      id: 1,
      title: "Read and sign contracts",
      priority: "Med",
      status: "in progress",
      subtasks: [
        { title: "Approve SMB docs", status: "completed", team: "Lawyers Team", members: 4, date: "Jun 13th" },
        {
          title: "Schedule funding pitch for OnChange Brand",
          status: "open",
          team: "Marketing Team",
          members: 4,
          date: "Jun 24th",
        },
      ],
    },
    {
      id: 2,
      title: "Prepare materials for Funding pitch",
      priority: "Low",
      status: "in progress",
      subtasks: [
        { title: "Communicate with @Marketing", status: "open", team: "Lawyers Team", members: 4, date: "Jun 13th" },
        {
          title: "Schedule funding pitch for OnChange Brand",
          status: "open",
          team: "Marketing Team",
          members: 4,
          date: "Jun 24th",
        },
      ],
    },
  ]

  const messages = [
    {
      name: "Steven Young",
      time: "9 mins ago",
      preview: "Does the dev kit need to be formatted in a specific way a...",
      unread: false,
    },
    {
      name: "John Lark",
      time: "2 days ago",
      preview: "I'll reach out to Dave and see if those are the requirements",
      unread: false,
    },
    {
      name: "Steven Young",
      time: "1 week ago",
      preview: "Does the dev kit need to be formatted in a specific way a...",
      unread: false,
    },
  ]

  return (
    <div className={`flex-1 flex ${theme === "dark" ? "dark" : ""}`}>
      <div className="flex-1 flex flex-col bg-white dark:bg-[#0a0a0a]">
        {/* Top Bar */}
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Bell className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl">
            {/* Project Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Project Overview</h2>
                <button className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-black/30 transition-colors">
                  <Settings className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                OnChange re-brand and pitch to board of directors
              </p>

              {/* Timeline */}
              <div className="relative h-48 bg-white dark:bg-black/40 rounded-xl p-4">
                <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <span>INITIATED</span>
                  <span>PLANNING</span>
                  <span>REBRAND</span>
                  <span>PITCH</span>
                  <span>APPROVAL</span>
                </div>
                <div className="relative h-24">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-0 left-[10%] text-xs text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-red-500 rounded-full mb-1 mx-auto"></div>
                    Apr 21st
                  </div>
                  <div className="absolute bottom-0 left-[30%] text-xs text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-red-500 rounded-full mb-1 mx-auto"></div>
                    May 16th
                  </div>
                  <div className="absolute bottom-0 left-[60%] text-xs text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-red-500 rounded-full mb-1 mx-auto"></div>
                    Jun 4th
                  </div>
                  <div className="absolute top-0 right-[20%] text-xs text-gray-600 dark:text-gray-400">
                    due Jun 18th
                  </div>
                  <div className="absolute top-0 right-[5%] text-xs text-gray-600 dark:text-gray-400">due Jul 3rd</div>
                </div>
              </div>
            </motion.div>

            {/* File & Media Library */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">File & Media Library</h2>
                <button className="w-8 h-8 rounded-lg bg-white dark:bg-black/40 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-black/60 transition-colors">
                  <Plus className="w-4 h-4 text-gray-900 dark:text-white" />
                </button>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl p-6 text-white">
                  <div className="text-3xl mb-2">📁</div>
                  <div className="text-2xl font-bold">427 files</div>
                  <div className="text-sm opacity-90">100 GB</div>
                </div>
                <div className="flex justify-center gap-2 mt-4">
                  <button className="p-2 rounded-lg hover:bg-white dark:hover:bg-black/40 transition-colors">
                    <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white dark:hover:bg-black/40 transition-colors">
                    <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">File Vault</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  A collection of all the creative assets uploaded or modified by your team
                </p>
                <button className="px-4 py-2 bg-white dark:bg-black/40 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-black/60 transition-colors">
                  Open the Vault
                </button>
              </div>
            </motion.div>

            {/* Scheduling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Scheduling</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">You have one event on your calendar today</p>

              <div className="flex -space-x-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white dark:border-gray-900"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white dark:border-gray-900"></div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white dark:border-gray-900"></div>
              </div>

              <div className="bg-white dark:bg-black/40 rounded-xl p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Meet with Marketing team</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Meeting link</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>11:00am</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-96 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] flex flex-col">
        {/* Task List */}
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Task List</h2>
            <button className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <LayoutGrid className="w-4 h-4" />
              Display
            </button>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setSelectedTask(task)}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
                  <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
                    {task.priority}
                  </span>
                </div>

                <div className="space-y-2">
                  {task.subtasks.map((subtask, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={subtask.status === "completed"}
                        className="w-4 h-4 rounded border-gray-300"
                        readOnly
                      />
                      <span
                        className={
                          subtask.status === "completed"
                            ? "line-through text-gray-500"
                            : "text-gray-700 dark:text-gray-300"
                        }
                      >
                        {subtask.title}
                      </span>
                      {subtask.status === "open" && (
                        <span className="ml-auto text-xs px-2 py-1 rounded-full bg-blue-500 text-white">Open</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Messages */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Messages</h2>
              <button className="text-sm text-gray-600 dark:text-gray-400">
                <Search className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-gray-900 dark:text-white">{message.name}</span>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{message.preview}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Task Detail Panel */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="w-96 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0a] flex flex-col"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-600">Mark Completed</span>
                <button onClick={() => setSelectedTask(null)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Schedule funding pitch for OnChange brand
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Assignee</div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600"></div>
                    <span className="text-sm text-gray-900 dark:text-white">Jennifer Smith</span>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Due Date</div>
                  <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white">
                    <Calendar className="w-4 h-4" />
                    Jul 16, '24
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Status</div>
                  <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-600 text-sm">
                    In Progress
                  </span>
                </div>

                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Priority</div>
                  <span className="inline-block px-3 py-1 rounded-full bg-green-500/20 text-green-600 text-sm">
                    Low
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Comments</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Jennifer • July 3rd, 2020</div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      We'll get right on that <span className="text-blue-500">@Jennifer</span> we just need the deck
                      from <span className="text-blue-500">@Marketing</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm outline-none border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400"
                />
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Paperclip className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600">
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
