import type { Metadata } from "next"
import { Layout } from "@/components/layout"
import { NetworkFeed } from "@/components/network/network-feed"
import { NetworkSidebar } from "@/components/network/network-sidebar"

export const metadata: Metadata = {
  title: "Networking | MCE",
  description: "Connect with professionals and companies in the construction industry",
}

export default function NetworkingPage() {
  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
          <h2 className="text-2xl font-semibold text-gray-100">Networking</h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <NetworkFeed />
            </div>
            <div className="lg:col-span-4">
              <NetworkSidebar />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

