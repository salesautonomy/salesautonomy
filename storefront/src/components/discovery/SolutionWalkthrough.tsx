'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  GraduationCap,
  UserCheck,
  HeartHandshake,
  ChevronRight,
  Check,
} from 'lucide-react'
import { useState } from 'react'
import { OBJECTIVES, type Objective } from './PainDiscovery'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Solution Walkthrough — Maps selected pain points to SA's 4-step process
 *
 * SOURCE → TRAIN → PLACE → SUPPORT
 *
 * Dynamically shows how each selected objective is addressed by the process.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface Step {
  id: string
  icon: React.ElementType
  label: string
  title: string
  description: string
  details: string[]
  addressesObjectives: string[]
}

const PROCESS_STEPS: Step[] = [
  {
    id: 'source',
    icon: Search,
    label: '01',
    title: 'Source from the Elite',
    description:
      'We tap into a curated network of former Special Operations leaders — SEALs, Green Berets, Rangers — who bring mission-driven discipline to every role.',
    details: [
      'Curated network of 500+ vetted SOF veterans',
      'Multi-stage behavioral assessments',
      'Culture-fit alignment with your company DNA',
      'Background and reference verification',
    ],
    addressesObjectives: ['talent_scarcity', 'trust_gap', 'bad_hire_cost'],
  },
  {
    id: 'train',
    icon: GraduationCap,
    label: '02',
    title: 'Train on a Proven System',
    description:
      'Every candidate completes the FortyFive Sales Certification — a battle-tested methodology with a 53% average increase in close rate across hundreds of reps.',
    details: [
      'Buyer\'s Action Plan framework (prospect-centric selling)',
      '4-Square diagnostic process for every deal',
      'Custom playbook built from your top performers',
      'Guided Selling technology for consistent execution',
    ],
    addressesObjectives: ['no_methodology', 'inconsistent_results', 'quota_attainment', 'long_ramp_time'],
  },
  {
    id: 'place',
    icon: UserCheck,
    label: '03',
    title: 'Place with Confidence',
    description:
      'Candidates arrive on day one with a proven methodology, your custom playbook, and the discipline to execute. Average ramp time: 6 weeks, not 6 months.',
    details: [
      'Contract-to-hire model eliminates risk',
      'Candidate arrives pre-trained on your playbook',
      'Discovery Room technology for prospect engagement',
      'Direct placement or embedded team options',
    ],
    addressesObjectives: ['founder_bottleneck', 'scaling_team', 'bad_hire_cost', 'long_ramp_time'],
  },
  {
    id: 'support',
    icon: HeartHandshake,
    label: '04',
    title: '12-Month Success Guarantee',
    description:
      'We stay engaged for a full year after placement. Performance tracking, coaching reinforcement, and a replacement guarantee if something isn\'t working.',
    details: [
      '12-month post-placement support',
      'Quarterly performance reviews',
      'Ongoing methodology coaching',
      'Full replacement guarantee',
    ],
    addressesObjectives: ['trust_gap', 'bad_hire_cost', 'inconsistent_results'],
  },
]

interface SolutionWalkthroughProps {
  selectedObjectiveIds: string[]
  companyName: string
  themeColor?: string
  onRemoveObjective?: (id: string) => void
}

export function SolutionWalkthrough({
  selectedObjectiveIds,
  companyName,
  themeColor = '#D4A853',
  onRemoveObjective,
}: SolutionWalkthroughProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>('source')

  const selectedObjectives = OBJECTIVES.filter((o) => selectedObjectiveIds.includes(o.id))

  return (
    <div>
      <div className="mb-8 text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
          Tailored for {companyName}
        </p>
        <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
          How We Solve This
        </h2>
        <p className="mx-auto max-w-xl text-sm text-zinc-400">
          Based on the {selectedObjectiveIds.length} challenges you selected, here&apos;s how
          Sales Autonomy&apos;s 4-step process addresses each one.
        </p>
      </div>

      {/* Selected pills */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {selectedObjectives.map((obj) => (
          <motion.button
            key={obj.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => onRemoveObjective?.(obj.id)}
            className="group flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all hover:border-red-500/30 hover:bg-red-950/20"
            style={{ borderColor: `${themeColor}40`, color: themeColor }}
          >
            <obj.icon size={12} />
            {obj.title}
            <span className="ml-1 text-zinc-500 group-hover:text-red-400">×</span>
          </motion.button>
        ))}
      </div>

      {/* Process Steps */}
      <div className="mx-auto max-w-3xl space-y-3">
        {PROCESS_STEPS.map((step, idx) => {
          const isExpanded = expandedStep === step.id
          const Icon = step.icon
          const matchingObjectives = selectedObjectives.filter((o) =>
            step.addressesObjectives.includes(o.id)
          )

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`rounded-xl border transition-all duration-300 ${
                isExpanded
                  ? 'border-zinc-600 bg-zinc-800/80'
                  : 'border-zinc-700/50 bg-zinc-800/30 hover:border-zinc-600'
              }`}
            >
              <button
                onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                className="flex w-full items-center gap-4 p-5 text-left"
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-zinc-900"
                  style={{ backgroundColor: themeColor }}
                >
                  <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest text-zinc-500">
                      {step.label}
                    </span>
                    <h3 className="text-base font-semibold text-white">{step.title}</h3>
                  </div>
                  {!isExpanded && (
                    <p className="mt-0.5 line-clamp-1 text-sm text-zinc-400">
                      {step.description}
                    </p>
                  )}
                </div>
                {matchingObjectives.length > 0 && (
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold text-zinc-900"
                    style={{ backgroundColor: themeColor }}
                  >
                    {matchingObjectives.length} match{matchingObjectives.length > 1 ? 'es' : ''}
                  </span>
                )}
                <ChevronRight
                  size={16}
                  className={`shrink-0 text-zinc-500 transition-transform ${
                    isExpanded ? 'rotate-90' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-zinc-700/50 px-5 pb-5 pt-4">
                      <p className="mb-4 text-sm leading-relaxed text-zinc-300">
                        {step.description}
                      </p>
                      <ul className="mb-4 space-y-2">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-2 text-sm text-zinc-400">
                            <Check
                              size={14}
                              className="mt-0.5 shrink-0"
                              style={{ color: themeColor }}
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>
                      {matchingObjectives.length > 0 && (
                        <div className="rounded-lg border border-zinc-700/50 bg-zinc-900/50 p-3">
                          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                            Addresses your challenges
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {matchingObjectives.map((obj) => (
                              <span
                                key={obj.id}
                                className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                                style={{
                                  backgroundColor: `${themeColor}15`,
                                  color: themeColor,
                                  border: `1px solid ${themeColor}30`,
                                }}
                              >
                                {obj.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
