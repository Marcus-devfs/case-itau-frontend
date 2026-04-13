import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'Início',
  description: 'Sua área logada do banco digital Itaú.',
}

const quickActions = [
  {
    href: '/produtos',
    label: 'Meus Produtos',
    description: 'Gerencie cartões, contas e investimentos',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
    color: 'bg-orange-100 text-orange-600',
    available: true,
  },
  {
    href: '/extrato',
    label: 'Extrato',
    description: 'Histórico de movimentações',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
    color: 'bg-blue-100 text-blue-600',
    available: false,
  },
  {
    href: '/perfil',
    label: 'Perfil',
    description: 'Dados e preferências',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    color: 'bg-teal-100 text-teal-600',
    available: false,
  },
]

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-dvh">
      <Header title="Olá, Marcus" subtitle="Bem-vindo de volta ao Itaú" />

      <section className="flex-1 px-4 py-6 pb-24 max-w-2xl w-full mx-auto flex flex-col gap-6">

        {/* Balance card */}
        <div className="bg-itau-blue rounded-2xl p-5 text-white relative overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5"
          />
          <div
            aria-hidden="true"
            className="absolute -right-2 top-8 h-20 w-20 rounded-full bg-white/5"
          />
          <p className="text-xs font-medium text-white/60 uppercase tracking-wide">
            Saldo disponível
          </p>
          <p className="text-3xl font-bold mt-1 tracking-tight">R$ 12.847<span className="text-lg font-semibold text-white/80">,50</span></p>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            <p className="text-xs text-white/60">Conta corrente • <span className="text-white/80 font-medium">••••  4521</span></p>
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide px-1 mb-3">
            Acesso rápido
          </p>
          <div className="flex flex-col gap-3">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                aria-label={action.label}
                className="bg-white rounded-2xl p-4 border border-zinc-100 flex items-center gap-4
                           hover:border-itau-orange/40 hover:shadow-sm active:bg-zinc-50
                           transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-itau-orange/50"
              >
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${action.color}`}>
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-900">{action.label}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">{action.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  {!action.available && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-400 text-[10px] font-medium border border-zinc-200">
                      Em breve
                    </span>
                  )}
                  <svg
                    className="h-4 w-4 text-zinc-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Info banner */}
        <div className="bg-itau-orange/5 border border-itau-orange/20 rounded-2xl p-4 flex items-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-itau-orange/10 flex items-center justify-center shrink-0 mt-0.5">
            <svg
              className="h-4 w-4 text-itau-orange"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-800">Protótipo em desenvolvimento</p>
            <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
              Este é um case técnico do processo seletivo Itaú. A funcionalidade completa de{' '}
              <strong className="text-itau-orange font-semibold">Produtos Financeiros</strong> está disponível para navegação.
            </p>
          </div>
        </div>

      </section>
    </main>
  )
}
