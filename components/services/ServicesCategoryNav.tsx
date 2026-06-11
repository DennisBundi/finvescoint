'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CATEGORIES = [
  { num: '01', title: 'Consulting',  href: '/services/consulting',  sub: 'Advisory & Financial Planning' },
  { num: '02', title: 'Investment',  href: '/services/investment',  sub: 'Acquisitions & Capital Strategy' },
  { num: '03', title: 'Branding',    href: '/services/branding',    sub: 'Export, Packaging & Advisory' },
]

export default function ServicesCategoryNav() {
  const pathname = usePathname()

  return (
    <div className="border-b border-border bg-navy">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-3">
          {CATEGORIES.map((cat) => {
            const active = pathname === cat.href
            return (
              <Link
                key={cat.href}
                href={cat.href}
                className={`group flex flex-col gap-1 py-6 px-4 border-b-2 transition-all duration-300 ${
                  active
                    ? 'border-gold'
                    : 'border-transparent hover:border-gold/40'
                }`}
              >
                <span className="font-mono text-xs text-gold/50 tracking-widest">{cat.num}</span>
                <span className={`font-serif text-lg md:text-xl transition-colors duration-300 ${active ? 'text-gold' : 'text-offwhite group-hover:text-gold'}`}>
                  {cat.title}
                </span>
                <span className="text-muted text-xs hidden sm:block">{cat.sub}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
