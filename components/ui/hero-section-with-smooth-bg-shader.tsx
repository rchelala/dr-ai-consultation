'use client'

import { MeshGradient } from "@paper-design/shaders-react"
import { useEffect, useState } from "react"
import Link from "next/link"

interface HeroSectionProps {
  title?: string
  highlightText?: string
  description?: string
  buttonText?: string
  buttonHref?: string
  onButtonClick?: () => void
  secondaryButtonText?: string
  secondaryButtonHref?: string
  colors?: string[]
  distortion?: number
  swirl?: number
  speed?: number
  offsetX?: number
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  buttonClassName?: string
  maxWidth?: string
  veilOpacity?: string
  fontFamily?: string
  fontWeight?: number
}

export function HeroSection({
  title = "AI Doesn't Have to Be",
  highlightText = "Complicated.",
  description = "D & R AI Consultation helps everyday people and small businesses understand, explore, and start using AI — no tech background needed.",
  buttonText = "Start Learning",
  buttonHref = "/what-is-ai",
  onButtonClick,
  secondaryButtonText = "Try AI Now",
  secondaryButtonHref = "/try-ai",
  colors = ["#72b9bb", "#b5d9d9", "#ffd1bd", "#ffebe0", "#8cc5b8", "#c5e8e0"],
  distortion = 0.8,
  swirl = 0.6,
  speed = 0.42,
  offsetX = 0.08,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  maxWidth = "max-w-4xl",
  veilOpacity = "bg-white/30",
  fontFamily = "var(--font-playfair, 'Playfair Display', serif)",
  fontWeight = 700,
}: HeroSectionProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleButtonClick = () => {
    if (onButtonClick) onButtonClick()
  }

  return (
    <section
      className={`relative w-full min-h-screen overflow-hidden flex items-center justify-center ${className}`}
    >
      {/* Shader background */}
      {mounted && (
        <>
          <MeshGradient
            className="absolute inset-0 w-full h-full"
            colors={colors}
            distortion={distortion}
            swirl={swirl}
            grainMixer={0}
            grainOverlay={0}
            speed={speed}
            offsetX={offsetX}
          />
          <div className={`absolute inset-0 pointer-events-none ${veilOpacity}`} />
        </>
      )}

      {/* Content */}
      <div className={`relative z-10 ${maxWidth} mx-auto px-6 w-full py-24`}>
        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-5 text-brand-navy/60">
            Your Guide to Understanding AI
          </p>
          <h1
            className={`font-bold text-brand-navy text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 ${titleClassName}`}
            style={{ fontFamily, fontWeight }}
          >
            {title}{" "}
            <em className="not-italic" style={{ color: "var(--color-brand-purple, #2a6b70)" }}>
              {highlightText}
            </em>
          </h1>
          <p
            className={`text-lg sm:text-xl text-brand-navy/75 text-pretty max-w-2xl mx-auto leading-relaxed mb-10 px-4 ${descriptionClassName}`}
          >
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {onButtonClick ? (
              <button
                onClick={handleButtonClick}
                className={`px-8 py-4 rounded-full bg-brand-navy text-white font-semibold text-base hover:bg-brand-navy/90 transition-colors shadow-md ${buttonClassName}`}
              >
                {buttonText}
              </button>
            ) : (
              <Link
                href={buttonHref}
                className={`px-8 py-4 rounded-full bg-brand-navy text-white font-semibold text-base hover:bg-brand-navy/90 transition-colors shadow-md ${buttonClassName}`}
              >
                {buttonText}
              </Link>
            )}
            {secondaryButtonText && secondaryButtonHref && (
              <Link
                href={secondaryButtonHref}
                className="px-8 py-4 rounded-full border-2 border-brand-navy/30 text-brand-navy font-semibold text-base hover:border-brand-purple hover:text-brand-purple transition-colors"
              >
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-40">
        <div className="w-6 h-10 rounded-full border-2 border-brand-navy flex items-start justify-center pt-2">
          <div className="w-1 h-2 bg-brand-navy rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
