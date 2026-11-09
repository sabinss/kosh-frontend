import { createFileRoute } from '@tanstack/react-router'
import { MobilePreviewPage } from '@/features/marketing/pages/mobile-preview-page'

export const Route = createFileRoute('/mobile-preview')({
  component: MobilePreviewPage,
})
