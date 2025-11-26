"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, User, DollarSign, Target, ArrowLeft, Check } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()

  // Load data from localStorage or use defaults
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [occupation, setOccupation] = useState("")
  const [income, setIncome] = useState("")
  const [expenses, setExpenses] = useState("")
  const [savings, setSavings] = useState("")
  const [majorAssets, setMajorAssets] = useState("")
  const [majorAssetsValue, setMajorAssetsValue] = useState("")
  const [familySupport, setFamilySupport] = useState("")
  const [hasInvested, setHasInvested] = useState("")
  const [investmentTypes, setInvestmentTypes] = useState<string[]>([])
  const [longTermGoal, setLongTermGoal] = useState("")
  const [longTermAmount, setLongTermAmount] = useState("")
  const [shortTermGoal, setShortTermGoal] = useState("")
  const [shortTermAmount, setShortTermAmount] = useState("")
  const [lifePlanning, setLifePlanning] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [showSaved, setShowSaved] = useState(false)

  const occupationOptions = ["Salaried", "Business Owner", "Freelancer", "Student", "Retired", "Other"]

  const investmentTypeOptions = [
    "Stocks",
    "Mutual Funds",
    "Real Estate",
    "Crypto",
    "Gold",
    "Fixed Deposits",
    "Bonds",
    "Others",
  ]

  // Load data on mount
  useEffect(() => {
    const loadedData = localStorage.getItem("onboardingData")
    if (loadedData) {
      const data = JSON.parse(loadedData)
      setName(data.name || "")
      setAge(data.age || "")
      setOccupation(data.occupation || "")
      setIncome(data.income || "")
      setExpenses(data.expenses || "")
      setSavings(data.nonPerformingAssetsValue || "")
      setMajorAssets(data.majorAssets || "")
      setMajorAssetsValue(data.majorAssetsValue || "")
      setFamilySupport(data.familySupport || "")
      setHasInvested(data.hasInvested || "")
      setInvestmentTypes(data.investmentTypes || [])
      setLongTermGoal(data.longTermGoal || "")
      setLongTermAmount(data.longTermAmount || "")
      setShortTermGoal(data.shortTermGoal || "")
      setShortTermAmount(data.shortTermAmount || "")
      setLifePlanning(data.lifePlanning || "")
    }
  }, [])

  const handleSave = () => {
    setIsSaving(true)

    const updatedData = {
      name,
      age,
      occupation,
      income,
      expenses,
      nonPerformingAssetsValue: savings,
      majorAssets,
      majorAssetsValue,
      familySupport,
      hasInvested,
      investmentTypes,
      longTermGoal,
      longTermAmount,
      shortTermGoal,
      shortTermAmount,
      lifePlanning,
    }

    localStorage.setItem("onboardingData", JSON.stringify(updatedData))

    setTimeout(() => {
      setIsSaving(false)
      setShowSaved(true)
      setTimeout(() => setShowSaved(false), 2000)
    }, 500)
  }

  const toggleInvestmentType = (type: string) => {
    if (investmentTypes.includes(type)) {
      setInvestmentTypes(investmentTypes.filter((t) => t !== type))
    } else {
      setInvestmentTypes([...investmentTypes, type])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Settings</h1>
          </div>
          <p className="text-gray-600 text-lg">Update your personal and financial information</p>
        </div>

        {/* Save Button - Fixed */}
        <div className="fixed top-6 right-6 z-50">
          <motion.button
            onClick={handleSave}
            disabled={isSaving || showSaved}
            className={`px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2 transition-all ${
              showSaved ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showSaved ? (
              <>
                <Check className="h-5 w-5" />
                Saved!
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                {isSaving ? "Saving..." : "Save Changes"}
              </>
            )}
          </motion.button>
        </div>

        <div className="space-y-6">
          {/* Personal Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Your age"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Occupation</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {occupationOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setOccupation(option)}
                      className={`p-3 rounded-xl font-medium transition-all text-sm ${
                        occupation === option
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Financial Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Financial Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Income <span className="text-gray-400 font-normal">(per month)</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-900 text-white rounded-lg px-3 py-3 font-bold text-lg">₹</div>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="Amount"
                    className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none transition-colors font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Expenses <span className="text-gray-400 font-normal">(per month)</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-900 text-white rounded-lg px-3 py-3 font-bold text-lg">₹</div>
                  <input
                    type="number"
                    value={expenses}
                    onChange={(e) => setExpenses(e.target.value)}
                    placeholder="Amount"
                    className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none transition-colors font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Savings <span className="text-gray-400 font-normal">(per month)</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="bg-gray-900 text-white rounded-lg px-3 py-3 font-bold text-lg">₹</div>
                  <input
                    type="number"
                    value={savings}
                    onChange={(e) => setSavings(e.target.value)}
                    placeholder="Amount"
                    className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none transition-colors font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Major Assets <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={majorAssets}
                  onChange={(e) => setMajorAssets(e.target.value)}
                  placeholder="e.g., House, Land"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none transition-colors mb-2"
                />
                <div className="flex items-center gap-2">
                  <div className="bg-gray-900 text-white rounded-lg px-3 py-3 font-bold text-lg">₹</div>
                  <input
                    type="number"
                    value={majorAssetsValue}
                    onChange={(e) => setMajorAssetsValue(e.target.value)}
                    placeholder="Approx. Value"
                    className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none transition-colors font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Investment Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Have you invested before?</label>
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setHasInvested("Yes")}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    hasInvested === "Yes" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setHasInvested("No")}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    hasInvested === "No" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  No
                </button>
              </div>

              {hasInvested === "Yes" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Investment Types</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {investmentTypeOptions.map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleInvestmentType(type)}
                        className={`py-2 px-3 rounded-lg font-medium transition-all text-sm ${
                          investmentTypes.includes(type)
                            ? "bg-blue-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Family Support */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Do you have any family support financially?
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setFamilySupport("Yes")}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    familySupport === "Yes" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setFamilySupport("No")}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    familySupport === "No" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          </motion.div>

          {/* Goals Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Financial Goals</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Long-term Goal</label>
                <input
                  type="text"
                  value={longTermGoal}
                  onChange={(e) => setLongTermGoal(e.target.value)}
                  placeholder="e.g., Buy a house"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none transition-colors mb-2"
                />
                <div className="flex items-center gap-2">
                  <div className="bg-gray-900 text-white rounded-lg px-3 py-2 font-bold text-base">₹</div>
                  <input
                    type="number"
                    value={longTermAmount}
                    onChange={(e) => setLongTermAmount(e.target.value)}
                    placeholder="Amount"
                    className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none transition-colors font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Short-term Goal</label>
                <input
                  type="text"
                  value={shortTermGoal}
                  onChange={(e) => setShortTermGoal(e.target.value)}
                  placeholder="e.g., Save for vacation"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none transition-colors mb-2"
                />
                <div className="flex items-center gap-2">
                  <div className="bg-gray-900 text-white rounded-lg px-3 py-2 font-bold text-base">₹</div>
                  <input
                    type="number"
                    value={shortTermAmount}
                    onChange={(e) => setShortTermAmount(e.target.value)}
                    placeholder="Amount"
                    className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none transition-colors font-semibold"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your approach to life planning and money management
              </label>
              <textarea
                value={lifePlanning}
                onChange={(e) => setLifePlanning(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  )
}
