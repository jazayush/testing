"use client"

import { useState, useEffect } from "react"
import { Upload, ArrowUp, Sparkles, Settings, Loader2 } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface Chat {
  id: string
  name: string
  messages: Message[]
}

export default function AskSetuPage() {
  const [inputValue, setInputValue] = useState("")
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [hasStartedChat, setHasStartedChat] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (hasStartedChat) {
      setIsSidebarCollapsed(true)
      localStorage.setItem("askSetuChatStarted", "true")
    }
  }, [hasStartedChat])

  const generateChatName = (messages: Message[]): string => {
    if (messages.length === 0) return "New Chat"
    const firstUserMessage = messages[0]?.content || "New Chat"
    const words = firstUserMessage.trim().split(" ")
    if (words.length <= 4) return firstUserMessage
    return words.slice(0, 4).join(" ") + "..."
  }

  const sendMessageToN8N = async (message: string, chatId: string) => {
    try {
      setIsLoading(true)
      const response = await fetch("https://shwetankworkspace.app.n8n.cloud/webhook/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          chatId: chatId,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] n8n response:", data)
      return data.response || data.message || "I received your message and I'm processing it."
    } catch (error) {
      console.error("[v0] Error calling n8n webhook:", error)
      return "Sorry, I'm having trouble connecting right now. Please try again in a moment."
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    if (!hasStartedChat) {
      setHasStartedChat(true)
    }

    if (!activeChat) {
      const newChatId = Date.now().toString()
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: inputValue,
      }

      const newChat: Chat = {
        id: newChatId,
        name: generateChatName([userMessage]),
        messages: [userMessage],
      }

      setChats((prev) => [newChat, ...prev])
      setActiveChat(newChatId)

      const messageToSend = inputValue
      setInputValue("")

      const assistantResponse = await sendMessageToN8N(messageToSend, newChatId)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantResponse,
      }

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === newChatId
            ? {
                ...chat,
                messages: [...chat.messages, assistantMessage],
                name: generateChatName([...chat.messages, assistantMessage]),
              }
            : chat,
        ),
      )
    } else {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: inputValue,
      }

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChat
            ? {
                ...chat,
                messages: [...chat.messages, userMessage],
                name: generateChatName([...chat.messages, userMessage]),
              }
            : chat,
        ),
      )

      const messageToSend = inputValue
      setInputValue("")

      const assistantResponse = await sendMessageToN8N(messageToSend, activeChat)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantResponse,
      }

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChat
            ? {
                ...chat,
                messages: [...chat.messages, assistantMessage],
                name: generateChatName([...chat.messages, assistantMessage]),
              }
            : chat,
        ),
      )
    }
  }

  const currentChat = activeChat ? chats.find((chat) => chat.id === activeChat) : null

  return (
    <div className="h-full bg-white flex items-center justify-center relative overflow-hidden">
      <div
        className={`absolute left-0 top-0 h-full bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out z-10 ${
          isSidebarCollapsed ? "-translate-x-full" : "translate-x-0"
        } ${hasStartedChat ? "w-64" : "w-0"}`}
      ></div>

      <div
        className={`transition-all duration-700 ease-in-out ${
          hasStartedChat ? "opacity-0 scale-95 pointer-events-none absolute" : "opacity-100 scale-100 relative"
        }`}
      >
        <div className="w-full max-w-2xl px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-6">
              <div className="relative">
                <div className="w-10 h-10 border-2 border-gray-900 rounded-lg rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-900 rounded-sm"></div>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">How can I help today?</h1>
            <p className="text-sm text-gray-500">
              Try out new features: <span className="font-medium">Deep Search, Think, Edit Image</span>
            </p>
          </div>

          <div className="mb-8">
            <div className="relative flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-gray-300 transition-colors">
              <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0">
                <Upload className="h-5 w-5 text-gray-600" />
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 placeholder:text-gray-400"
              />

              <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>

              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="p-1.5 bg-black hover:bg-gray-800 text-white rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          hasStartedChat ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="border-b border-gray-200 px-6 py-4 bg-white flex items-center gap-3"></div>

          <div className="flex-1 overflow-y-auto px-6 pt-8 pb-32">
            <div className="max-w-3xl mx-auto space-y-6">
              {currentChat?.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      message.role === "user" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-gray-700">U</span>
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500 justify-start">
                  <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="max-w-[75%] rounded-2xl px-4 py-3 bg-gray-100 text-gray-900">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-4 bg-white">
            <div className="max-w-3xl mx-auto">
              <div className="relative flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus-within:border-gray-300 transition-colors">
                <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0">
                  <Upload className="h-5 w-5 text-gray-600" />
                </button>

                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 placeholder:text-gray-400"
                />

                <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0">
                  <Settings className="h-5 w-5 text-gray-600" />
                </button>

                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="p-1.5 bg-black hover:bg-gray-800 text-white rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUp className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
