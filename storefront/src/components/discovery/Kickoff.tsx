'use client'

import { motion } from 'framer-motion'
import { Calendar, Send, ArrowRight } from 'lucide-react'
import { useState } from 'react'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Kickoff Section — Booking + Intake
 *
 * Simple CTA section for booking a strategy call and submitting basic intake.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface KickoffProps {
  companyName: string
  themeColor?: string
  roomId: string
}

export function Kickoff({ companyName, themeColor = '#D4A853', roomId }: KickoffProps) {
  const [form, setForm] = useState({ name: '', email: '', role: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Save to the room's intake_payload
    try {
      const res = await fetch(`/api/rooms/${roomId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intake_payload: form,
          prospect_name: form.name,
          prospect_email: form.email,
          prospect_title: form.role,
        }),
      })
      if (res.ok) setSubmitted(true)
    } catch {
      // Silently handle
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-md rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-10 text-center"
      >
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: themeColor }}
        >
          <Send size={20} className="text-zinc-900" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">We&apos;re on it.</h3>
        <p className="text-sm text-zinc-400">
          Thanks, {form.name.split(' ')[0]}. We&apos;ll have a candidate shortlist and strategy
          memo to you within 48 hours.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Book a Call */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-xl border border-zinc-700/50 bg-zinc-800/30 p-6"
      >
        <Calendar size={24} className="mb-4" style={{ color: themeColor }} />
        <h3 className="mb-2 text-lg font-bold text-white">Book a Strategy Call</h3>
        <p className="mb-5 text-sm text-zinc-400">
          30-minute call to discuss your sales hiring needs, candidate profile, and timeline.
          We&apos;ll walk through the Discovery Room together.
        </p>
        <a
          href="https://calendly.com" // TODO: Replace with actual booking link
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-all hover:brightness-110"
          style={{ backgroundColor: themeColor }}
        >
          Schedule Now
          <ArrowRight size={14} />
        </a>
      </motion.div>

      {/* Quick Intake */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-zinc-700/50 bg-zinc-800/30 p-6"
      >
        <Send size={24} className="mb-4" style={{ color: themeColor }} />
        <h3 className="mb-2 text-lg font-bold text-white">Start the Process</h3>
        <p className="mb-5 text-sm text-zinc-400">
          Submit your details and we&apos;ll begin sourcing candidates immediately.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-amber-500/50"
          />
          <input
            type="email"
            required
            placeholder="Work email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-amber-500/50"
          />
          <input
            type="text"
            placeholder="Your role (e.g. CEO, VP Sales)"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 outline-none focus:border-amber-500/50"
          />
          <button
            type="submit"
            className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-zinc-900 transition-all hover:brightness-110"
            style={{ backgroundColor: themeColor }}
          >
            Get Started →
          </button>
        </form>
      </motion.div>
    </div>
  )
}
