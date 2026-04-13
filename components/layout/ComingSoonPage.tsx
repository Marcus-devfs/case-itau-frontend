import { Header } from './Header'

export interface ComingSoonFeature {
  icon: React.ReactNode
  title: string
  description: string
}

interface ComingSoonPageProps {
  title: string
  subtitle: string
  description: string
  features?: ComingSoonFeature[]
}

export function ComingSoonPage({ title, subtitle, description, features }: ComingSoonPageProps) {
  return (
    <main className="flex flex-col min-h-dvh">
      <Header title={title} subtitle={subtitle} />

      <section className="flex-1 px-4 py-6 pb-24 max-w-2xl w-full mx-auto flex flex-col gap-6">
        {/* Hero badge */}
        <div className="flex flex-col items-center text-center pt-4 pb-2 gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-itau-orange/10 text-itau-orange text-xs font-semibold tracking-wide uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-itau-orange animate-pulse" aria-hidden="true" />
            Em breve
          </span>
          <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">{description}</p>
        </div>

        {/* Feature preview cards */}
        {features && features.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide px-1">
              O que vem por aí
            </p>

            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 border border-zinc-100 flex items-start gap-4 opacity-70"
                aria-hidden="true"
              >
                <div className="h-11 w-11 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0 text-zinc-400">
                  {feature.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-600">{feature.title}</p>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{feature.description}</p>
                </div>
                <div className="shrink-0 mt-0.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-400 text-[10px] font-medium border border-zinc-200">
                    Breve
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom illustration */}
        <div className="flex flex-col items-center gap-3 pt-4">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-itau-blue/5 flex items-center justify-center">
              <div className="h-14 w-14 rounded-full bg-itau-blue/10 flex items-center justify-center">
                <svg
                  className="h-7 w-7 text-itau-blue/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-xs text-zinc-400 text-center max-w-[200px] leading-relaxed">
            Estamos trabalhando para trazer a melhor experiência para você.
          </p>
        </div>
      </section>
    </main>
  )
}
