'use client'

import { motion } from 'framer-motion'
import { Calculator, TrendingDown, TrendingUp, DollarSign } from 'lucide-react'
import { useState, useMemo } from 'react'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ROI Calculator — "Cost of Bad Hire vs. Sales Autonomy Placement"
 *
 * Shows the financial impact of failed hires versus SA's trained-and-vetted
 * SOF operators. Based on industry data: bad hire costs 1.5-2x salary.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function ROICalculator({ themeColor = '#D4A853' }: { themeColor?: string }) {
  const [baseSalary, setBaseSalary] = useState(85000)
  const [repsNeeded, setRepsNeeded] = useState(2)
  const [expectedQuota, setExpectedQuota] = useState(500000)

  const metrics = useMemo(() => {
    const costOfBadHire = baseSalary * 1.75 // avg 1.5-2x
    const traditionalRampMonths = 6
    const saRampMonths = 2 // SOF operators + FortyFive training
    const monthlyQuota = expectedQuota / 12

    const lostRevenueTraditional = monthlyQuota * traditionalRampMonths * repsNeeded * 0.7 // 70% quota miss during ramp
    const lostRevenueSA = monthlyQuota * saRampMonths * repsNeeded * 0.3 // only 30% miss

    const savingsPerRep = lostRevenueTraditional / repsNeeded - lostRevenueSA / repsNeeded
    const totalSavings = lostRevenueTraditional - lostRevenueSA
    const badHireRisk = costOfBadHire * repsNeeded * 0.4 // 40% of traditional hires fail in year 1
    const totalValue = totalSavings + badHireRisk

    return {
      costOfBadHire: Math.round(costOfBadHire),
      lostRevenueTraditional: Math.round(lostRevenueTraditional),
      lostRevenueSA: Math.round(lostRevenueSA),
      savingsPerRep: Math.round(savingsPerRep),
      totalSavings: Math.round(totalSavings),
      badHireRisk: Math.round(badHireRisk),
      totalValue: Math.round(totalValue),
      rampDelta: traditionalRampMonths - saRampMonths,
    }
  }, [baseSalary, repsNeeded, expectedQuota])

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <div>
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1.5">
          <Calculator size={14} className="text-zinc-400" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
            Business Impact
          </span>
        </div>
        <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
          The Cost of Getting Sales Hiring Wrong
        </h2>
        <p className="mx-auto max-w-xl text-sm text-zinc-400">
          Adjust the sliders to match your situation. See the real cost of traditional
          hiring versus Sales Autonomy&apos;s trained operator model.
        </p>
      </div>

      {/* Sliders */}
      <div className="mx-auto mb-10 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Base Salary
          </label>
          <input
            type="range"
            min={50000}
            max={150000}
            step={5000}
            value={baseSalary}
            onChange={(e) => setBaseSalary(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
          <p className="mt-1 text-center text-sm font-bold text-white">{fmt(baseSalary)}</p>
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Reps Needed
          </label>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={repsNeeded}
            onChange={(e) => setRepsNeeded(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
          <p className="mt-1 text-center text-sm font-bold text-white">{repsNeeded}</p>
        </div>
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Annual Quota / Rep
          </label>
          <input
            type="range"
            min={200000}
            max={2000000}
            step={50000}
            value={expectedQuota}
            onChange={(e) => setExpectedQuota(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
          <p className="mt-1 text-center text-sm font-bold text-white">{fmt(expectedQuota)}</p>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-red-500/20 bg-red-950/20 p-5"
        >
          <TrendingDown size={20} className="mb-3 text-red-400" />
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-red-300">
            Cost of Bad Hire
          </p>
          <p className="text-2xl font-bold text-red-400">{fmt(metrics.costOfBadHire)}</p>
          <p className="mt-1 text-xs text-red-300/60">per failed hire (1.75× salary)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="rounded-xl border border-red-500/20 bg-red-950/20 p-5"
        >
          <TrendingDown size={20} className="mb-3 text-red-400" />
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-red-300">
            Bad Hire Risk (40% fail rate)
          </p>
          <p className="text-2xl font-bold text-red-400">{fmt(metrics.badHireRisk)}</p>
          <p className="mt-1 text-xs text-red-300/60">expected loss from churn</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-5"
        >
          <TrendingUp size={20} className="mb-3 text-emerald-400" />
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
            Faster Ramp Savings
          </p>
          <p className="text-2xl font-bold text-emerald-400">{fmt(metrics.totalSavings)}</p>
          <p className="mt-1 text-xs text-emerald-300/60">{metrics.rampDelta} months faster to full productivity</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border p-5"
          style={{ borderColor: `${themeColor}40`, backgroundColor: `${themeColor}10` }}
        >
          <DollarSign size={20} className="mb-3" style={{ color: themeColor }} />
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: themeColor }}>
            Total Value of SA
          </p>
          <p className="text-2xl font-bold" style={{ color: themeColor }}>{fmt(metrics.totalValue)}</p>
          <p className="mt-1 text-xs text-zinc-400">savings + risk reduction</p>
        </motion.div>
      </div>

      <p className="mt-6 text-center text-[11px] text-zinc-500">
        Based on industry benchmarks: 40% first-year turnover for sales hires (Glassdoor), 
        1.5-2× salary cost of failed hire (SHRM), 6-month avg ramp time (Bridge Group).
      </p>
    </div>
  )
}
