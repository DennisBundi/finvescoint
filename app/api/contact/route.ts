import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)

const TO_EMAIL   = process.env.RESEND_NOTIFICATION_EMAIL ?? 'Bernard@finvescoint.com'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL         ?? 'Finvesco International <noreply@finvescoint.com>'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  const { name, email, phone, service, message } = await request.json()

  if (!name || !email || !service) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const [dbResult, emailResult] = await Promise.allSettled([
    supabase.from('contact_submissions').insert({
      full_name: name,
      email,
      phone:   phone   || null,
      service,
      message: message || null,
    }),
    resend.emails.send({
      from:    FROM_EMAIL,
      to:      TO_EMAIL,
      replyTo: email,
      subject: `New Inquiry — ${service} — Finvesco International`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#0b0e14;color:#f5f0e8;padding:40px 32px;">
          <p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#b8952a;margin:0 0 24px;">New Contact Enquiry</p>
          <h1 style="font-size:28px;font-weight:400;margin:0 0 32px;line-height:1.2;">${service}</h1>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #1e2535;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#b8952a;width:120px;">Name</td>
              <td style="padding:12px 0;border-bottom:1px solid #1e2535;font-size:14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #1e2535;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#b8952a;">Email</td>
              <td style="padding:12px 0;border-bottom:1px solid #1e2535;font-size:14px;"><a href="mailto:${email}" style="color:#d4a843;text-decoration:none;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #1e2535;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#b8952a;">Phone</td>
              <td style="padding:12px 0;border-bottom:1px solid #1e2535;font-size:14px;">${phone}</td>
            </tr>` : ''}
            ${message ? `
            <tr>
              <td style="padding:12px 0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#b8952a;vertical-align:top;padding-top:16px;">Message</td>
              <td style="padding:12px 0;font-size:14px;line-height:1.7;padding-top:16px;">${message.replace(/\n/g, '<br/>')}</td>
            </tr>` : ''}
          </table>
          <p style="margin:32px 0 0;font-size:11px;color:#5a6478;letter-spacing:1px;">Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    }),
  ])

  if (dbResult.status === 'rejected') {
    console.error('[contact] Supabase error:', dbResult.reason)
  }
  if (emailResult.status === 'rejected' || (emailResult.status === 'fulfilled' && emailResult.value.error)) {
    const err = emailResult.status === 'rejected' ? emailResult.reason : emailResult.value.error
    console.error('[contact] Resend error:', JSON.stringify(err))
    return Response.json({ error: 'Failed to send message' }, { status: 500 })
  }

  return Response.json({ success: true })
}
