interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-itau-blue text-white px-5 pt-safe-top">
      <div className="flex items-center justify-between h-14">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-itau-orange flex items-center justify-center font-bold text-white text-sm select-none">
            i
          </div>
          <span className="font-semibold text-sm tracking-tight">Itaú</span>
        </div>

        {/* Avatar */}
        <button
          aria-label="Menu do usuário"
          className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          <svg
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </button>
      </div>

      {/* Page title banner */}
      <div className="pb-4 pt-1">
        <h1 className="text-xl font-bold">{title}</h1>
        {subtitle && <p className="text-sm text-white/70 mt-0.5">{subtitle}</p>}
      </div>
    </header>
  )
}
