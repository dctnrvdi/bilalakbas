export const revalidate = 0
import type { Metadata } from 'next'
import HakkimizdaClient from '@/components/HakkimizdaClient'

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'Bilal Akbaş hakkında — vizyonumuz, misyonumuz ve ekibimiz.',
}

export default function HakkimizdaPage() {
  return <HakkimizdaClient />
}