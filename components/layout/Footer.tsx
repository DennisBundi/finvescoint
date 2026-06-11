import Link from 'next/link'
import Image from 'next/image'

const serviceLinks = [
  { href: '/services/consulting', label: 'Consulting' },
  { href: '/services/investment', label: 'Investment' },
  { href: '/services/branding',   label: 'Branding & Export' },
]

const companyLinks = [
  { href: '/about',   label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-black border-t border-border/50 pt-12 pb-8 md:pt-20 md:pb-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Image src="/logo.png" alt="Finvesco International" width={36} height={36} className="object-contain" />
              <div className="flex flex-col leading-none">
                <span className="font-serif text-lg text-offwhite tracking-widest uppercase">FinVesco</span>
                <span className="font-sans text-[9px] text-gold tracking-[0.35em] uppercase">International</span>
              </div>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Where capital meets strategy. A premier consulting, investment,
              and branding firm serving ambitious businesses globally.
            </p>
            <div className="gold-line mt-8" />
          </div>

          <div>
            <h4 className="text-gold text-xs tracking-[0.4em] uppercase mb-6">Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted text-sm hover:text-offwhite transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold text-xs tracking-[0.4em] uppercase mb-6">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-muted text-sm hover:text-offwhite transition-colors duration-300">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/30 gap-4">
          <p className="text-muted text-xs">
            © {new Date().getFullYear()} Finvesco International. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['LinkedIn', 'Facebook', 'Instagram'].map(s => (
              <a key={s} href="#" target="_blank" rel="noopener noreferrer"
                className="text-muted text-xs hover:text-gold transition-colors duration-300 tracking-wider uppercase">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
