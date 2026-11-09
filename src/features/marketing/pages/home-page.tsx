import { HeroSection } from '../components/hero-section'
import { HighlightsBar } from '../components/highlights-bar'
import { FeatureOverviewSection } from '../components/feature-overview-section'
import { MemberAccessSection } from '../components/member-access-section'
import { MarketingFooter } from '../components/marketing-footer'

export function HomePage() {
  return (
    <div>
      <HeroSection />
      <HighlightsBar />
      <FeatureOverviewSection />
      <MemberAccessSection />
      <MarketingFooter />
    </div>
  )
}
