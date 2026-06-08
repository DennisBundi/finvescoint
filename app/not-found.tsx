import Link from 'next/link'
import MagneticButton from '@/components/shared/MagneticButton'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-xs text-gold/40 tracking-[0.4em] uppercase mb-8 block">404</span>
      <div className="w-16 h-px bg-gold/30 mb-10 mx-auto" />
      <h1 className="font-serif text-5xl md:text-7xl text-offwhite italic leading-tight mb-6">
        Page Not Found
      </h1>
      <p className="text-muted text-base max-w-sm leading-relaxed mb-12">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let us take you back to familiar ground.
      </p>
      <MagneticButton className="inline-block">
        <Link href="/" className="btn-primary">
          Back to Home
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </MagneticButton>
    </div>
  )
}
