'use client'

import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { Lock, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { PainDiscovery } from '@/components/discovery/PainDiscovery'
import { SolutionWalkthrough } from '@/components/discovery/SolutionWalkthrough'
import { SocialProof } from '@/components/discovery/SocialProof'
import { ROICalculator } from '@/components/discovery/ROICalculator'
import { Proposal } from '@/components/discovery/Proposal'
import { Kickoff } from '@/components/discovery/Kickoff'
import { BlueprintPresence } from '@/components/discovery/BlueprintPresence'
import type { DiscoveryRoom } from '@/lib/discovery'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Discovery Room — Prospect-Facing Digital Sales Room
 *
 * Ported from ForGood's 821-line Discovery.tsx, optimized for Sales Autonomy.
 * Dropped: API Sandbox, TransitionDataRoom, BlueprintPreviewSandbox
 * Kept: Pain Discovery, Walkthrough, Social Proof, ROI, Proposal, Presence
 * Added: Staffing-specific content, dark mode, SA branding
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const MILESTONES = [
  { id: 'hero', label: 'Introduction', anchor: '#hero' },
  { id: 'challenges', label: 'Challenges', anchor: '#challenges' },
  { id: 'walkthrough', label: 'Solution', anchor: '#walkthrough' },
  { id: 'proof', label: 'Results', anchor: '#proof' },
  { id: 'roi', label: 'ROI Calculator', anchor: '#roi' },
  { id: 'proposal', label: 'Proposal', anchor: '#proposal' },
  { id: 'kickoff', label: 'Get Started', anchor: '#kickoff' },
]

export default function DiscoveryRoomPage() {
  const params = useParams()
  const roomId = params?.roomId as string

  const [isLoading, setIsLoading] = useState(true)
  const [roomData, setRoomData] = useState<DiscoveryRoom | null>(null)
  const [selectedPains, setSelectedPains] = useState<string[]>([])
  const [activeSection, setActiveSection] = useState('hero')
  const [showTracker, setShowTracker] = useState(false)

  // Email gate state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [isGateVisible, setIsGateVisible] = useState(false)

  // Temporarily treat everyone as admin for demo purposes
  const isAdmin = false

  useEffect(() => {
    if (!roomId) { setIsLoading(false); return }

    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/rooms/${roomId}`)
        const json = await res.json()
        if (json.success && json.value) {
          setRoomData(json.value)
          if (Array.isArray(json.value.selected_objectives) && json.value.selected_objectives.length > 0) {
            setSelectedPains(json.value.selected_objectives)
          }

          // Check for email in query params or session
          const urlParams = new URLSearchParams(window.location.search)
          const queryEmail = urlParams.get('email')
          const sessionEmail = sessionStorage.getItem('sa_viewer')
          const viewer = queryEmail || sessionEmail

          if (viewer?.includes('@')) {
            if (!sessionEmail) sessionStorage.setItem('sa_viewer', viewer)
            setIsAuthenticated(true)
            setIsGateVisible(false)
          } else {
            setIsGateVisible(true)
          }
        }
      } catch (err) {
        console.error('Failed to fetch room:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchRoom()
  }, [roomId])

  // Intersection Observer for section tracking
  useEffect(() => {
    const sectionIds = ['hero', 'challenges', 'walkthrough', 'proof', 'roi', 'proposal', 'kickoff']
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [isLoading])

  // Floating tracker
  useEffect(() => {
    const handleScroll = () => setShowTracker(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Save objective selections back to DB
  useEffect(() => {
    if (selectedPains.length > 0 && roomId) {
      fetch(`/api/rooms/${roomId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selected_objectives: selectedPains }),
      }).catch(() => {})
    }
  }, [selectedPains, roomId])

  // ── Loading ───────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-700 border-t-amber-500" />
      </div>
    )
  }

  if (!roomData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <h1 className="mb-2 text-2xl font-semibold text-white">Room not found</h1>
          <p className="text-zinc-500">This Discovery Room may have been archived or doesn&apos;t exist.</p>
        </motion.div>
      </div>
    )
  }

  // ── Email Gate ───────────────────────────────────────────────────────────
  if (isGateVisible && !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center shadow-xl"
        >
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Lock size={24} />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-white">Private Discovery Room</h2>
          <p className="mb-8 px-4 text-sm text-zinc-400">
            This environment is customized for{' '}
            <span className="font-semibold text-white">{roomData.company_name}</span>.
            Enter your work email to access.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (emailInput?.includes('@')) {
                sessionStorage.setItem('sa_viewer', emailInput)
                setIsAuthenticated(true)
                setIsGateVisible(false)
                // Record view
                fetch(`/api/rooms/${roomId}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ view_count: (roomData.view_count || 0) + 1, last_viewed_at: new Date().toISOString() }),
                }).catch(() => {})
              }
            }}
            className="space-y-4"
          >
            <input
              type="email"
              required
              placeholder="name@company.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-center text-white transition-shadow focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-amber-500 px-6 py-3 font-medium text-zinc-900 transition-colors hover:bg-amber-400"
            >
              View Discovery Room
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  const brand = roomData.theme_color || '#D4A853'

  const walkthroughReady = selectedPains.length > 0
  const visibleMilestones = MILESTONES.map((m) => ({
    ...m,
    disabled: m.id === 'walkthrough' && !walkthroughReady,
  }))

  return (
    <div className="min-h-screen bg-zinc-950" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ═══════ Branded Header ═══════════════════════════════════════════ */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-tight text-white">
              Sales<span style={{ color: brand }}>Autonomy</span>
            </span>
            <span className="font-light text-zinc-600">×</span>
            {roomData.logo_url ? (
              <img
                src={roomData.logo_url}
                alt={roomData.company_name}
                className="h-6 object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            ) : (
              <span className="font-semibold text-zinc-300">{roomData.company_name}</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Private Room
            </span>
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          </div>
        </div>
      </motion.header>

      {/* ═══════ Floating Progress Tracker ═══════════════════════════════ */}
      <AnimatePresence>
        {showTracker && (
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
          >
            <div className="min-w-[180px] space-y-1 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-3 shadow-xl backdrop-blur-lg">
              <p className="mb-1 border-b border-zinc-800 px-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Progress
              </p>
              {visibleMilestones.map((m) =>
                m.disabled ? (
                  <span
                    key={m.id}
                    className="flex cursor-default items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600"
                    title="Select a challenge above to unlock"
                  >
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-700" />
                    {m.label}
                  </span>
                ) : (
                  <a
                    key={m.id}
                    href={m.anchor}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                      activeSection === m.id
                        ? 'bg-white text-zinc-900 shadow-sm'
                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <div
                      className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                        activeSection === m.id ? 'bg-emerald-400' : 'bg-zinc-600'
                      }`}
                    />
                    {m.label}
                  </a>
                )
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ═══════ 1. Hero ══════════════════════════════════════════════════ */}
      <section id="hero" className="relative overflow-hidden">
        {/* Ambient gradient orbs */}
        <div
          className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ backgroundColor: `${brand}08` }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full blur-[100px]"
          style={{ backgroundColor: `${brand}05` }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-6 pb-20 pt-24 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 text-sm font-bold uppercase tracking-[0.3em]"
            style={{ color: brand }}
          >
            Prepared for {roomData.company_name}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Your Path to{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(135deg, ${brand}, ${brand}aa)` }}
            >
              Autonomous
            </span>{' '}
            Sales Growth
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400"
          >
            {roomData.greeting_message ||
              `We've built this private Discovery Room specifically for ${roomData.company_name}. Explore your challenges, see how our trained operators solve them, and review a tailored engagement proposal — all at your pace.`}
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 hidden sm:block"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="mx-auto flex h-10 w-6 items-start justify-center rounded-full border-2 border-zinc-700 p-1.5"
            >
              <div className="h-2.5 w-1.5 rounded-full bg-zinc-500" />
            </motion.div>
          </motion.div>
        </div>

        {/* Video (if present) */}
        {roomData.video_url && (
          <Reveal className="mx-auto max-w-4xl px-6 pb-16" delay={0.3}>
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl ring-1 ring-zinc-800">
              <iframe
                className="h-full w-full"
                src={roomData.video_url}
                title="Welcome Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Reveal>
        )}
      </section>

      {/* ═══════ 2. Challenges / Pain Discovery ══════════════════════════ */}
      <section id="challenges" className="border-t border-zinc-800">
        <Reveal className="mx-auto max-w-4xl px-6 py-20">
          <PainDiscovery
            companyName={roomData.company_name}
            themeColor={brand}
            onChange={setSelectedPains}
            externalSelectedIds={selectedPains}
          />
        </Reveal>
      </section>

      {/* ═══════ 3. Solution Walkthrough (unlocked by selections) ═══════ */}
      {walkthroughReady && (
        <section id="walkthrough" className="border-t border-zinc-800">
          <Reveal className="mx-auto max-w-4xl px-6 py-20">
            <SolutionWalkthrough
              selectedObjectiveIds={selectedPains}
              companyName={roomData.company_name}
              themeColor={brand}
              onRemoveObjective={(id) => setSelectedPains((prev) => prev.filter((p) => p !== id))}
            />
          </Reveal>
        </section>
      )}

      {/* ═══════ 4. Social Proof ═══════════════════════════════════════════ */}
      <section id="proof" className="border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
              Proven Results
            </p>
            <h2 className="mb-10 text-center text-2xl font-bold text-white sm:text-3xl">
              Built on Battle-Tested Frameworks
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <SocialProof themeColor={brand} />
          </Reveal>
        </div>
      </section>

      {/* ═══════ 5. ROI Calculator ══════════════════════════════════════════ */}
      <section id="roi" className="border-t border-zinc-800">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <Reveal>
            <ROICalculator themeColor={brand} />
          </Reveal>
        </div>
      </section>

      {/* ═══════ 6. Engagement Proposal ═════════════════════════════════════ */}
      <section id="proposal" className="border-t border-zinc-800">
        <Reveal className="mx-auto max-w-5xl px-6 py-20">
          <Proposal
            companyName={roomData.company_name}
            selectedPainIds={selectedPains}
            themeColor={brand}
            contractType={roomData.contract_type || undefined}
            headcountNeeded={roomData.headcount_needed || undefined}
          />
        </Reveal>
      </section>

      {/* ═══════ 7. Kickoff ═════════════════════════════════════════════════ */}
      <section id="kickoff" className="border-t border-zinc-800">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <Reveal>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
              Next Steps
            </p>
            <h2 className="mb-3 text-center text-2xl font-bold text-white sm:text-3xl">
              Ready to Start?
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-center text-sm text-zinc-400">
              Book a strategy call or submit your details and we&apos;ll begin sourcing
              candidates from our SOF network immediately.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Kickoff companyName={roomData.company_name} themeColor={brand} roomId={roomId} />
          </Reveal>
        </div>
      </section>

      {/* ═══════ Footer ═════════════════════════════════════════════════════ */}
      <Reveal>
        <footer className="border-t border-zinc-800 py-6">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-xs text-zinc-500">
            <span>
              Powered by <strong className="text-zinc-300">Sales Autonomy</strong> · Confidential
            </span>
            <span>Room {roomId?.slice(0, 8)}…</span>
          </div>
        </footer>
      </Reveal>

      {/* ═══════ Real-Time Presence ══════════════════════════════════════════ */}
      {roomId && (
        <BlueprintPresence
          roomId={roomId}
          activeSection={activeSection}
          isAdmin={isAdmin}
          themeColor={brand}
        />
      )}
    </div>
  )
}
