"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
type CaseStudy = {
  id: string
  company: string
  logo: React.ReactNode
  title: string
  features: string[]
  quote: string
  attribution: string
  accentColor: string
  cards: {
    type: "slack" | "meeting" | "sentiment" | "notion" | "stripe" | "figma"
    delay: number
    zIndex: number
  }[]
}
const caseStudies: CaseStudy[] = [
  {
    id: "notion",
    company: "Clandestine",
    logo: <svg fill="none" height="48" viewBox="0 0 38 48" width="38" xmlns="http://www.w3.org/2000/svg"></svg>,
    title: "Setu ask you about your financial personality to understand you better as your financial friend",
    features: ["Ask Setu", "Financial Summary", "Personalized finances"],
    quote: "Setu give answers based on your financial goals/personality to give you the most out of you",
    attribution: "Marie Chen, Head of Operations, Clandestine",
    accentColor: "#16b364",
    cards: [
      {
        type: "notion",
        delay: 0,
        zIndex: 1,
      },
      {
        type: "slack",
        delay: 0.1,
        zIndex: 2,
      },
    ],
  },
  {
    id: "cloudwatch",
    company: "Cloudwatch",
    logo: (
      <svg fill="none" height="48" viewBox="0 0 192 48" width="192" xmlns="http://www.w3.org/2000/svg">
        <filter
          id="a"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="54"
          width="48"
          x="0"
          y="-3"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="-3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="shape" mode="normal" result="effect1_innerShadow_3046_38742" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend in2="effect1_innerShadow_3046_38742" mode="normal" result="effect2_innerShadow_3046_38742" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feMorphology in="SourceAlpha" operator="erode" radius="1" result="effect3_innerShadow_3046_38742" />
          <feOffset />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.24 0" />
          <feBlend in2="effect2_innerShadow_3046_38742" mode="normal" result="effect3_innerShadow_3046_38742" />
        </filter>
        <g filter="url(#a)">
          <rect fill="url(#b)" height="48" rx="12" width="48" />
        </g>
        <g clipPath="url(#c)">
          <path
            d="m23.9995 14.25c5.3848 0 9.7505 4.3658 9.7505 9.7506s-4.3657 9.7505-9.7505 9.7505-9.7506-4.3657-9.7506-9.7505 4.3658-9.7506 9.7506-9.7506z"
            fill="#fff"
          />
          <path d="m23.9995 18.0005c-3.3137 0-6 2.6863-6 6s2.6863 6 6 6 6-2.6863 6-6-2.6863-6-6-6z" fill="url(#d)" />
        </g>
        <text fill="currentColor" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="600" x="58" y="32">
          Cloudwatch
        </text>
        <defs>
          <linearGradient id="b" gradientUnits="userSpaceOnUse" x1="24" x2="24" y1="0" y2="48">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="d" gradientUnits="userSpaceOnUse" x1="23.9995" x2="23.9995" y1="18.0005" y2="30.0005">
            <stop stopColor="#60a5fa" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
          <clipPath id="c">
            <rect fill="#fff" height="36" rx="6" width="36" x="6" y="6" />
          </clipPath>
        </defs>
      </svg>
    ),
    title: "Conversations with Setu get converted into detailed financial reports",
    features: ["Ask Setu", "Financial Summary", "Personalized finances"],
    quote:
      "All your conversations with Setu get converted into a detailed smart financial summary which you can refer back anytime",
    attribution: "Sarah Chen, VP Engineering, Cloudwatch",
    accentColor: "#3b82f6",
    cards: [
      {
        type: "stripe",
        delay: 0,
        zIndex: 1,
      },
      {
        type: "slack",
        delay: 0.1,
        zIndex: 2,
      },
    ],
  },
  {
    id: "coreos",
    company: "CoreOS",
    logo: (
      <svg fill="none" height="48" viewBox="0 0 155 48" width="155" xmlns="http://www.w3.org/2000/svg">
        <filter
          id="a"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="54"
          width="48"
          x="0"
          y="-3"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="-3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="shape" mode="normal" result="effect1_innerShadow_3046_38745" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend in2="effect1_innerShadow_3046_38745" mode="normal" result="effect2_innerShadow_3046_38745" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feMorphology in="SourceAlpha" operator="erode" radius="1" result="effect3_innerShadow_3046_38745" />
          <feOffset />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.24 0" />
          <feBlend in2="effect2_innerShadow_3046_38745" mode="normal" result="effect3_innerShadow_3046_38745" />
        </filter>
        <filter
          id="b"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="42"
          width="37.5"
          x="5.25"
          y="5.25"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="0.375" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_innerShadow_3046_38745" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1.5" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
          <feBlend in2="effect1_innerShadow_3046_38745" mode="normal" result="effect2_innerShadow_3046_38745" />
        </filter>
        <g filter="url(#a)">
          <rect fill="#101828" height="48" rx="12" width="48" />
        </g>
        <g filter="url(#b)">
          <path d="m24 6c-4.28696 0-8.11479 1.94663-10.66502 5.00196-.28444.34056-.07907.8481.36214.8481h2.30574c.2313 0 .44848-.10604.59314-.28956 1.8933-2.39892 4.7914-3.93296 8.01874-3.93296 2.0486 0 3.9438.60814 5.5313 1.6523.1969.1296.4546.1263.648-.0083l1.4976-1.04256c.3563-.24804.2998-.80964-.1033-1.01724-2.0652-1.06164-4.4124-1.66192-6.8911-1.66192zm10.6642 4.999c-.2843-.34042-.7198-.41856-1.0052-.0835l-1.0848 1.2738c-.1631.1915-.2196.4512-.1497.6892.5696 1.93848.8827 3.99358.8827 6.12048 0 2.1271-.3131 4.1822-.8827 6.1207-.0699.238-.0134.4977.1497.6892l1.0848 1.2738c.2854.3351.7209.257 1.98-2.1.88-.52 1.91-.78 3.09-.78 1.8399 0 3.2699.58 4.2899 1.74s1.53 2.86 1.53 5.1v8.4h-3.84v-8.04c0-1.28-.26-2.26-.78-2.94s-1.3299-1.02-2.4299-10.11c-1.08 0-1.89.38-2.67 1.14-.68.76-1.02 1.82-1.02 3.18v7.68z" />
          <path d="m113.945 33.3599c-1.4 0-2.65-.34-3.75-1.02s-1.97-1.61-2.61-2.79-.96-2.52-.96-4.02.32-2.83.96-3.99c.64-1.18 1.51-2.1 2.61-2.76 1.1-.68 2.35-1.02 3.75-10.11h7.92c-.1-.96-.51-1.74-1.23-2.34-.7-.6-1.58-.9-2.64-.9-1.02 0-1.89.3-2.61.9s-1.19 1.38-1.44 2.34z" />
          <path d="m136.364 33.3599c-1.54 0-2.9-.34-4.08-1.02-1.16-.7-2.07-1.64-2.73-2.82-.66-1.2-.99-2.52-.99-3.96s.34-2.77 1.02-3.99c.68-1.22 1.61-2.18 2.79-2.88 1.18-.7 2.52-1.05 4.02-10.11 1.46 0 2.76.34 3.9 1.02 1.14.68 2.03 1.63 2.67 2.85.64 1.2.96 2.58.96 4.14v1.08h-11.7c.12 1.08.57 1.95 1.35 2.61s1.73.99 2.85 .99c.86 0 1.61-.18 2.25-.54.66-.38 1.16-.91 1.5-1.59l3.27 1.44c-.66 1.28-1.66 2.3-3 3.06-1.32.76-2.86 1.14-4.62 1.14zm-3.84-10.11h7.92c-.1-.96-.51-1.74-1.23-2.34-.7-.6-1.58-.9-2.64-.9-1.02 0-1.89.3-2.61.9s-1.19 1.38-1.44 2.34z" />
          <path d="m161.793 35.2199 3.36-7.68-6.78-15.66h4.26l4.38 10.98 4.29-10.98h4.17l-9.81 23.34z" />
          <path d="m166.629 32.9999v-14.88h3.39l.3 2.52c.46-.88 1.12-1.58 1.98-2.1.88-.52 1.91-.78 3.09-.78 1.8399 0 3.2699.58 4.2899 1.74s1.53 2.86 1.53 5.1v8.4h-3.84v-8.04c0-1.28-.26-2.26-.78-2.94s-1.3299-1.02-2.4299-10.11c-1.08 0-1.89.38-2.67 1.14-.68.76-1.02 1.82-1.02 3.18v7.68z" />
          <path d="m190.044 33.3599c-1.54 0-2.9-.34-4.08-1.02-1.16-.7-2.07-1.64-2.73-2.82-.66-1.2-.99-2.52-.99-3.96s.34-2.77 1.02-3.99c.68-1.22 1.61-2.18 2.79-2.88 1.18-.7 2.52-1.05 4.02-10.11 1.46 0 2.76.34 3.9 1.02 1.14.68 2.03 1.63 2.67 2.85.64 1.2.96 2.58.96 4.14v1.08h-11.7c.12 1.08.57 1.95 1.35 2.61s1.73.99 2.85 .99c.86 0 1.61-.18 2.25-.54.66-.38 1.16-.91 1.5-1.59l3.27 1.44c-.66 1.28-1.66 2.3-3 3.06-1.32.76-2.86 1.14-4.62 1.14zm-3.84-10.11h7.92c-.1-.96-.51-1.74-1.23-2.34-.7-.6-1.58-.9-2.64-.9-1.02 0-1.89.3-2.61.9s-1.19 1.38-1.44 2.34z" />
        </g>
      </svg>
    ),
    title: "Setu not only tells you about your finances but teach's you about everything too",
    features: ["Ask Setu", "Financial Summary", "Personalized finances"],
    quote: "Setu helps you learn through YouTube videos and organize your financial plans.",
    attribution: "Noah Levin, VP Engineering, CoreOS",
    accentColor: "#155eef",
    cards: [
      {
        type: "figma",
        delay: 0,
        zIndex: 1,
      },
      {
        type: "meeting",
        delay: 0.1,
        zIndex: 2,
      },
    ],
  },
]
const FeatureBadge = ({
  name,
}: {
  name: string
}) => {
  const getIcon = (featureName: string) => {
    if (featureName.includes("Ask Setu")) {
      return null
    } else if (featureName.includes("Financial Summary")) {
      return null
    } else if (featureName.includes("Personalized finances")) {
      return null
    }
    return null
  }
  return (
    <div className="flex items-center gap-2 bg-white/75 shadow-sm border border-black/5 rounded-lg px-2 py-1 text-sm font-medium text-foreground">
      {getIcon(name)}
      {name}
    </div>
  )
}
const SlackCallCard = ({
  accentColor,
  delay,
  zIndex,
}: {
  accentColor: string
  delay: number
  zIndex: number
}) => {
  return null
}
const MeetingTranscriptCard = ({
  accentColor,
  delay,
  zIndex,
}: {
  accentColor: string
  delay: number
  zIndex: number
}) => {
  return null
}
const SentimentReportCard = ({
  accentColor,
  delay,
  zIndex,
}: {
  accentColor: string
  delay: number
  zIndex: number
}) => {
  return null
}
const NotionCollaborationCard = ({
  accentColor,
  delay,
  zIndex,
}: {
  accentColor: string
  delay: number
  zIndex: number
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
        delay,
      }}
      className="absolute w-[480px] rounded-xl backdrop-blur-xl"
      style={{
        filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15))",
        transform: "translate(-100px, -40px)",
        zIndex,
      }}
    >
      <img
        src="/images/screenshot-202025-11-20-20163735-picsart-aiimageenhancer.png"
        alt="Financial onboarding questions"
        className="w-full h-auto rounded-xl"
      />
    </motion.div>
  )
}

const StripeGlobalCard = ({
  accentColor,
  delay,
  zIndex,
}: {
  accentColor: string
  delay: number
  zIndex: number
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
        delay,
      }}
      className="absolute w-[480px] rounded-xl backdrop-blur-xl"
      style={{
        filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15))",
        transform: "translate(-100px, -40px)",
        zIndex,
      }}
    >
      <img
        src="/images/screenshot-202025-11-20-20163735-picsart-aiimageenhancer.png"
        alt="Financial onboarding questions"
        className="w-full h-auto rounded-xl"
      />
    </motion.div>
  )
}

const FigmaSprintCard = ({
  accentColor,
  delay,
  zIndex,
}: {
  accentColor: string
  delay: number
  zIndex: number
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
        delay,
      }}
      className="absolute w-[480px] rounded-xl backdrop-blur-xl"
      style={{
        filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15))",
        transform: "translate(-100px, -40px)",
        zIndex,
      }}
    >
      <img
        src="/images/screenshot-202025-11-20-20163735-picsart-aiimageenhancer.png"
        alt="Financial onboarding questions"
        className="w-full h-auto rounded-3xl"
      />
    </motion.div>
  )
}

export const CaseStudiesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const currentStudy = caseStudies[currentIndex]
  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(() => {
      nextSlide()
    }, 5000)
  }
  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
  }
  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay()
    } else {
      stopAutoPlay()
    }
    return () => stopAutoPlay()
  }, [isAutoPlaying, currentIndex])
  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length)
  }
  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)
  }
  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center py-24 px-8 relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(69, 163, 217, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(69, 163, 217, 0.08) 1px, transparent 1px),
            linear-gradient(to right, rgba(69, 163, 217, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(69, 163, 217, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px, 24px 24px, 120px 120px, 120px 120px",
          backgroundPosition: "0 0, 0 0, 0 0, 0 0",
          backgroundColor: "#F5F5F5",
        }}
      />

      <div className="max-w-7xl w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1
            className="text-[40px] leading-tight font-normal text-foreground mb-6 tracking-tight"
            style={{
              fontWeight: "700",
              fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
              fontSize: "40px",
              letterSpacing: "-0.02em",
            }}
          >
            Learn and Rewrite Your Finance with Setu
          </h1>
          <p
            className="text-lg leading-relaxed text-muted-foreground max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-figtree), Figtree",
              lineHeight: "1.6",
            }}
          >
            See how you can get help with your finances while learning and get control over your money
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStudy.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  },
                  opacity: {
                    duration: 0.2,
                  },
                }}
                className="space-y-6"
              >
                <h2
                  className="text-4xl font-bold text-foreground leading-tight tracking-tight"
                  style={{
                    fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                    fontWeight: "700",
                    fontSize: "32px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {currentStudy.title}
                </h2>

                <div className="flex flex-wrap gap-2">
                  {currentStudy.features.map((feature, idx) => (
                    <FeatureBadge key={idx} name={feature} />
                  ))}
                </div>

                <blockquote className="border-l-4 border-primary pl-6 py-2">
                  <p
                    className="text-lg leading-relaxed text-foreground/80 italic mb-3"
                    style={{
                      fontFamily: "var(--font-figtree), Figtree",
                      lineHeight: "1.6",
                    }}
                  >
                    "{currentStudy.quote}"
                  </p>
                </blockquote>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                {caseStudies.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
                  aria-label="Previous slide"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M12.5 15L7.5 10L12.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-lg border border-border hover:bg-accent transition-colors"
                  aria-label="Next slide"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M7.5 15L12.5 10L7.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Card Visualization */}
          <div className="relative h-[500px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStudy.id}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {currentStudy.id === "notion" && (
                  <>
                    <NotionCollaborationCard accentColor={currentStudy.accentColor} delay={0} zIndex={1} />
                    <SlackCallCard accentColor={currentStudy.accentColor} delay={0.1} zIndex={2} />
                  </>
                )}
                {currentStudy.id === "cloudwatch" && (
                  <>
                    <StripeGlobalCard accentColor={currentStudy.accentColor} delay={0} zIndex={1} />
                    <SlackCallCard accentColor={currentStudy.accentColor} delay={0.1} zIndex={2} />
                  </>
                )}
                {currentStudy.id === "coreos" && (
                  <>
                    <FigmaSprintCard accentColor={currentStudy.accentColor} delay={0} zIndex={1} />
                    <MeetingTranscriptCard accentColor={currentStudy.accentColor} delay={0.1} zIndex={2} />
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
