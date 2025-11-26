"use client"
import { Github, Mail } from "lucide-react"
import { motion } from "framer-motion"

type FooterLink = {
  label: string
  href: string
}

type FooterSection = {
  title: string
  links: FooterLink[]
}

type FooterProps = {
  companyName?: string
  tagline?: string
  sections?: FooterSection[]
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
    email?: string
  }
  copyrightText?: string
}

const defaultSections: FooterSection[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Integrations", href: "#integrations" },
      { label: "Pricing", href: "#pricing" },
      { label: "API Docs", href: "#api" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Blog", href: "#blog" },
      { label: "Press Kit", href: "#press" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#docs" },
      { label: "Help Center", href: "#help" },
      { label: "Community", href: "#community" },
      { label: "Case Studies", href: "#case-studies" },
      { label: "Webinars", href: "#webinars" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Security", href: "#security" },
      { label: "Compliance", href: "#compliance" },
      { label: "Cookie Policy", href: "#cookies" },
    ],
  },
]

export const Footer = ({
  companyName = "Finance Setu", // Updated company name from Auralink to Finance Setu
  tagline = "Bridge Between People and Their Finances", // Updated tagline text
  sections = defaultSections,
  socialLinks = {
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    email: "mail.financesetu@gmail.com", // Updated email to Finance Setu's Gmail address
  },
  copyrightText,
}: FooterProps) => {
  const currentYear = new Date().getFullYear()
  const copyright = copyrightText || `© ${currentYear} ${companyName}. All rights reserved.`
  return (
    <footer className="w-full bg-[#fafafa] border-t border-[#e5e5e5]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Main Footer Content */}
        <div className="mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="mb-4">
              <h3
                className="text-xl sm:text-2xl font-semibold text-[#202020] mb-2"
                style={{
                  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
                  fontWeight: "700",
                  letterSpacing: "-0.02em",
                }}
              >
                {companyName}
              </h3>
              <p
                className="text-sm leading-relaxed text-[#666666] max-w-xs"
                style={{
                  fontFamily: "var(--font-figtree), Figtree",
                  lineHeight: "1.5",
                }}
              >
                {tagline}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-4 sm:mt-6">
              {socialLinks.github && (
                <a
                  href={socialLinks.github}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#e5e5e5] text-[#666666] hover:text-[#202020] hover:border-[#202020] transition-colors duration-150"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {socialLinks.email && (
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${socialLinks.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#e5e5e5] text-[#666666] hover:text-[#202020] hover:border-[#202020] transition-colors duration-150"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pt-6 sm:pt-8 border-t border-[#e5e5e5]"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-center md:text-left">
            <p className="text-xs sm:text-sm text-[#666666]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              {copyright}
            </p>
            <p className="text-xs sm:text-sm text-[#666666]" style={{ fontFamily: "var(--font-figtree), Figtree" }}>
              *Prototype project for Mumbai Hacks.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
