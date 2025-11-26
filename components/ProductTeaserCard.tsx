"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

type ProductTeaserCardProps = {
  dailyVolume?: string
  dailyVolumeLabel?: string
  headline?: string
  subheadline?: string
  description?: string
  videoSrc?: string
  posterSrc?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
}

// @component: ProductTeaserCard
export const ProductTeaserCard = (props: ProductTeaserCardProps) => {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  // Removed mode state; authentication will determine navigation

  const {
    dailyVolume = "1,430,992,688",
    dailyVolumeLabel = "DAILY ANALYZED MESSAGES",
    headline = "The Smart Layer Between You and Financial Clarity",
    subheadline = "Setu tackles your toughest money problems—loans, EMIs, investment taxes, startup filings—and explains every step, giving you the knowledge and control you deserve.",
    description = "Trusted by fast-growing teams and enterprises, Auralink powers smarter communication across 1,000+ organizations — with enterprise-grade security, multilingual analysis, and instant emotional detection.",
    videoSrc = "https://cdn.sanity.io/files/1t8iva7t/production/a2cbbed7c998cf93e7ecb6dae75bab42b13139c2.mp4",
    posterSrc = "/images/design-mode/9ad78a5534a46e77bafe116ce1c38172c60dc21a-1069x1068.png",
    primaryButtonText = "Start analyzing",
    primaryButtonHref = "",
    secondaryButtonText = "View API Docs",
    secondaryButtonHref = "",
  } = props

  const handleAuthClick = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const supabase = createClient();

      // Check if user already exists in our user_signup table
      const { data: existingByEmail } = await supabase
        .from("user_signup")
        .select("user_id")
        .eq("email", email.trim())
        .maybeSingle();

      if (existingByEmail) {
        // Existing user: attempt sign-in
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        if (signInError) {
          setError(signInError.message);
          setIsLoading(false);
          return;
        }

        // Record login details
        await supabase.from("login_details").insert({
          user_id: data.user.id,
          login_session_start_time: new Date().toISOString(),
        });

        // Redirect based on onboarding status
        const { data: onboardingData } = await supabase
          .from("user_onboarding_information")
          .select("*")
          .eq("user_id", data.user.id)
          .single();
        if (onboardingData) {
          router.push("/dashboard");
        } else {
          router.push("/onboarding");
        }
      } else {
        // New user: sign-up flow
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
          options: {
            emailRedirectTo:
              process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/onboarding`,
          },
        });
        if (signUpError) {
          setError(signUpError.message);
          setIsLoading(false);
          return;
        }
        // Insert into user_signup table
        await supabase.from("user_signup").insert({
          user_id: data.user.id,
          email: email.trim(),
          signup_method: "email",
          password_hash: "MANAGED_BY_SUPABASE_AUTH",
          user_join_time: new Date().toISOString(),
        });
        // Show confirmation UI
        setShowConfirmation(true);
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError("")

    try {
      const supabase = createClient()

      console.log("[v0] Starting Google OAuth sign-in")

      const redirectUrl = `${window.location.origin}/onboarding`
      console.log("[v0] OAuth redirect URL:", redirectUrl)

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "select_account",
          },
        },
      })

      if (error) {
        console.log("[v0] Google OAuth error:", error.message)
        setError(error.message)
        setIsLoading(false)
        return
      }

      console.log("[v0] Google OAuth initiated successfully")
      // OAuth will redirect, so we keep loading state
    } catch (err: any) {
      console.error("[v0] Error during Google sign-in:", err)
      setError("Failed to initiate Google sign-in. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              ease: [0.645, 0.045, 0.355, 1],
            }}
            className="col-span-1 lg:col-span-6 bg-[#e9e9e9] rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-16 flex flex-col justify-center aspect-square overflow-hidden relative"
          >
            <div
              className="absolute inset-0 opacity-30 pointer-events-none rounded-[32px] sm:rounded-[40px]"
              style={{
                background:
                  "radial-gradient(circle at 100% 50%, rgba(244, 164, 96, 0.4) 0%, rgba(245, 176, 115, 0.25) 25%, rgba(255, 218, 185, 0.15) 50%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            <div className="flex-1 flex flex-col justify-center relative z-10">
              <h1
                className="text-[32px] sm:text-[40px] lg:text-[56px] leading-[1.1] tracking-tight text-[#202020] mb-4 sm:mb-6"
                style={{
                  fontWeight: "700",
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                  letterSpacing: "-0.03em",
                  textShadow: "0 0 40px rgba(244, 164, 96, 0.15), 0 0 80px rgba(245, 176, 115, 0.1)",
                }}
              >
                {headline}
              </h1>

              <p
                className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#404040] max-w-[480px]"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                  fontWeight: "400",
                  lineHeight: "1.6",
                  textShadow: "0 0 30px rgba(244, 164, 96, 0.1)",
                }}
              >
                {subheadline}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0.5,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              ease: [0.645, 0.045, 0.355, 1],
              delay: 0,
            }}
            className="col-span-1 lg:col-span-6 bg-white rounded-[32px] sm:rounded-[40px] flex justify-center items-center aspect-square overflow-hidden"
            style={{
              backgroundImage:
                "url(/images/20251114-1213-indian-20finances-20illustration-remix-01ka0hmddhe0nbgbqdvbmgezcm.png)",
              backgroundSize: "cover",
              backgroundPosition: "center 25%",
              backgroundRepeat: "no-repeat",
              opacity: "1",
            }}
          >
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              poster={posterSrc}
              className="block w-full h-full object-cover"
              style={{
                backgroundImage:
                  "url(https://storage.googleapis.com/storage.magicpath.ai/user/282171029206482944/assets/38855cdf-b40a-445b-a17c-c2bbb35c884e.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                opacity: "1",
                display: "none",
              }}
            />
          </motion.div>
        </div>

        <motion.div
          data-section="get-started"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.645, 0.045, 0.355, 1],
            delay: 0.4,
          }}
          className="mt-4 sm:mt-6 lg:mt-8 bg-white/30 backdrop-blur-xl rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-16 border border-white/40 shadow-lg relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)",
            boxShadow:
              "0 8px 32px rgba(244, 164, 96, 0.15), 0 0 60px rgba(245, 176, 115, 0.1), inset 0 0 80px rgba(255, 218, 185, 0.08)",
          }}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              mixBlendMode: "overlay",
            }}
          />

          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(244, 164, 96, 0.3) 0%, rgba(245, 176, 115, 0.2) 30%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <div
            className="absolute top-0 left-0 right-0 h-24 opacity-40 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%)",
            }}
          />

          <div className="max-w-2xl mx-auto relative z-10">
            {!showConfirmation ? (
              <>
                <h2
                  className="text-xl sm:text-2xl lg:text-3xl font-medium text-[#202020] mb-6 sm:mb-8 text-center"
                  style={{
                    fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                    fontWeight: "600",
                    letterSpacing: "-0.02em",
                    textShadow: "0 0 40px rgba(244, 164, 96, 0.2), 0 0 80px rgba(245, 176, 115, 0.15)",
                  }}
                >
                  Get Started with Finance Setu
                </h2>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full md:w-auto bg-white hover:bg-gray-50 text-[#202020] rounded-lg px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base font-medium flex items-center justify-center gap-2 sm:gap-3 transition-colors duration-200 border border-[#d0d0d0] whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      fontFamily: "var(--font-figtree), Figtree",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17.64 9.20443C17.64 8.56625 17.5827 7.95262 17.4764 7.36353H9V10.8449H13.8436C13.635 11.9699 13.0009 12.9231 12.0477 13.5613V15.8194H14.9564C16.6582 14.2526 17.64 11.9453 17.64 9.20443Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5613C11.2418 14.1013 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8372 3.96409 10.71H0.957275V13.0418C2.43818 15.9831 5.48182 18 9 18Z"
                        fill="#34A853"
                      />
                      <path
                        d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.82999 3.96409 7.28999V4.95819H0.957275C0.347727 6.17318 0 7.54772 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
                        fill="#EA4335"
                      />
                    </svg>
                    Continue with Google
                  </button>

                  <div className="flex items-center gap-3 sm:gap-4 px-2">
                    <div className="hidden md:block w-12 sm:w-16 h-px border-t-2 border-dashed border-[#999999]/50"></div>
                    <span
                      className="text-[#666666] text-xs sm:text-sm font-medium whitespace-nowrap"
                      style={{ fontFamily: "var(--font-figtree), Figtree" }}
                    >
                      OR
                    </span>
                    <div className="hidden md:block w-12 sm:w-16 h-px border-t-2 border-dashed border-[#999999]/50"></div>
                  </div>

                  <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-white text-[#202020] placeholder:text-[#999999] rounded-xl sm:rounded-2xl px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base border border-[#d0d0d0] focus:outline-none focus:border-[#156d95] transition-colors duration-200"
                      style={{
                        fontFamily: "var(--font-figtree), Figtree",
                      }}
                    />

                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-white text-[#202020] placeholder:text-[#999999] rounded-xl sm:rounded-2xl px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base border border-[#d0d0d0] focus:outline-none focus:border-[#156d95] transition-colors duration-200"
                      style={{
                        fontFamily: "var(--font-figtree), Figtree",
                      }}
                    />
                  </div>

                  <button
                    onClick={handleAuthClick}
                    disabled={isLoading}
                    className="bg-[#202020] hover:bg-[#2a2a2a] text-white rounded-xl sm:rounded-2xl px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base font-medium transition-colors duration-200 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      fontFamily: "var(--font-figtree), Figtree",
                    }}
                  >
                    {isLoading ? "Loading..." : "Continue"}
                  </button>
                </div>
            <div className="mt-6 text-center">
              <p
                className="text-sm text-[#666666]"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                }}
              >
                {/* Sign-in/Sign-up toggle removed */}
              </p>
            </div>
          </>
          ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="bg-white rounded-2xl border border-[#e0e0e0] p-6 sm:p-8 max-w-md w-full shadow-sm">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-lg font-semibold text-[#1a1a1a] mb-2"
                    style={{
                      fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                    }}
                  >
                    Check your email to confirm
                  </h3>
                  <p
                    className="text-sm text-[#666666] leading-relaxed"
                    style={{
                      fontFamily: "var(--font-figtree), Figtree",
                    }}
                  >
                    You've successfully signed up. Please check your email to confirm your account before signing in
                    to the Supabase dashboard. The confirmation link expires in 10 minutes.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p
                className="text-sm text-[#666666]"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                }}
              >
                Already confirmed?{" "}
                <button
                  onClick={() => {
                    setShowConfirmation(false)
                  }}
                  className="text-[#202020] font-semibold hover:underline"
                >
                  Sign In Now
                </button>
              </p>
            </div>
          </div>
            )}
      </div>
    </motion.div>
    </section >
  )
}
