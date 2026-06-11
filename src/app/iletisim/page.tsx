import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import IletisimClient from '@/components/IletisimClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Bilal Akbaş ile iletişime geçin.',
}

export default function IletisimPage() {
  return (
    <>
      <Navbar />
      <IletisimClient />
      <Footer />
    </>
  )
}