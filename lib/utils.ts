type ClassValue = string | undefined | null | false | ClassValue[]

export function cn(...classes: ClassValue[]): string {
  return classes
    .flat(Infinity as 1)
    .filter(Boolean)
    .join(' ')
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(iso))
}

export function formatInterestRate(rate: number): string {
  return `${rate.toFixed(2).replace('.', ',')}% a.m.`
}
