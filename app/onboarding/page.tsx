"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, ArrowRight, User } from "lucide-react"
import Magnet from "@/components/Magnet"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      console.log("[v0] Onboarding - Checking auth, user:", user?.id)

      if (!user) {
        console.log("[v0] Onboarding - No user found, redirecting to home")
        router.push("/")
        return
      }

      setUserId(user.id)
      setUserEmail(user.email || "")

      try {
        // Check if user exists in user_signup table
        const { data: existingUser } = await supabase
          .from("user_signup")
          .select("user_id")
          .eq("user_id", user.id)
          .maybeSingle()

        if (!existingUser) {
          console.log("[v0] Onboarding - Creating user_signup entry for OAuth user")
          // Create user_signup entry for OAuth users
          const { error: signupError } = await supabase.from("user_signup").insert({
            user_id: user.id,
            email: user.email,
            password_hash: "OAUTH_USER",
            created_at: new Date().toISOString(),
          })

          if (signupError) {
            console.error("[v0] Onboarding - Error creating user_signup:", signupError)
          } else {
            console.log("[v0] Onboarding - user_signup entry created successfully")
          }
        }

        // Always create a new login_details entry
        console.log("[v0] Onboarding - Creating login_details entry")
        const { error: loginError } = await supabase.from("login_details").insert({
          user_id: user.id,
          login_time: new Date().toISOString(),
          login_method: user.app_metadata.provider || "email",
        })

        if (loginError) {
          console.error("[v0] Onboarding - Error creating login_details:", loginError)
        } else {
          console.log("[v0] Onboarding - login_details entry created successfully")
        }
      } catch (error) {
        console.error("[v0] Onboarding - Error handling OAuth user:", error)
      }

      // Check if onboarding is already completed
      const { data: onboardingData } = await supabase
        .from("user_onboarding_information")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle()

      if (onboardingData) {
        console.log("[v0] Onboarding - User has already completed onboarding, redirecting to dashboard")
        router.push("/dashboard")
      }
    }

    checkAuth()
  }, [router])

  // Form state
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [occupation, setOccupation] = useState("")
  const [income, setIncome] = useState("")
  const [expenses, setExpenses] = useState("")
  const [majorAssets, setMajorAssets] = useState("")
  const [majorAssetsValue, setMajorAssetsValue] = useState("")
  const [nonPerformingAssets, setNonPerformingAssets] = useState("")
  const [nonPerformingAssetsValue, setNonPerformingAssetsValue] = useState("")
  const [familySupport, setFamilySupport] = useState("")
  const [hasInvested, setHasInvested] = useState("")
  const [investmentTypes, setInvestmentTypes] = useState<string[]>([])
  const [selfInvestment, setSelfInvestment] = useState("")
  const [longTermGoal, setLongTermGoal] = useState("")
  const [longTermAmount, setLongTermAmount] = useState("")
  const [shortTermGoal, setShortTermGoal] = useState("")
  const [shortTermAmount, setShortTermAmount] = useState("")
  const [lifePlanning, setLifePlanning] = useState("")
  const [feedback, setFeedback] = useState("")

  const steps = [
    { id: 1, number: 1, title: "Personal Info", icon: "1" },
    { id: 2, number: 2, title: "Financial Info", icon: "2" },
    { id: 3, number: 3, title: "Financial Goals/Personality", icon: "3" },
    { id: 4, number: 4, title: "Let's Begin", icon: "4" },
  ]

  const occupationOptions = [
    "Student",
    "Working Professional (salaried employee)",
    "Self Employed / Entrepreneur",
    "Retired",
  ]

  const investmentTypeOptions = [
    "Stocks",
    "Precious Metals (Gold or Silver)",
    "FD",
    "Crypto",
    "Digital Gold",
    "Mutual Funds",
    "Real Estate",
    "Business Investment",
  ]

  const toggleInvestmentType = (type: string) => {
    setInvestmentTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const calculateProgress = () => {
    let filledFields = 0
    const totalFields = 11

    if (name.trim()) filledFields++
    if (age.trim()) filledFields++
    if (occupation) filledFields++

    if (income.trim()) filledFields++
    if (expenses.trim()) filledFields++
    if (nonPerformingAssetsValue.trim()) filledFields++

    if (familySupport) filledFields++
    if (hasInvested) filledFields++
    if (longTermGoal.trim() && longTermAmount.trim()) filledFields++
    if (shortTermGoal.trim() && shortTermAmount.trim()) filledFields++
    if (lifePlanning.trim()) filledFields++

    return Math.round((filledFields / totalFields) * 100)
  }

  const progress = calculateProgress()

  useEffect(() => {
    calculateProgress()
  }, [
    name,
    age,
    occupation,
    income,
    expenses,
    nonPerformingAssetsValue,
    majorAssetsValue,
    familySupport,
    hasInvested,
    investmentTypes,
    longTermGoal,
    longTermAmount,
    shortTermGoal,
    shortTermAmount,
    lifePlanning,
  ])

  const canProceedFromStep1 = () => {
    return name.trim() !== "" && age.trim() !== "" && occupation !== ""
  }

  const canProceedFromStep2 = () => {
    return income.trim() !== "" && expenses.trim() !== "" && nonPerformingAssetsValue.trim() !== ""
  }

  const canProceedFromStep3 = () => {
    return (
      familySupport !== "" &&
      hasInvested !== "" &&
      longTermGoal.trim() !== "" &&
      longTermAmount.trim() !== "" &&
      shortTermGoal.trim() !== "" &&
      shortTermAmount.trim() !== "" &&
      lifePlanning.trim() !== ""
    )
  }

  const handleNext = async () => {
    if (currentStep === 1 && !canProceedFromStep1()) return
    if (currentStep === 2 && !canProceedFromStep2()) return
    if (currentStep === 3 && !canProceedFromStep3()) return

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }

    if (currentStep === 3 && userId) {
      setIsLoading(true)
      const supabase = createClient()

      const onboardingData = {
        user_id: userId,
        name,
        age: Number.parseInt(age),
        occupation,
        income_per_month: Number.parseFloat(income),
        expenses_per_month: Number.parseFloat(expenses),
        major_assets: majorAssets,
        major_assets_value: majorAssetsValue ? Number.parseFloat(majorAssetsValue) : null,
        savings_per_month: Number.parseFloat(income) - Number.parseFloat(expenses),
        send_money_to_parents_or_child_education: familySupport === "Yes",
        have_done_investing: hasInvested === "Yes",
        investments_made: investmentTypes,
        invest_money_in_self: selfInvestment === "Yes",
        long_term_financial_goals: longTermGoal,
        long_term_amount: Number.parseFloat(longTermAmount),
        short_term_financial_goals: shortTermGoal,
        short_term_amount: Number.parseFloat(shortTermAmount),
        life_planning_and_money_management: lifePlanning,
        like_onboarding_process: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      console.log("[v0] Inserting onboarding data:", onboardingData)
      const { error } = await supabase.from("user_onboarding_information").insert(onboardingData)

      if (error) {
        console.error("[v0] Error saving onboarding data:", error)
        alert("Error saving your information. Please try again.")
        setIsLoading(false)
        return
      }

      console.log("[v0] Onboarding data saved successfully, redirecting to dashboard")
      setIsLoading(false)
      // Redirect to dashboard after successful save
      router.push("/dashboard")
      return
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Pattern - Same on all devices */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#45A3D9",
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.15) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255,255,255,0.15) 2px, transparent 2px)
          `,
          backgroundSize: "20px 20px, 20px 20px, 100px 100px, 100px 100px",
          backgroundPosition: "0 0, 0 0, 0 0, 0 0",
        }}
      />

      <header className="relative z-20 flex items-center justify-between px-4 sm:px-8 lg:px-12 py-6 lg:py-8">
        <h1
          className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
          style={{ fontFamily: "var(--font-space), Space Grotesk" }}
        >
          Finance Setu
        </h1>

        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-white">
          <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A1A1A]" />
        </div>
      </header>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-[calc(100vh-120px)]">
        <aside className="w-full lg:w-80 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
          {/* Progress Card */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-5 sm:p-6 shadow-xl border border-white/50 mb-8 lg:mb-12"
          >
            <div className="flex items-center justify-between">
              <div>
                <div
                  className="text-5xl sm:text-6xl font-black text-[#1A1A1A] mb-2 tracking-tight"
                  style={{ fontFamily: "var(--font-space), Space Grotesk" }}
                >
                  {progress}%
                </div>
                <p
                  className="text-sm text-[#666666] font-medium"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Profile completion
                </p>
              </div>

              <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                <svg className="w-16 h-16 sm:w-20 sm:h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#e5e5e5"
                    strokeWidth="6"
                    fill="none"
                    className="hidden sm:block"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#e5e5e5"
                    strokeWidth="5"
                    fill="none"
                    className="block sm:hidden"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="#F77F00"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - progress / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-500 hidden sm:block"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#F77F00"
                    strokeWidth="5"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-500 block sm:hidden"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-[#1A1A1A]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Account Setup Steps */}
          <div>
            <h2
              className="text-xs font-bold text-white/90 mb-6 lg:mb-8 tracking-widest uppercase"
              style={{ fontFamily: "var(--font-figtree), Figtree" }}
            >
              Account Setup
            </h2>
            <div className="space-y-2">
              {steps.map((step) => {
                const isActive = step.number === currentStep
                const isCompleted = completedSteps.includes(step.number)
                const isUpcoming = step.number > currentStep

                return (
                  <Magnet key={step.id} padding={80} magnetStrength={3} disabled={!isActive}>
                    <button
                      onClick={() => step.number <= currentStep && setCurrentStep(step.number)}
                      className="flex items-center gap-3 sm:gap-4 w-full text-left group transition-all duration-200"
                      disabled={isUpcoming}
                    >
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold transition-all duration-200 text-sm sm:text-base ${
                          isActive
                            ? "bg-white text-[#45A3D9] shadow-lg"
                            : isCompleted
                              ? "bg-white/90 text-[#45A3D9]"
                              : "bg-white/20 text-white/60 border-2 border-white/30"
                        }`}
                      >
                        {isCompleted && !isActive ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <span>{step.number}</span>
                        )}
                      </div>
                      <span
                        className={`text-sm sm:text-base font-semibold transition-colors duration-200 ${
                          isActive ? "text-white" : isCompleted ? "text-white/90" : "text-white/60"
                        }`}
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        {step.title}
                      </span>
                    </button>
                  </Magnet>
                )
              })}
            </div>
          </div>
        </aside>

        <main className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl"
          >
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 leading-tight tracking-tight"
                  style={{ fontFamily: "var(--font-space), Space Grotesk" }}
                >
                  Personal Information
                </h1>
                <p
                  className="text-lg sm:text-xl text-white/80 mb-8 sm:mb-12 font-normal"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Let's get to know you better
                </p>

                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Name Card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl"
                    >
                      <h3
                        className="text-lg sm:text-xl font-semibold text-[#1A1A1A] mb-4 sm:mb-6 tracking-tight"
                        style={{ fontFamily: "var(--font-space), Space Grotesk" }}
                      >
                        What we can call you?
                      </h3>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full bg-gray-100 border-2 border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-[#1A1A1A] placeholder:text-gray-400 focus:border-[#45A3D9] focus:outline-none transition-colors text-sm sm:text-base font-medium"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </motion.div>

                    {/* Age Card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="bg-[#1A1A1A] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#1A1A1A]"
                    >
                      <h3
                        className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 tracking-tight"
                        style={{ fontFamily: "var(--font-space), Space Grotesk" }}
                      >
                        What's Your age?
                      </h3>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Your age"
                        className="w-full bg-white/10 border-2 border-white/20 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none transition-colors text-base sm:text-lg font-medium"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl"
                  >
                    <h3
                      className="text-lg sm:text-xl font-semibold text-[#1A1A1A] mb-4 sm:mb-6 tracking-tight"
                      style={{ fontFamily: "var(--font-space), Space Grotesk" }}
                    >
                      Select your occupation
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {occupationOptions.map((option, index) => (
                        <button
                          key={option}
                          onClick={() => setOccupation(option)}
                          className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl font-medium transition-all duration-200 ${
                            occupation === option
                              ? "bg-[#1A1A1A] text-white shadow-lg scale-105"
                              : "bg-gray-100 text-[#1A1A1A] hover:bg-gray-200 border-2 border-gray-200"
                          }`}
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs sm:text-sm">{option}</span>
                            {occupation === option && <Check className="w-4 h-4 sm:w-5 sm:h-5" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  <div className="flex justify-end gap-3 sm:gap-4 pt-4 sm:pt-6">
                    <button
                      onClick={handleNext}
                      disabled={!canProceedFromStep1()}
                      className="bg-[#1A1A1A] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:bg-[#333333] transition-all duration-200 shadow-xl flex items-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Next
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Financial Info */}
            {currentStep === 2 && (
              <div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 leading-tight tracking-tight"
                  style={{ fontFamily: "var(--font-space), Space Grotesk" }}
                >
                  Financial Information
                </h1>
                <p
                  className="text-lg sm:text-xl text-white/80 mb-8 sm:mb-12 font-normal"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Help us understand your financial situation
                </p>

                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Income Card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl"
                    >
                      <h3
                        className="text-lg sm:text-xl font-semibold text-[#1A1A1A] mb-2 tracking-tight"
                        style={{ fontFamily: "var(--font-space), Space Grotesk" }}
                      >
                        Total Income
                      </h3>
                      <p
                        className="text-xs text-gray-500 mb-3 sm:mb-4 font-medium"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        *per month
                      </p>
                      <input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        placeholder="₹ 50,000"
                        className="w-full bg-gray-100 border-2 border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-[#1A1A1A] placeholder:text-gray-400 focus:border-[#45A3D9] focus:outline-none transition-colors text-sm sm:text-base font-medium"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </motion.div>

                    {/* Expenses Card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="bg-[#1A1A1A] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#1A1A1A]"
                    >
                      <h3
                        className="text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight"
                        style={{ fontFamily: "var(--font-space), Space Grotesk" }}
                      >
                        Total Expenses
                      </h3>
                      <p
                        className="text-xs text-white/60 mb-3 sm:mb-4 font-medium"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        *per month
                      </p>
                      <input
                        type="number"
                        value={expenses}
                        onChange={(e) => setExpenses(e.target.value)}
                        placeholder="₹ 30,000"
                        className="w-full bg-white/10 border-2 border-white/20 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none transition-colors text-base sm:text-lg font-medium"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl"
                  >
                    <h3
                      className="text-lg sm:text-xl font-semibold text-[#1A1A1A] mb-2 tracking-tight"
                      style={{ fontFamily: "var(--font-space), Space Grotesk" }}
                    >
                      Major Assets
                    </h3>
                    <p
                      className="text-xs text-gray-500 mb-3 sm:mb-4 font-medium"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      (e.g., House, Car, Land, etc.)
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <input
                        type="text"
                        value={majorAssets}
                        onChange={(e) => setMajorAssets(e.target.value)}
                        placeholder="Asset name"
                        className="w-full bg-gray-100 border-2 border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-[#1A1A1A] placeholder:text-gray-400 focus:border-[#45A3D9] focus:outline-none transition-colors text-sm sm:text-base font-medium"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                      <input
                        type="number"
                        value={majorAssetsValue}
                        onChange={(e) => setMajorAssetsValue(e.target.value)}
                        placeholder="₹ Value"
                        className="w-full bg-gray-100 border-2 border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-[#1A1A1A] placeholder:text-gray-400 focus:border-[#45A3D9] focus:outline-none transition-colors text-sm sm:text-base font-medium"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl"
                  >
                    <h3
                      className="text-lg sm:text-xl font-semibold text-[#1A1A1A] mb-2 tracking-tight"
                      style={{ fontFamily: "var(--font-space), Space Grotesk" }}
                    >
                      Non-Performing Assets/Liabilities
                    </h3>
                    <p
                      className="text-xs text-gray-500 mb-3 sm:mb-4 font-medium"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      (e.g., Loans, Credit Card Debt, etc.)
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <input
                        type="text"
                        value={nonPerformingAssets}
                        onChange={(e) => setNonPerformingAssets(e.target.value)}
                        placeholder="Liability name"
                        className="w-full bg-gray-100 border-2 border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-[#1A1A1A] placeholder:text-gray-400 focus:border-[#45A3D9] focus:outline-none transition-colors text-sm sm:text-base font-medium"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                      <input
                        type="number"
                        value={nonPerformingAssetsValue}
                        onChange={(e) => setNonPerformingAssetsValue(e.target.value)}
                        placeholder="₹ Amount"
                        className="w-full bg-gray-100 border-2 border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-[#1A1A1A] placeholder:text-gray-400 focus:border-[#45A3D9] focus:outline-none transition-colors text-sm sm:text-base font-medium"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </div>
                  </motion.div>

                  <div className="flex justify-between gap-3 sm:gap-4 pt-4 sm:pt-6">
                    <button
                      onClick={handlePrevious}
                      className="bg-white text-[#1A1A1A] px-6 sm:px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all duration-200 shadow-xl"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!canProceedFromStep2()}
                      className="bg-[#1A1A1A] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:bg-[#333333] transition-all duration-200 shadow-xl flex items-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Next
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Financial Goals */}
            {currentStep === 3 && (
              <div>
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 leading-tight tracking-tight"
                  style={{ fontFamily: "var(--font-space), Space Grotesk" }}
                >
                  Financial Goals
                </h1>
                <p
                  className="text-lg sm:text-xl text-white/80 mb-8 sm:mb-12 font-normal"
                  style={{ fontFamily: "var(--font-figtree), Figtree" }}
                >
                  Tell us about your financial aspirations
                </p>

                <div className="space-y-4 sm:space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl"
                  >
                    <h3
                      className="text-lg sm:text-xl font-semibold text-[#1A1A1A] mb-4 sm:mb-6 tracking-tight"
                      style={{ fontFamily: "var(--font-space), Space Grotesk" }}
                    >
                      Do you send money to parents or save for child education?
                    </h3>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {["Yes", "No"].map((option) => (
                        <button
                          key={option}
                          onClick={() => setFamilySupport(option)}
                          className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl font-medium transition-all duration-200 ${
                            familySupport === option
                              ? "bg-[#1A1A1A] text-white shadow-lg scale-105"
                              : "bg-gray-100 text-[#1A1A1A] hover:bg-gray-200 border-2 border-gray-200"
                          }`}
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl"
                  >
                    <h3
                      className="text-lg sm:text-xl font-semibold text-[#1A1A1A] mb-4 sm:mb-6 tracking-tight"
                      style={{ fontFamily: "var(--font-space), Space Grotesk" }}
                    >
                      Have you done any investing?
                    </h3>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      {["Yes", "No"].map((option) => (
                        <button
                          key={option}
                          onClick={() => setHasInvested(option)}
                          className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl font-medium transition-all duration-200 ${
                            hasInvested === option
                              ? "bg-[#1A1A1A] text-white shadow-lg scale-105"
                              : "bg-gray-100 text-[#1A1A1A] hover:bg-gray-200 border-2 border-gray-200"
                          }`}
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {hasInvested === "Yes" && (
                      <div>
                        <p
                          className="text-sm text-gray-600 mb-3 font-medium"
                          style={{ fontFamily: "var(--font-figtree), Figtree" }}
                        >
                          Select investment types:
                        </p>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          {investmentTypeOptions.map((type) => (
                            <button
                              key={type}
                              onClick={() => toggleInvestmentType(type)}
                              className={`p-3 sm:p-4 rounded-xl font-medium transition-all duration-200 text-xs sm:text-sm ${
                                investmentTypes.includes(type)
                                  ? "bg-[#1A1A1A] text-white shadow-lg"
                                  : "bg-gray-100 text-[#1A1A1A] hover:bg-gray-200 border-2 border-gray-200"
                              }`}
                              style={{ fontFamily: "var(--font-figtree), Figtree" }}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl"
                    >
                      <h3
                        className="text-lg sm:text-xl font-semibold text-[#1A1A1A] mb-2 tracking-tight"
                        style={{ fontFamily: "var(--font-space), Space Grotesk" }}
                      >
                        Long-term Financial Goal
                      </h3>
                      <p
                        className="text-xs text-gray-500 mb-3 sm:mb-4 font-medium"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        (3+ years)
                      </p>
                      <input
                        type="text"
                        value={longTermGoal}
                        onChange={(e) => setLongTermGoal(e.target.value)}
                        placeholder="e.g., Buy a house"
                        className="w-full bg-gray-100 border-2 border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-[#1A1A1A] placeholder:text-gray-400 focus:border-[#45A3D9] focus:outline-none transition-colors text-sm sm:text-base font-medium mb-3"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                      <input
                        type="number"
                        value={longTermAmount}
                        onChange={(e) => setLongTermAmount(e.target.value)}
                        placeholder="₹ Target amount"
                        className="w-full bg-gray-100 border-2 border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-[#1A1A1A] placeholder:text-gray-400 focus:border-[#45A3D9] focus:outline-none transition-colors text-sm sm:text-base font-medium"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="bg-[#1A1A1A] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#1A1A1A]"
                    >
                      <h3
                        className="text-lg sm:text-xl font-semibold text-white mb-2 tracking-tight"
                        style={{ fontFamily: "var(--font-space), Space Grotesk" }}
                      >
                        Short-term Financial Goal
                      </h3>
                      <p
                        className="text-xs text-white/60 mb-3 sm:mb-4 font-medium"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      >
                        (Less than 3 years)
                      </p>
                      <input
                        type="text"
                        value={shortTermGoal}
                        onChange={(e) => setShortTermGoal(e.target.value)}
                        placeholder="e.g., Emergency fund"
                        className="w-full bg-white/10 border-2 border-white/20 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none transition-colors text-base sm:text-lg font-medium mb-3"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                      <input
                        type="number"
                        value={shortTermAmount}
                        onChange={(e) => setShortTermAmount(e.target.value)}
                        placeholder="₹ Target amount"
                        className="w-full bg-white/10 border-2 border-white/20 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none transition-colors text-base sm:text-lg font-medium"
                        style={{ fontFamily: "var(--font-figtree), Figtree" }}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl"
                  >
                    <h3
                      className="text-lg sm:text-xl font-semibold text-[#1A1A1A] mb-4 sm:mb-6 tracking-tight"
                      style={{ fontFamily: "var(--font-space), Space Grotesk" }}
                    >
                      How do you approach life planning and money management?
                    </h3>
                    <textarea
                      value={lifePlanning}
                      onChange={(e) => setLifePlanning(e.target.value)}
                      placeholder="Share your thoughts..."
                      rows={4}
                      className="w-full bg-gray-100 border-2 border-gray-200 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-[#1A1A1A] placeholder:text-gray-400 focus:border-[#45A3D9] focus:outline-none transition-colors text-sm sm:text-base font-medium resize-none"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    />
                  </motion.div>

                  <div className="flex justify-between gap-3 sm:gap-4 pt-4 sm:pt-6">
                    <button
                      onClick={handlePrevious}
                      className="bg-white text-[#1A1A1A] px-6 sm:px-8 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all duration-200 shadow-xl"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!canProceedFromStep3() || isLoading}
                      className="bg-[#1A1A1A] text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:bg-[#333333] transition-all duration-200 shadow-xl flex items-center gap-2 sm:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      {isLoading ? "Saving..." : "Complete"}
                      {!isLoading && <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Let's Begin (Completion) */}
            {currentStep === 4 && (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl sm:rounded-3xl p-10 sm:p-16 shadow-2xl"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl">
                    <Check className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                  </div>
                  <h1
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#1A1A1A] mb-4 sm:mb-6 leading-tight tracking-tight"
                    style={{ fontFamily: "var(--font-space), Space Grotesk" }}
                  >
                    You're all set!
                  </h1>
                  <p
                    className="text-lg sm:text-xl text-[#666666] mb-8 sm:mb-12 max-w-xl mx-auto font-normal leading-relaxed px-4"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Let's Begin To Easy Your Financial Problem's with Setu.
                  </p>
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="bg-[#1A1A1A] text-white px-10 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-[#333333] transition-all duration-200 shadow-xl flex items-center gap-2 sm:gap-3 mx-auto"
                    style={{ fontFamily: "var(--font-figtree), Figtree" }}
                  >
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
