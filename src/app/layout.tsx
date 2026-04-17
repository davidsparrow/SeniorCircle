import type { Metadata } from 'next'
import './globals.css'
import { DemoProvider } from '@/lib/demoContext'
import DemoBar from '@/components/DemoBar'
import DemoTooltip from '@/components/DemoTooltip'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'SeniorCircle',
  description: 'Connecting seniors who need a hand with students who need community service hours.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col" style={{ background: '#FFF8F0', color: '#3D2B1F' }}>
        <DemoProvider>
          <Navbar />
          <DemoBar />
          <main className="flex-1">{children}</main>
          <Footer />
          <DemoTooltip />
        </DemoProvider>
      </body>
    </html>
  )
}
