"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, IconContainer } from "@/components/ui/radar-effect";

const useCases = [
  { text: "Write emails",    icon: "📧", detail: "Draft professional emails in seconds. Great for follow-ups, proposals, and customer responses." },
  { text: "Social posts",    icon: "📱", detail: "Describe your product or special and let AI write engaging captions ready to post." },
  { text: "Answer FAQs",     icon: "📋", detail: "Give AI your business info and have it write answers to your most common questions." },
  { text: "Brainstorm ideas",icon: "💡", detail: "Stuck on a promotion, product name, or event theme? AI can generate dozens of ideas instantly." },
  { text: "Summarize docs",  icon: "📄", detail: "Paste in a long article, report, or email thread — AI will give you the key points." },
  { text: "Build checklists",icon: "🗓️", detail: "Ask AI to help you build a weekly task list, onboarding guide, or step-by-step process." },
  { text: "Draft proposals", icon: "✍️", detail: "Turn a few bullet points into a polished proposal or quote in minutes." },
];

const rows = [
  [0, 1, 2],
  [3, 4],
  [5, 6],
];

const delays = [0.2, 0.4, 0.3, 0.5, 0.8, 0.6, 0.7];

export default function SmallBusinessRadar() {
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected !== null ? useCases[selected] : null;

  return (
    <div className="relative flex h-96 w-full flex-col items-center justify-center space-y-4 overflow-hidden">
      {rows.map((row, ri) => (
        <div
          key={ri}
          className="mx-auto w-full"
          style={{ maxWidth: ri === 1 ? "28rem" : "42rem" }}
        >
          <div className="flex w-full items-center justify-center space-x-10 md:justify-between md:space-x-0">
            {row.map((idx) => {
              const uc = useCases[idx];
              const isSelected = selected === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelected(isSelected ? null : idx)}
                  className="focus:outline-none group"
                  aria-pressed={isSelected}
                >
                  <IconContainer
                    delay={delays[idx]}
                    text={uc.text}
                    icon={
                      <span
                        className={`text-2xl transition-transform duration-200 ${isSelected ? "scale-125" : "group-hover:scale-110"}`}
                      >
                        {uc.icon}
                      </span>
                    }
                    selected={isSelected}
                  />
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Detail card */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-4 bottom-14 z-50 mx-auto max-w-sm rounded-xl border border-white/70 bg-white/70 backdrop-blur-xl px-5 py-4 shadow-lg"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0 mt-0.5">{active.icon}</span>
              <div>
                <p className="font-semibold text-brand-navy text-sm mb-1">{active.text}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{active.detail}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="ml-auto shrink-0 text-gray-400 hover:text-gray-600 transition-colors text-lg leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Radar className="absolute -bottom-12" />
      <div
        className="absolute bottom-0 z-[41] h-px w-full"
        style={{ background: "linear-gradient(to right, transparent, rgba(72,185,187,0.4), transparent)" }}
      />
    </div>
  );
}
