"use client"

import { useState, useEffect } from "react"
import { UserIcon, LogOut } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function DashboardPage() {
  const router = useRouter()
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    age: 0,
    occupation: "",
    income: 0,
    expenses: 0,
    savings: 0,
    dateOfJoining: "",
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient()

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      console.log("[v0] Dashboard - Fetching user data, user:", user?.id)

      if (authError || !user) {
        console.error("[v0] Dashboard - Auth error or no user:", authError)
        router.push("/")
        return
      }

      const { error: loginUpdateError } = await supabase
        .from("login_details")
        .update({ login_session_end_time: new Date().toISOString() })
        .eq("user_id", user.id)
        .order("login_session_start_time", { ascending: false })
        .limit(1)

      if (loginUpdateError) {
        console.error("[v0] Dashboard - Error updating login session:", loginUpdateError)
      }

      // Fetch onboarding data
      const { data: onboardingData, error } = await supabase
        .from("user_onboarding_information")
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (error) {
        console.error("[v0] Dashboard - Error fetching onboarding data:", error)
        if (error.code === "PGRST116") {
          console.log("[v0] Dashboard - No onboarding data found, redirecting to onboarding")
          router.push("/onboarding")
          return
        }
        setIsLoading(false)
        return
      }

      if (onboardingData) {
        console.log("[v0] Dashboard - Onboarding data loaded successfully")
        setUserData({
          name: onboardingData.name || "User",
          email: user.email || "",
          age: onboardingData.age || 0,
          occupation: onboardingData.occupation || "",
          income: onboardingData.income_per_month || 0,
          expenses: onboardingData.expenses_per_month || 0,
          savings: onboardingData.savings_per_month || 0,
          dateOfJoining: new Date(onboardingData.created_at).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
        })
      }

      setIsLoading(false)
    }

    fetchUserData()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from("login_details")
        .update({ login_session_end_time: new Date().toISOString() })
        .eq("user_id", user.id)
        .order("login_session_start_time", { ascending: false })
        .limit(1)
    }

    await supabase.auth.signOut()
    console.log("[v0] Dashboard - User logged out")
    router.push("/")
  }

  const financialMetrics = [
    {
      label: "MONTHLY INCOME",
      value: `₹${userData.income.toLocaleString()}`,
      color: "bg-green-500/10",
    },
    {
      label: "MONTHLY EXPENSES",
      value: `₹${userData.expenses.toLocaleString()}`,
      color: "bg-red-500/10",
    },
    {
      label: "MONTHLY SAVINGS",
      value: `₹${userData.savings.toLocaleString()}`,
      color: "bg-blue-500/10",
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-gray-50">
      <div className="relative text-white p-8 pb-12 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image src="/images/sip-growth-chart.png" alt="SIP Growth Chart" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Header with logout */}
        <div className="relative z-10 flex justify-between items-center mb-8">
          <h1
            className="text-3xl font-bold"
            style={{ fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif" }}
          >
            Finance Setu Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Profile Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-6">User Profile</h2>

            <div className="space-y-6">
              {/* Avatar and Basic Info */}
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserIcon className="h-10 w-10 text-blue-600" />
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Name</p>
                    <p className="text-base font-semibold text-gray-900">{userData.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="text-base font-medium text-gray-700">{userData.email}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date of Joining</p>
                    <p className="text-base font-medium text-gray-700">{userData.dateOfJoining}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Age</p>
                    <p className="text-base font-medium text-gray-700">{userData.age} years</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Occupation</p>
                    <p className="text-base font-medium text-gray-700">{userData.occupation}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Overview Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-6">Financial Overview</h2>

            <div className="space-y-4">
              {financialMetrics.map((metric, index) => (
                <div key={index} className={`${metric.color} rounded-lg p-4`}>
                  <p className="text-xs font-semibold text-gray-600 mb-1">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
