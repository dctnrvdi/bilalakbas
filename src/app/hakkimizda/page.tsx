import type { Metadata } from 'next'
import HakkimizdaClient from '@/components/HakkimizdaClient'

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'Özkur İnşaat hakkında — vizyonumuz, misyonumuz ve ekibimiz.',
}

export default function HakkimizdaPage() {
  return <HakkimizdaClient />
}