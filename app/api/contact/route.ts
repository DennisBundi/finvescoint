import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

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

  const { error: dbError } = await supabase.from('contact_submissions').insert({
    full_name: name,
    email,
    phone:   phone   || null,
    service,
    message: message || null,
  })

  if (dbError) {
    console.error('[contact] Supabase error:', dbError)
    return Response.json({ error: 'Failed to submit enquiry' }, { status: 500 })
  }

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error: notifyError } = await resend.emails.send({
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
    })
    if (notifyError) {
      console.error('[contact] Resend notify error:', JSON.stringify(notifyError))
    }

    const { error: confirmError } = await resend.emails.send({
      from:    FROM_EMAIL,
      to:      email,
      subject: `We've received your enquiry — Finvesco International`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#0A0F1E;color:#F0F2F8;">
          <div style="padding:48px 32px 40px;text-align:center;border-bottom:1px solid #1E2A45;">
            <img src="https://finvescoint.com/logo.png" width="48" height="48" alt="Finvesco International" style="display:inline-block;object-fit:contain;margin-bottom:16px;" />
            <div style="font-size:15px;letter-spacing:0.3em;text-transform:uppercase;color:#F0F2F8;">FinVesco</div>
            <div style="font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:#C9A84C;font-family:Arial,sans-serif;margin-top:4px;">International</div>
          </div>

          <div style="padding:40px 32px;">
            <p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C9A84C;margin:0 0 24px;font-family:Arial,sans-serif;">Enquiry Received</p>
            <h1 style="font-size:26px;font-weight:400;margin:0 0 24px;line-height:1.3;">Thank you, ${name}.</h1>
            <p style="font-size:14px;line-height:1.8;color:#F0F2F8;margin:0 0 16px;">
              We've received your enquiry regarding <strong style="color:#C9A84C;font-weight:400;">${service}</strong>.
            </p>
            <p style="font-size:14px;line-height:1.8;color:#7A8BAA;margin:0 0 32px;">
              A member of our team will review the details and be in touch within 24 hours.
            </p>

            <div style="width:48px;height:1px;background:#C9A84C;margin-bottom:32px;"></div>

            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #1E2A45;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;width:120px;font-family:Arial,sans-serif;">Service</td>
                <td style="padding:10px 0;border-bottom:1px solid #1E2A45;font-size:14px;">${service}</td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding:10px 0;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C9A84C;vertical-align:top;padding-top:16px;font-family:Arial,sans-serif;">Your Message</td>
                <td style="padding:10px 0;font-size:14px;line-height:1.7;padding-top:16px;color:#7A8BAA;">${message.replace(/\n/g, '<br/>')}</td>
              </tr>` : ''}
            </table>
          </div>

          <div style="padding:24px 32px 40px;border-top:1px solid #1E2A45;text-align:center;">
            <p style="font-size:12px;color:#7A8BAA;letter-spacing:0.5px;line-height:1.8;margin:0;">
              Where Capital Meets Strategy<br/>
              <a href="https://finvescoint.com" style="color:#C9A84C;text-decoration:none;">finvescoint.com</a>
            </p>
          </div>
        </div>
      `,
    })
    if (confirmError) {
      console.error('[contact] Resend confirmation error:', JSON.stringify(confirmError))
    }
  }

  return Response.json({ success: true })
}
