import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { ProductsContainer } from '@/components/products/ProductsContainer'

export const metadata: Metadata = {
  title: 'Meus Produtos | Itaú',
  description: 'Gerencie seus produtos financeiros: cartões, contas, crédito, investimentos e seguros.',
}

// ISR: revalida a cada 60 segundos (bom para dados que mudam pouco)
export const revalidate = 60

export default function ProdutosPage() {
  return (
    <main className="flex flex-col min-h-dvh">
      <Header
        title="Meus Produtos"
        subtitle="Gerencie seus produtos financeiros"
      />

      <section
        className="flex-1 px-4 py-5 pb-24 max-w-2xl w-full mx-auto"
        aria-label="Produtos financeiros"
      >
        <ProductsContainer />
      </section>
    </main>
  )
}
