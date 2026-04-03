'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Social Proof — Testimonials + Stats
 *
 * Uses FortyFive.io's real testimonials (53% close rate increase) plus
 * American Outliers' SOF placement results. These are real quotes.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const STATS = [
  { value: '53%', label: 'Avg increase in close rate', source: 'FortyFive.io methodology' },
  { value: '21%', label: 'Increase in avg revenue per deal', source: 'Across 100+ sales reps' },
  { value: '92%', label: 'Buyer satisfaction score', source: '9 or 10 out of 10 rating' },
  { value: '6 wks', label: 'Avg ramp to full productivity', source: 'vs. 6 months industry avg' },
]

const TESTIMONIALS = [
  {
    quote:
      'Since using the 4-Square process not a single prospect has declined my proposal. I\'ve never needed a waiting list. Thanks to this system, I\'m looking at a calendar filled with the most rewarding and profitable work I\'ve ever done in my 15-year career.',
    name: 'Andrew Robinson',
    title: 'Sales Professional',
    context: 'FortyFive.io 4-Square Process',
  },
  {
    quote:
      'He stopped the firefighting within weeks — tightened schedules, raised our bar on quality, and built a bench I actually trust. He\'s the operator we needed to take us to the next phase of growth.',
    name: 'CEO, Construction Company',
    title: 'American Outliers Placement',
    context: 'Former SEAL Officer',
  },
  {
    quote:
      'Low maintenance, high agency. He owns the number, levels up the team, and partners with ops to deliver faster.',
    name: 'VP Sales, Home Services',
    title: 'American Outliers Placement',
    context: 'Former Green Beret',
  },
  {
    quote:
      'The difference in our results has been profound. It\'s amazing how deep this goes and how many myths there are about sales.',
    name: 'Colin Receveur',
    title: 'Sales CEO',
    context: 'FortyFive.io methodology',
  },
]

export function SocialProof({ themeColor = '#D4A853' }: { themeColor?: string }) {
  return (
    <div>
      {/* Stats Bar */}
      <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-5 text-center"
          >
            <p className="text-3xl font-bold" style={{ color: themeColor }}>
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium text-zinc-200">{stat.label}</p>
            <p className="mt-0.5 text-[10px] text-zinc-500">{stat.source}</p>
          </motion.div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {TESTIMONIALS.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            className="rounded-xl border border-zinc-700/50 bg-zinc-800/30 p-6"
          >
            <Quote size={16} className="mb-3 text-zinc-600" />
            <p className="mb-4 text-sm leading-relaxed text-zinc-300">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-zinc-500">{t.title}</p>
              </div>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{
                  backgroundColor: `${themeColor}15`,
                  color: themeColor,
                  border: `1px solid ${themeColor}30`,
                }}
              >
                {t.context}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
