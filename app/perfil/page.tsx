import type { Metadata } from 'next'
import { ComingSoonPage } from '@/components/layout/ComingSoonPage'

export const metadata: Metadata = {
  title: 'Perfil',
  description: 'Gerencie seus dados pessoais e preferências.',
}

export default function PerfilPage() {
  return (
    <ComingSoonPage
      title="Meu Perfil"
      subtitle="Seus dados e preferências"
      description="Em breve você poderá gerenciar seus dados pessoais, segurança e preferências do aplicativo."
    />
  )
}
