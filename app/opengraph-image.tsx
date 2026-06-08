import { ImageResponse } from 'next/og'

export const size         = { width: 1200, height: 630 }
export const contentType  = 'image/png'
export const alt          = 'Finvesco International — Where Capital Meets Strategy'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0F1E',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Inset border frame */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            width: 1120,
            height: 550,
            border: '1px solid #1E2A45',
            display: 'flex',
          }}
        />

        {/* Corner accent — top left */}
        <div style={{ position: 'absolute', top: 40, left: 40, width: 32, height: 32, borderTop: '2px solid #C9A84C', borderLeft: '2px solid #C9A84C', display: 'flex' }} />
        {/* Corner accent — top right */}
        <div style={{ position: 'absolute', top: 40, right: 40, width: 32, height: 32, borderTop: '2px solid #C9A84C', borderRight: '2px solid #C9A84C', display: 'flex' }} />
        {/* Corner accent — bottom left */}
        <div style={{ position: 'absolute', bottom: 40, left: 40, width: 32, height: 32, borderBottom: '2px solid #C9A84C', borderLeft: '2px solid #C9A84C', display: 'flex' }} />
        {/* Corner accent — bottom right */}
        <div style={{ position: 'absolute', bottom: 40, right: 40, width: 32, height: 32, borderBottom: '2px solid #C9A84C', borderRight: '2px solid #C9A84C', display: 'flex' }} />

        {/* Top label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 52 }}>
          <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.5)' }} />
          <span style={{
            color: '#C9A84C',
            fontSize: 12,
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
          }}>
            Premium Financial Advisory
          </span>
          <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.5)' }} />
        </div>

        {/* Wordmark */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{
            color: '#F0F2F8',
            fontSize: 104,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            fontFamily: 'Georgia, serif',
            fontWeight: 400,
            lineHeight: 1,
          }}>
            FinVesco
          </span>
          <span style={{
            color: '#C9A84C',
            fontSize: 15,
            letterSpacing: '0.65em',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
            marginTop: 14,
          }}>
            International
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: 64, height: 1, background: 'rgba(201,168,76,0.35)', margin: '40px 0' }} />

        {/* Tagline */}
        <span style={{
          color: '#7A8BAA',
          fontSize: 16,
          letterSpacing: '0.32em',
          fontFamily: 'sans-serif',
          textTransform: 'uppercase',
        }}>
          Where Capital Meets Strategy
        </span>

        {/* URL watermark */}
        <span style={{
          position: 'absolute',
          bottom: 64,
          color: 'rgba(122,139,170,0.45)',
          fontSize: 13,
          letterSpacing: '0.18em',
          fontFamily: 'sans-serif',
        }}>
          finvescoint.com
        </span>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
