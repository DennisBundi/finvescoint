import HeroSection     from '@/components/home/HeroSection'
import StatsBar        from '@/components/home/StatsBar'
import MarqueeSection  from '@/components/home/MarqueeSection'
import PillarsSection  from '@/components/home/PillarsSection'
import PropertySection from '@/components/home/PropertySection'
import ExportSection   from '@/components/home/ExportSection'
import ApproachSection from '@/components/home/ApproachSection'
import CtaSection      from '@/components/home/CtaSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <MarqueeSection />
      <PillarsSection />
      <PropertySection />
      <ExportSection />
      <ApproachSection />
      <CtaSection />
    </>
  )
}
