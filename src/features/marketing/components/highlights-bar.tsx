import { Check } from 'lucide-react'
import { highlights } from '../data/marketing-content'

export function HighlightsBar() {
  return (
    <section className="border-b bg-card">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-5 px-6 py-6 md:px-10">
        {highlights.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Check className="h-4 w-4 text-primary" />
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}
