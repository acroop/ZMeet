import { StreamVideoClientProvider } from '@/provider/StreamVideoClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Zoom Clone",
  description: "Meeting app",
  icons: {
    icon: "/icons/logo.svg",
  }
};

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <StreamVideoClientProvider>
        {children}
      </StreamVideoClientProvider>
    </main>
  )
}

export default RootLayout