import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"
import { ChatProvider } from "@/contexts/ChatContext"
import "@/app/globals.css"
import "@/styles/tokens.css"
import "@/styles/micro-interactions.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ACE AI - Advanced Contractor Exchange",
  description: "AI-powered platform for contractors and service providers",
  openGraph: {
    images: [
      {
        url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "ACE AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <ThemeProvider>
          <AuthProvider>
            <ChatProvider>{children}</ChatProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'