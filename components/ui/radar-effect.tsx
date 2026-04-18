"use client";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import React from "react";

export const Circle = ({ className, children, idx, ...rest }: any) => {
  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: idx * 0.1, duration: 0.2 }}
      className={twMerge(
        "absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full",
        className
      )}
    />
  );
};

export const Radar = ({ className }: { className?: string }) => {
  const circles = new Array(8).fill(1);
  return (
    <div
      className={twMerge(
        "relative flex h-20 w-20 items-center justify-center rounded-full",
        className
      )}
    >
      <style>{`
        @keyframes radar-spin {
          from { transform: rotate(20deg); }
          to   { transform: rotate(380deg); }
        }
        .animate-radar-spin {
          animation: radar-spin 10s linear infinite;
        }
      `}</style>
      {/* Rotating sweep line */}
      <div
        style={{ transformOrigin: "right center" }}
        className="animate-radar-spin absolute right-1/2 top-1/2 z-40 flex h-[5px] w-[400px] items-end justify-center overflow-hidden bg-transparent"
      >
        <div className="relative z-40 h-[1px] w-full" style={{ background: 'linear-gradient(to right, transparent, #3d9ca3, transparent)' }} />
      </div>
      {/* Concentric circles */}
      {circles.map((_, idx) => (
        <Circle
          style={{
            height: `${(idx + 1) * 5}rem`,
            width: `${(idx + 1) * 5}rem`,
            border: `1px solid rgba(72, 185, 187, ${0.5 - idx * 0.055})`,
          }}
          key={`circle-${idx}`}
          idx={idx}
        />
      ))}
    </div>
  );
};

export const IconContainer = ({
  icon,
  text,
  delay,
  selected,
}: {
  icon?: React.ReactNode;
  text?: string;
  delay?: number;
  selected?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: delay ?? 0 }}
      className="relative z-50 flex flex-col items-center justify-center space-y-2"
    >
      <div
        className={twMerge(
          "flex h-12 w-12 items-center justify-center rounded-2xl bg-white/60 backdrop-blur-xl border shadow-md transition-all duration-200",
          selected
            ? "border-brand-purple ring-2 ring-brand-purple/30 bg-white/80"
            : "border-white/80"
        )}
      >
        {icon}
      </div>
      <div className="rounded-md px-2 py-1">
        <div
          className={twMerge(
            "text-center text-xs font-semibold leading-tight max-w-[80px] transition-colors duration-200",
            selected ? "text-brand-purple" : "text-brand-navy/70"
          )}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
};
