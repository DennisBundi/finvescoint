import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const TO_EMAIL   = 'dr.kimathi12@gmail.com'
const FROM_EMAIL = 'Finvesco International <onboarding@resend.dev>'

export async function POST(request: Request) {
  const { name, email, phone, service, message } = await request.json()

  if (!name || !email || !service) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from:    FROM_EMAIL,
    to:      TO_EMAIL,
    replyTo: email,
    subject: `New Enquiry: ${service}`,
    html: `
      <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#0b0e14;color:#f5f0e8;padding:40px 32px;">
        <p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#b8952a;margin:0 0 24px;">New Contact Enquiry</p>
        <h1 style="font-size:28px;font-weight:400;margin:0 0 32px;line-height:1.2;">
          ${service}
        </h1>
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

  if (error) {
    console.error('[contact] Resend error:', error)
    return Response.json({ error: 'Failed to send message' }, { status: 500 })
  }

  return Response.json({ success: true })
}
