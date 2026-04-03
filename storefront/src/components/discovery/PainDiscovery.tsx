'use client'

import { motion } from 'framer-motion'
import {
  Check,
  Compass,
  DollarSign,
  Clock,
  Users,
  Target,
  TrendingUp,
  ShieldCheck,
  Repeat2,
  Zap,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Sales Autonomy — Prospect-Facing Objective Discovery
 *
 * Rewritten from ForGood's philanthropy objectives to sales staffing
 * challenges. Each card maps to a concrete SA capability and represents
 * a conversation prompt the rep can go deep on during the guided session.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface Objective {
  id: string
  icon: React.ElementType
  title: string
  description: string
  category: 'hiring' | 'performance' | 'process' | 'leadership'
}

export const OBJECTIVES: Objective[] = [
  // ── Hiring Friction ───────────────────────────────────────────────────
  {
    id: 'bad_hire_cost',
    icon: DollarSign,
    title: 'Cost of Bad Sales Hires',
    description:
      'Every failed hire costs 1.5–2x their annual salary in lost revenue, ramp time, and team morale damage. You need candidates who stick.',
    category: 'hiring',
  },
  {
    id: 'long_ramp_time',
    icon: Clock,
    title: 'Slow Ramp to Productivity',
    description:
      'Traditional sales hires take 6+ months to reach full productivity. Your pipeline can\'t wait that long.',
    category: 'hiring',
  },
  {
    id: 'talent_scarcity',
    icon: Users,
    title: 'Can\'t Find Qualified Candidates',
    description:
      'The talent market is flooded with résumés but starved of operators — people who can execute under pressure without hand-holding.',
    category: 'hiring',
  },

  // ── Performance ───────────────────────────────────────────────────────
  {
    id: 'inconsistent_results',
    icon: Target,
    title: 'Inconsistent Sales Results',
    description:
      'Your top rep closes 3x more than your bottom rep. You need a system that eliminates the delta and makes every rep a high performer.',
    category: 'performance',
  },
  {
    id: 'quota_attainment',
    icon: TrendingUp,
    title: 'Missed Quota Every Quarter',
    description:
      'Tricks like lowering prices and fake urgency don\'t work. You need operators who can run a proven process and hit the number.',
    category: 'performance',
  },
  {
    id: 'no_methodology',
    icon: Compass,
    title: 'No Repeatable Sales Process',
    description:
      'Your team sells on instinct, not process. Without a repeatable system, every deal is a coin flip and scaling is impossible.',
    category: 'process',
  },

  // ── Process & Leadership ───────────────────────────────────────────────
  {
    id: 'founder_bottleneck',
    icon: Repeat2,
    title: 'Founder is the Sales Bottleneck',
    description:
      'You\'re still the top closer. Every deal runs through you because no one else can sell at your level. That doesn\'t scale.',
    category: 'leadership',
  },
  {
    id: 'trust_gap',
    icon: ShieldCheck,
    title: 'Trust Gap with New Hires',
    description:
      'You\'ve been burned before. Polished résumés that fall apart under pressure. You need people who\'ve been tested in high-stakes environments.',
    category: 'leadership',
  },
  {
    id: 'scaling_team',
    icon: Zap,
    title: 'Scaling from 1 to 5+ Reps',
    description:
      'Going from solo selling to a team requires a different operating system — playbooks, accountability, and leaders who build culture.',
    category: 'leadership',
  },
]

const CATEGORY_LABELS: Record<string, string> = {
  hiring: 'Hiring',
  performance: 'Performance',
  process: 'Process',
  leadership: 'Leadership',
}

interface PainDiscoveryProps {
  companyName: string
  themeColor?: string
  onChange?: (selectedIds: string[]) => void
  externalSelectedIds?: string[]
}

export function PainDiscovery({
  companyName,
  themeColor = '#D4A853',
  onChange,
  externalSelectedIds,
}: PainDiscoveryProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (externalSelectedIds) {
      setSelectedIds(new Set(externalSelectedIds))
    }
  }, [externalSelectedIds])

  const toggleSelection = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
    onChange?.(Array.from(next))
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1.5">
          <Compass size={14} className="text-zinc-400" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            Discovery
          </span>
        </div>
        <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
          What&apos;s holding your sales team back?
        </h2>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          Select the challenges most relevant to {companyName}. This helps us tailor the
          solution and identify the right candidates for your team.
        </p>
      </div>

      {/* Selected count */}
      {selectedIds.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-900 shadow-lg"
            style={{ backgroundColor: themeColor }}
          >
            <Check size={14} />
            {selectedIds.size} selected — your solution is adapting below
          </span>
        </motion.div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {OBJECTIVES.map((obj, idx) => {
          const isSelected = selectedIds.has(obj.id)
          const Icon = obj.icon
          return (
            <motion.button
              key={obj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: idx * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleSelection(obj.id)}
              className={`group relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all duration-300 ${
                isSelected
                  ? 'shadow-lg shadow-amber-900/20'
                  : 'border-zinc-700/50 bg-zinc-800/50 hover:border-zinc-600 hover:shadow-md'
              }`}
              style={
                isSelected
                  ? { borderColor: themeColor, backgroundColor: `${themeColor}12` }
                  : {}
              }
            >
              {/* Selection glow */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, opacity: 0.6 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute left-0 top-0 h-16 w-16 rounded-full"
                  style={{ backgroundColor: themeColor }}
                />
              )}
              <div className="relative z-10 flex items-start gap-3">
                <motion.div
                  animate={
                    isSelected
                      ? { scale: [1, 1.15, 1], rotate: [0, -5, 0] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.3 }}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                    isSelected
                      ? 'text-zinc-900 shadow-md'
                      : 'bg-zinc-700/50 text-zinc-400 group-hover:bg-zinc-700'
                  }`}
                  style={isSelected ? { backgroundColor: themeColor } : {}}
                >
                  <Icon size={18} />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={`text-sm font-semibold leading-tight transition-colors ${
                        isSelected ? 'text-white' : 'text-zinc-200'
                      }`}
                    >
                      {obj.title}
                    </h3>
                    <motion.div
                      animate={
                        isSelected
                          ? { scale: [0, 1.2, 1], opacity: 1 }
                          : { scale: 1, opacity: 1 }
                      }
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                        isSelected
                          ? 'border-transparent'
                          : 'border-zinc-600 bg-zinc-800 group-hover:border-zinc-500'
                      }`}
                      style={isSelected ? { backgroundColor: themeColor } : {}}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1, type: 'spring', stiffness: 500 }}
                        >
                          <Check size={11} className="text-zinc-900" />
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                  <p
                    className={`mt-1 text-xs leading-relaxed transition-colors ${
                      isSelected ? 'text-zinc-300' : 'text-zinc-500'
                    }`}
                  >
                    {obj.description}
                  </p>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Category Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <span key={key} className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
