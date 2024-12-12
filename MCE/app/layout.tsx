import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteHeader } from "@/components/site-header"
import { AIChatButton } from "@/components/ai-chat-button"

import "@/app/globals.css"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MCE - Minority-Owned Companies Platform',
  description: 'A database and networking platform for minority-owned companies in construction',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative min-h-screen flex flex-col pt-20">
            <SiteHeader />
            <main className="flex-1 container py-8">{children}</main>
            <AIChatButton />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

