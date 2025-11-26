"use client"

import { useState } from "react"
import { TrendingUp, DollarSign, FileText, Download, Eye, Plus, X, Trash2 } from "lucide-react"

export default function ReportsPage() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      icon: FileText,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "General Financial Report",
      description: "Generated on Dec 20, 2024",
      completion: 85,
      totalItems: 12,
      completedItems: 10,
    },
    {
      id: 2,
      icon: TrendingUp,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "Investment Reports",
      description: "Generated on Dec 18, 2024",
      completion: 92,
      totalItems: 8,
      completedItems: 7,
    },
    {
      id: 3,
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Loan and EMI Stuff",
      description: "Generated on Dec 15, 2024",
      completion: 78,
      totalItems: 15,
      completedItems: 11,
    },
  ])

  const [showAddModal, setShowAddModal] = useState(false)
  const [newBoardTitle, setNewBoardTitle] = useState("")

  const handleAddBoard = () => {
    if (newBoardTitle.trim() && boards.length < 4) {
      const newBoard = {
        id: Date.now(),
        icon: FileText,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        title: newBoardTitle,
        description: `Generated on ${new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}`,
        completion: 0,
        totalItems: 0,
        completedItems: 0,
      }
      setBoards([...boards, newBoard])
      setNewBoardTitle("")
      setShowAddModal(false)
    }
  }

  const handleDeleteBoard = (id: number) => {
    setBoards(boards.filter((board) => board.id !== id))
  }

  const downloadableReports = [
    {
      id: 1,
      name: "James Brown",
      email: "james@setu.com",
      reportTitle: "Your Financial Report No. 1",
      date: "May 22, 2023",
    },
    {
      id: 2,
      name: "Christian Dven",
      email: "christian@setu.com",
      reportTitle: "Your Financial Report No. 2",
      date: "Jun 15, 2023",
    },
    {
      id: 3,
      name: "Emily Lee",
      email: "emily@setu.com",
      reportTitle: "Your Financial Report No. 3",
      date: "Jun 18, 2023",
    },
    {
      id: 4,
      name: "Kristin Torres",
      email: "kristin@setu.com",
      reportTitle: "Your Financial Report No. 4",
      date: "Jun 23, 2023",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Financial Reports</h1>
        </div>

        {/* Report Cards/Boards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {boards.map((board) => {
            const Icon = board.icon
            return (
              <div
                key={board.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden border border-gray-100 relative group"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteBoard(board.id)
                  }}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="Delete board"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                {/* Icon/Thumbnail Area */}
                <div className="h-40 bg-gray-50 flex items-center justify-center">
                  <div className={`w-16 h-16 ${board.iconBg} rounded-2xl flex items-center justify-center`}>
                    <Icon className={`h-8 w-8 ${board.iconColor}`} />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">{board.description}</p>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[2.5rem]">
                    {board.title}
                  </h3>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900">{board.completion}%</span>
                    <span className="text-xs text-gray-500">
                      {board.completedItems}/{board.totalItems} sections
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all"
                      style={{ width: `${board.completion}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}

          {boards.length < 4 && (
            <div
              onClick={() => setShowAddModal(true)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden border-2 border-dashed border-gray-300 hover:border-blue-500 flex items-center justify-center min-h-[280px] group"
            >
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                  <Plus className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                  Add New Board
                </h3>
                <p className="text-xs text-gray-500 mt-1">Create a custom report board</p>
              </div>
            </div>
          )}
        </div>

        {/* Download Reports Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Available Reports</h2>
            <p className="text-sm text-gray-500">
              Download or preview your generated financial reports, ready to access anytime.
            </p>
          </div>

          <div className="space-y-4">
            {downloadableReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                    {report.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900">{report.reportTitle}</h3>
                  </div>
                </div>

                <div className="px-6 text-sm text-gray-600 flex-shrink-0">{report.date}</div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Preview
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Board</h2>
            <p className="text-sm text-gray-500 mb-6">Add a custom financial report board to organize your data</p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Board Name</label>
              <input
                type="text"
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
                placeholder="e.g., Tax Documents, Retirement Planning"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && handleAddBoard()}
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBoard}
                disabled={!newBoardTitle.trim()}
                className="flex-1 px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create Board
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
