import { supabase } from './supabase'

export interface DiscoveryRoom {
  id: string
  company_name: string
  prospect_name?: string | null
  prospect_email?: string | null
  prospect_title?: string | null
  greeting_message?: string | null
  video_url?: string | null
  theme_color?: string | null
  logo_url?: string | null
  selected_objectives?: string[] | null
  room_status?: string | null
  intake_payload?: Record<string, unknown> | null
  proposal_data?: Record<string, unknown> | null
  internal_notes?: Record<string, unknown> | null
  view_count?: number | null
  unique_viewers?: Record<string, unknown> | null
  last_viewed_at?: string | null
  icp_type?: string | null
  headcount_needed?: number | null
  target_roles?: string[] | null
  contract_type?: string | null
  estimated_value?: number | null
  accepted_at?: string | null
  created_at?: string | null
  updated_at?: string | null
}

export const DiscoveryClient = {
  async getRoom(roomId: string): Promise<DiscoveryRoom | null> {
    const { data, error } = await supabase
      .from('discovery_rooms')
      .select('*')
      .eq('id', roomId)
      .single()
    if (error) return null
    return data as DiscoveryRoom
  },

  async updateRoom(roomId: string, payload: Partial<DiscoveryRoom>): Promise<boolean> {
    const { error } = await supabase
      .from('discovery_rooms')
      .update(payload)
      .eq('id', roomId)
    return !error
  },

  async recordView(roomId: string, viewer?: string): Promise<void> {
    const room = await DiscoveryClient.getRoom(roomId)
    if (!room) return

    const currentCount = room.view_count || 0
    const viewers = (room.unique_viewers || {}) as Record<string, string>
    const viewerKey = viewer || `anon_${Date.now()}`

    if (!viewers[viewerKey]) {
      viewers[viewerKey] = new Date().toISOString()
    }

    await supabase
      .from('discovery_rooms')
      .update({
        view_count: currentCount + 1,
        last_viewed_at: new Date().toISOString(),
        unique_viewers: {
          ...viewers,
          unique_view_count: Object.keys(viewers).length,
        },
      })
      .eq('id', roomId)
  },
}
