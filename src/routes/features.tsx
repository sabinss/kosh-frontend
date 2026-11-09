import { createFileRoute } from '@tanstack/react-router'
import { FeaturesPage } from '@/features/marketing/pages/features-page'

export const Route = createFileRoute('/features')({
  component: FeaturesPage,
})
