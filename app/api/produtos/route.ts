import { NextRequest, NextResponse } from 'next/server'
import { Product, ProductsApiResponse } from '@/types/product'

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cartão Personnalité Visa Infinite',
    type: 'Cartão',
    status: 'ativo',
    description:
      'Cartão de crédito premium com benefícios exclusivos, acesso a salas VIP em aeroportos, concierge 24h e programa de pontos Itaú.',
    interestRate: 12.9,
    createdAt: '2022-03-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Cartão Itaú Platinum',
    type: 'Cartão',
    status: 'ativo',
    description:
      'Cartão com cashback de até 1,5% em todas as compras, anuidade zero no primeiro ano e seguro de compras incluso.',
    interestRate: 15.5,
    createdAt: '2021-08-20T08:30:00Z',
  },
  {
    id: '3',
    name: 'Conta Corrente Digital',
    type: 'Conta',
    status: 'ativo',
    description:
      'Conta digital sem tarifas de manutenção, transferências ilimitadas via Pix, TED e pagamento de boletos gratuito.',
    createdAt: '2020-01-10T09:00:00Z',
  },
  {
    id: '4',
    name: 'Empréstimo Pessoal Itaú',
    type: 'Crédito',
    status: 'inativo',
    description:
      'Empréstimo pessoal com contratação 100% digital, parcelas fixas e sem necessidade de garantias. Liberação em até 24h.',
    interestRate: 2.49,
    createdAt: '2023-05-01T14:00:00Z',
  },
  {
    id: '5',
    name: 'Financiamento Imobiliário',
    type: 'Crédito',
    status: 'ativo',
    description:
      'Financiamento de imóveis residenciais e comerciais com taxas competitivas, prazo de até 35 anos e simulação online.',
    interestRate: 9.79,
    createdAt: '2019-11-05T11:00:00Z',
  },
  {
    id: '6',
    name: 'CDB Digital Itaú',
    type: 'Investimento',
    status: 'ativo',
    description:
      'Certificado de Depósito Bancário com liquidez diária, rendimento de 100% do CDI e cobertura do FGC até R$ 250 mil.',
    createdAt: '2021-02-28T12:00:00Z',
  },
  {
    id: '7',
    name: 'Tesouro Direto',
    type: 'Investimento',
    status: 'inativo',
    description:
      'Investimento em títulos públicos federais com segurança máxima, acessível a partir de R$ 30 e rentabilidade atrativa.',
    createdAt: '2022-09-14T15:00:00Z',
  },
  {
    id: '8',
    name: 'Poupança Programada',
    type: 'Conta',
    status: 'ativo',
    description:
      'Conta poupança com débito automático mensal, sem tarifas e rendimento automático conforme regra da poupança vigente.',
    createdAt: '2020-06-01T10:00:00Z',
  },
  {
    id: '9',
    name: 'Seguro de Vida Itaú',
    type: 'Seguro',
    status: 'ativo',
    description:
      'Proteção financeira para você e sua família com coberturas flexíveis, assistência funeral e invalidez por acidente.',
    createdAt: '2023-01-20T09:00:00Z',
  },
  {
    id: '10',
    name: 'Previdência Privada PGBL',
    type: 'Investimento',
    status: 'ativo',
    description:
      'Plano de previdência com vantagem fiscal no IR, aportes flexíveis e portabilidade entre instituições financeiras.',
    interestRate: 1.1,
    createdAt: '2021-11-30T16:00:00Z',
  },
]

let products = [...MOCK_PRODUCTS]

export async function GET() {
  await new Promise((r) => setTimeout(r, 400))
  const response: ProductsApiResponse = { data: products, total: products.length }
  return NextResponse.json(response)
}

export async function PATCH(request: NextRequest) {
  await new Promise((r) => setTimeout(r, 250))
  const { id } = await request.json()

  const index = products.findIndex((p) => p.id === id)
  if (index === -1) {
    return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 })
  }

  products[index] = {
    ...products[index],
    status: products[index].status === 'ativo' ? 'inativo' : 'ativo',
  }

  return NextResponse.json({ data: products[index] })
}
