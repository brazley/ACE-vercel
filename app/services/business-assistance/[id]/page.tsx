"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchCSVData } from "@/lib/csv-utils"
import { Check, X } from "lucide-react"

interface Organization {
  id: string
  name: string
  address: string
  phone: string
  website: string
  services: {
    [key: string]: boolean
  }
}

export default function OrganizationPage() {
  const params = useParams()
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const csvUrl =
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AceBusinessAssistance-Demo-B0Xkp1qj5Ak7VvWXX4r24Rr0xmEXjj.csv"
        const data = await fetchCSVData(csvUrl)

        const orgs: Organization[] = data.map((item: any, index: number) => ({
          id: `org-${index}`,
          name: item["Businesss Assistance Organizations"],
          address: item["Address"],
          phone: item["Phone"],
          website: item["Website"],
          services: {
            "Business Consulting":
              item["Business plan"] === "x" ||
              item["Business plan"] === "X" ||
              item["Business consultants"] === "x" ||
              item["Business consultants"] === "X" ||
              item["Business Mgt"] === "x" ||
              item["Business Mgt"] === "X",
            Financial:
              item["Financial Projections"] === "x" ||
              item["Financial Projections"] === "X" ||
              item["Business Loans"] === "x" ||
              item["Business Loans"] === "X",
            "Marketing and advertising": item["Marketing Plan"] === "x" || item["Marketing Plan"] === "X",
            "Certifications/Pre-qualifications":
              item["Certification/Prequalifications"] === "x" || item["Certification/Prequalifications"] === "X",
            "Licensing and permits":
              item["Business Licensing and permits"] === "x" || item["Business Licensing and permits"] === "X",
            Legal: false,
            "Accounting and Tax Services": false,
            "Business and Skills Training and Education":
              item["Business Classes"] === "x" || item["Business Classes"] === "X",
            "Insurance and Bonding": item["Insurance & Bonding"] === "x" || item["Insurance & Bonding"] === "X",
            "Business Advocacy":
              item["Business Resource/Membership"] === "x" || item["Business Resource/Membership"] === "X",
            Unions: false,
            Workforce:
              item["Sub-contracting"] === "x" ||
              item["Sub-contracting"] === "X" ||
              item["Strategic Partnering Joint Ventures"] === "x" ||
              item["Strategic Partnering Joint Ventures"] === "X",
          },
        }))

        const org = orgs.find((o) => o.id === params.id)
        if (org) {
          setOrganization(org)
        } else {
          setError("Organization not found")
        }
        setIsLoading(false)
      } catch (err) {
        console.error("Error loading data:", err)
        setError("Failed to load data. Please try again later.")
        setIsLoading(false)
      }
    }

    loadData()
  }, [params.id])

  if (isLoading) {
    return (
      <Layout>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h2 className="text-3xl font-bold tracking-tight">Loading...</h2>
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    )
  }

  if (error || !organization) {
    return (
      <Layout>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h2 className="text-3xl font-bold tracking-tight">Error</h2>
          <div className="text-red-500">{error || "Organization not found"}</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">{organization.name}</h2>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Address:</strong> {organization.address}
            </p>
            <p>
              <strong>Phone:</strong> {organization.phone}
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={organization.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {organization.website}
              </a>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Services Offered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(organization.services).map(([service, offered]) => (
                <div key={service} className="flex items-center space-x-2">
                  {offered ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

