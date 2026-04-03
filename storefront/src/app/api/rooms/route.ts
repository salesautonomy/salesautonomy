import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.json()

  if (!body.company_name) {
    return NextResponse.json(
      { success: false, error: 'company_name is required' },
      { status: 400 }
    )
  }

  const { data, error } = await supabaseAdmin
    .from('discovery_rooms')
    .insert([{
      company_name: body.company_name,
      prospect_name: body.prospect_name,
      prospect_email: body.prospect_email,
      prospect_title: body.prospect_title,
      greeting_message: body.greeting_message,
      theme_color: body.theme_color || '#D4A853',
      logo_url: body.logo_url,
      icp_type: body.icp_type || 'growth',
      headcount_needed: body.headcount_needed,
      target_roles: body.target_roles,
      contract_type: body.contract_type || 'contract_to_hire',
      estimated_value: body.estimated_value,
    }])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, value: data }, { status: 201 })
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('discovery_rooms')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, value: data })
}
