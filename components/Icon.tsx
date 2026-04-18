import { JSX } from 'react'

const paths: Record<string, JSX.Element> = {
  calendar:     <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  chat:         <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>,
  megaphone:    <><path d="M3 11v3a1 1 0 0 0 1 1h3l4 4V6L7 10H4a1 1 0 0 0-1 1zM15 8a4 4 0 0 1 0 8M18 5a8 8 0 0 1 0 14" /></>,
  barChart:     <><path d="M3 3v18h18M18 17V9M13 17V5M8 17v-3" /></>,
  stethoscope:  <><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" /><circle cx="20" cy="10" r="2" /><path d="M8 15v1a6 6 0 0 0 6 6h0a4 4 0 0 0 4-4v-2" /></>,
  leaf:         <><path d="M11 20A7 7 0 0 1 4 13V6a1 1 0 0 1 1-1h7a7 7 0 0 1 0 14z" /><path d="M2 22c4-4 7-7 14-14" /></>,
  home:         <><path d="M3 12l9-9 9 9M5 10v11h14V10" /></>,
  dumbbell:     <><path d="M14.4 14.4 9.6 9.6M18.6 15 15 18.6M7.8 9 4.2 12.6M4.9 12.7l-2.1 2.1a1.4 1.4 0 0 0 0 2l2.4 2.4a1.4 1.4 0 0 0 2 0l2.1-2.1M12.7 4.9l2.1-2.1a1.4 1.4 0 0 1 2 0l2.4 2.4a1.4 1.4 0 0 1 0 2l-2.1 2.1" /></>,
  mail:         <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></>,
  phone:        <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7 13 13 0 0 0 .7 2.8 2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5 13 13 0 0 0 2.8.7 2 2 0 0 1 1.8 2z" /></>,
  clipboard:    <><rect x="8" y="2" width="8" height="4" rx="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 12h6M9 16h4" /></>,
  lightbulb:    <><path d="M15 14c.2-1 .7-1.7 1.5-2.5A5.5 5.5 0 0 0 12 3a5.5 5.5 0 0 0-4.5 8.5C8.3 12.3 8.8 13 9 14M9 18h6M10 22h4" /></>,
  fileText:     <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></>,
  checkSquare:  <><path d="m9 11 3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
  pen:          <><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></>,
  database:     <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5M3 12a9 3 0 0 0 18 0" /></>,
  wrench:       <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9L5.4 22a2.1 2.1 0 1 1-3-3l10.6-10.6a6 6 0 0 1 7.9-7.9l-3.8 3.8z" /></>,
  sparkles:     <><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" /><path d="M5 3v4M19 17v4M3 5h4M17 19h4" /></>,
  users:        <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
  trendingUp:   <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>,
  arrowRight:   <><path d="M5 12h14M13 5l7 7-7 7" /></>,
  check:        <><polyline points="20 6 9 17 4 12" /></>,
  send:         <><path d="m22 2-7 20-4-9-9-4z" /><path d="M22 2 11 13" /></>,
  shield:       <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
  play:         <><polygon points="5 3 19 12 5 21 5 3" /></>,
  menu:         <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  x:            <><path d="M18 6 6 18M6 6l12 12" /></>,
  smartphone:   <><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></>,
}

interface IconProps {
  name: keyof typeof paths
  size?: number
  className?: string
  style?: React.CSSProperties
}

export default function Icon({ name, size = 24, className = '', style }: IconProps) {
  const content = paths[name]
  if (!content) return null
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`icon ${className}`}
      style={style}
    >
      {content}
    </svg>
  )
}
