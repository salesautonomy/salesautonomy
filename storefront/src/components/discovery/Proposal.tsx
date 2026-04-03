'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Check,
  DollarSign,
  Clock,
  Shield,
  ArrowRight,
  Users,
  GraduationCap,
  Building2,
} from 'lucide-react'
import { useMemo } from 'react'
import { OBJECTIVES } from './PainDiscovery'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Auto-Generated Proposal — dynamically built from selected objectives
 *
 * Shows a tailored engagement proposal based on what the prospect selected.
 * Includes pricing tiers, timeline, and guarantees.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface ProposalProps {
  companyName: string
  selectedPainIds: string[]
  themeColor?: string
  contractType?: string
  headcountNeeded?: number
}

const ENGAGEMENT_MODELS = [
  {
    id: 'contract',
    name: 'Contract Placement',
    description: 'Embedded operator on a 3-6 month contract. Full flexibility, zero commitment.',
    icon: Clock,
    includes: [
      'SOF-vetted sales operator',
      'FortyFive Sales Certification',
      'Custom playbook development',
      'Weekly performance reporting',
      'Discovery Room technology access',
    ],
    pricing: 'Bill rate markup (35-50% over base)',
    timeline: '2-3 weeks to placement',
    best: 'Testing the waters or covering a pipeline gap',
  },
  {
    id: 'contract_to_hire',
    name: 'Contract-to-Hire',
    description:
      'Start with a contract, convert to permanent when you\'re ready. Risk-free path to a full-time hire.',
    icon: Users,
    includes: [
      'Everything in Contract, plus:',
      'Conversion fee credited against contract hours',
      '90-day conversion window',
      '12-month replacement guarantee',
      'Ongoing coaching post-conversion',
    ],
    pricing: 'Contract rate + reduced conversion fee (15-20%)',
    timeline: '2-3 weeks to placement',
    best: 'Building a core sales team with zero risk',
    featured: true,
  },
  {
    id: 'direct_hire',
    name: 'Direct Placement',
    description:
      'Skip the contract phase. Fully trained, methodology-certified candidates placed directly into permanent roles.',
    icon: Building2,
    includes: [
      'Full candidate selection process',
      'FortyFive Sales Certification',
      'Custom playbook + Discovery Room setup',
      '12-month replacement guarantee',
      '12 months post-placement coaching',
    ],
    pricing: '20-25% of first-year base salary',
    timeline: '3-5 weeks to placement',
    best: 'You know what you need and want the best',
  },
]

export function Proposal({
  companyName,
  selectedPainIds,
  themeColor = '#D4A853',
}: ProposalProps) {
  const selectedObjectives = useMemo(
    () => OBJECTIVES.filter((o) => selectedPainIds.includes(o.id)),
    [selectedPainIds]
  )

  return (
    <div>
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1.5">
          <FileText size={14} className="text-zinc-400" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            Engagement Proposal
          </span>
        </div>
        <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
          Recommended for {companyName}
        </h2>
        <p className="mx-auto max-w-xl text-sm text-zinc-400">
          Based on the {selectedPainIds.length} challenge{selectedPainIds.length !== 1 ? 's' : ''} you
          identified, here are the engagement models that make sense for your situation.
        </p>
      </div>

      {/* Challenge Summary */}
      {selectedObjectives.length > 0 && (
        <div className="mx-auto mb-10 max-w-2xl rounded-xl border border-zinc-700/50 bg-zinc-800/30 p-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
            Your Identified Challenges
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {selectedObjectives.map((obj) => (
              <div key={obj.id} className="flex items-center gap-2 text-sm text-zinc-300">
                <Check size={14} style={{ color: themeColor }} />
                {obj.title}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Engagement Models */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {ENGAGEMENT_MODELS.map((model, idx) => {
          const Icon = model.icon
          return (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`relative rounded-xl border p-6 ${
                model.featured
                  ? 'border-amber-500/30 bg-amber-950/10'
                  : 'border-zinc-700/50 bg-zinc-800/30'
              }`}
            >
              {model.featured && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-900"
                  style={{ backgroundColor: themeColor }}
                >
                  Recommended
                </div>
              )}
              <Icon
                size={24}
                className="mb-4"
                style={{ color: model.featured ? themeColor : '#a1a1aa' }}
              />
              <h3 className="mb-2 text-lg font-bold text-white">{model.name}</h3>
              <p className="mb-4 text-sm text-zinc-400">{model.description}</p>

              <ul className="mb-5 space-y-2">
                {model.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Check
                      size={14}
                      className="mt-0.5 shrink-0"
                      style={{ color: themeColor }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="space-y-2 border-t border-zinc-700/50 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign size={14} className="text-zinc-500" />
                  <span className="text-zinc-300">{model.pricing}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={14} className="text-zinc-500" />
                  <span className="text-zinc-300">{model.timeline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield size={14} className="text-zinc-500" />
                  <span className="text-zinc-300">{model.best}</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Guarantee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-10 max-w-2xl rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-6 text-center"
      >
        <Shield size={24} className="mx-auto mb-3 text-emerald-400" />
        <h3 className="mb-2 text-lg font-bold text-white">The Sales Autonomy Guarantee</h3>
        <p className="text-sm leading-relaxed text-zinc-300">
          Every placement comes with a <strong>12-month replacement guarantee</strong>. If your
          operator doesn&apos;t work out, we replace them — no questions, no additional fees. We
          stay engaged with you and your new hire for a full year to ensure success.
        </p>
      </motion.div>
    </div>
  )
}
