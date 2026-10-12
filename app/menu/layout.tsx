import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu | NAS Specialty Coffee',
  description: 'The NAS Specialty Coffee menu in Cairo.',
}

export default function MenuLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
