import { MARQUEE_ITEMS } from '@/lib/constants'

export default function MarqueeSection() {
  return (
    <section className="py-12 border-y border-border/30 overflow-hidden bg-surface/20">
      <div className="flex gap-0">
        <ul className="flex gap-12 animate-marquee whitespace-nowrap" aria-hidden="true">
          {MARQUEE_ITEMS.map(item => (
            <li key={item} className="flex items-center gap-12">
              <span className="text-muted text-sm tracking-widest uppercase">{item}</span>
              <span className="text-gold text-lg">✦</span>
            </li>
          ))}
        </ul>
        <ul className="flex gap-12 animate-marquee2 whitespace-nowrap" aria-hidden="true">
          {MARQUEE_ITEMS.map(item => (
            <li key={`${item}-2`} className="flex items-center gap-12">
              <span className="text-muted text-sm tracking-widest uppercase">{item}</span>
              <span className="text-gold text-lg">✦</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
