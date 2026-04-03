import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params
  const { data, error } = await supabaseAdmin
    .from('discovery_rooms')
    .select('*')
    .eq('id', roomId)
    .single()

  if (error || !data) {
    return NextResponse.json({ success: false, error: 'Room not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, value: data })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params
  const body = await req.json()

  const { error } = await supabaseAdmin
    .from('discovery_rooms')
    .update(body)
    .eq('id', roomId)

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
