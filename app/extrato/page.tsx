import type { Metadata } from 'next'
import { ComingSoonPage} from '@/components/layout/ComingSoonPage'

export const metadata: Metadata = {
  title: 'Extrato',
  description: 'Acompanhe todas as suas movimentações financeiras.',
}

export default function ExtratoPage() {
  return (
    <ComingSoonPage
      title="Extrato"
      subtitle="Acompanhe suas movimentações"
      description="Em breve você poderá visualizar todo seu histórico financeiro com gráficos e categorização inteligente."
    />
  )
}
