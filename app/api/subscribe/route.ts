import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Valid email required' }, { status: 400 })
  }

  const { error } = await supabase
    .from('email_subscribers')
    .insert({ email })

  if (error) {
    if (error.code === '23505') {
      return Response.json({ success: true })
    }
    console.error('[subscribe] Supabase error:', error)
    return Response.json({ error: 'Failed to subscribe' }, { status: 500 })
  }

  return Response.json({ success: true })
}
