'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { RealtimeChannel } from '@supabase/supabase-js'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Real-Time Presence — Shows when the prospect is actively viewing the room
 *
 * Ported from ForGood with zero changes to the core logic. This component
 * uses Supabase Realtime Presence to track who's viewing what section.
 * Only admin users see the indicator (prospects never see it).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface PresenceData {
  viewer_id: string
  is_admin: boolean
  active_section: string
}

const SECTION_NAMES: Record<string, string> = {
  hero: 'Introduction',
  challenges: 'Challenges',
  walkthrough: 'Solution Process',
  proof: 'Social Proof',
  roi: 'ROI Calculator',
  proposal: 'Proposal',
  kickoff: 'Kickoff / Booking',
}

interface BlueprintPresenceProps {
  roomId: string
  activeSection: string
  isAdmin: boolean
  themeColor?: string
}

export function BlueprintPresence({
  roomId,
  activeSection,
  isAdmin,
  themeColor = '#D4A853',
}: BlueprintPresenceProps) {
  const [prospects, setProspects] = useState<PresenceData[]>([])
  const channelRef = useRef<RealtimeChannel | null>(null)
  const [viewerId] = useState(() => {
    if (typeof window === 'undefined') return `ssr_${Math.random().toString(36).substring(7)}`
    const params = new URLSearchParams(window.location.search)
    return (
      params.get('email') ||
      sessionStorage.getItem('sa_viewer') ||
      `session_${Math.random().toString(36).substring(7)}`
    )
  })

  useEffect(() => {
    if (!roomId) return

    const channel = supabase.channel(`presence:room_${roomId}`, {
      config: { presence: { key: viewerId } },
    })
    channelRef.current = channel

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState<PresenceData>()
        const activeProspects: PresenceData[] = []

        for (const key in state) {
          const arr = state[key]
          if (arr?.[0] && !arr[0].is_admin) {
            activeProspects.push({
              viewer_id: arr[0].viewer_id,
              is_admin: !!arr[0].is_admin,
              active_section: arr[0].active_section || 'hero',
            })
          }
        }

        const unique = Array.from(
          new Map(activeProspects.map((p) => [p.viewer_id, p])).values()
        )
        setProspects(unique)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            viewer_id: viewerId,
            is_admin: isAdmin,
            active_section: activeSection,
          })
        }
      })

    return () => { channel.unsubscribe() }
  }, [roomId, isAdmin, viewerId])

  // Push section updates without reconnecting
  useEffect(() => {
    if (channelRef.current?.state === 'joined') {
      channelRef.current.track({
        viewer_id: viewerId,
        is_admin: isAdmin,
        active_section: activeSection,
      })
    }
  }, [activeSection, viewerId, isAdmin])

  if (!isAdmin || prospects.length === 0 || !prospects[0]) return null

  const first = prospects[0]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        className="pointer-events-none fixed left-1/2 top-20 z-50 -translate-x-1/2"
      >
        <div className="flex items-center gap-3 rounded-full border border-zinc-700 bg-zinc-900/95 px-4 py-2 shadow-lg backdrop-blur-md">
          <div className="relative flex items-center justify-center">
            <div
              className="absolute inset-0 animate-ping rounded-full opacity-25"
              style={{ backgroundColor: themeColor }}
            />
            <Eye size={14} style={{ color: themeColor }} className="relative z-10" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Prospect Viewing:
            </span>
            <span className="text-sm font-medium text-white">
              {SECTION_NAMES[first.active_section] || first.active_section}
            </span>
            {prospects.length > 1 && (
              <span className="ml-1 rounded-full bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold text-zinc-400">
                +{prospects.length - 1}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
