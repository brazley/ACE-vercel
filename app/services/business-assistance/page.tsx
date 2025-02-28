"use client"

import { useState, useEffect, useCallback } from "react"
import { Layout } from "@/components/layout"
import { DataTable } from "@/components/data-table/data-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { fetchCSVData } from "@/lib/csv-utils"
import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

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

const serviceCategories = [
  "Business Consulting",
  "Financial",
  "Marketing and advertising",
  "Certifications/Pre-qualifications",
  "Licensing and permits",
  "Legal",
  "Accounting and Tax Services",
  "Business and Skills Training and Education",
  "Insurance and Bonding",
  "Business Advocacy",
  "Unions",
  "Workforce",
]

export default function BusinessAssistancePage() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [filteredOrganizations, setFilteredOrganizations] = useState<Organization[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [sortByService, setSortByService] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

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

        setOrganizations(orgs)
        setFilteredOrganizations(orgs)
        setIsLoading(false)
      } catch (err) {
        console.error("Error loading data:", err)
        setError("Failed to load data. Please try again later.")
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const handleSearch = useCallback(() => {
    const filtered = organizations.filter((org) => {
      const matchesSearchTerm =
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.website.toLowerCase().includes(searchTerm.toLowerCase())

      if (!matchesSearchTerm) return false

      if (sortByService && !org.services[sortByService]) {
        return false
      }

      return true
    })

    setFilteredOrganizations(filtered)
  }, [organizations, searchTerm, sortByService])

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  const columns: ColumnDef<Organization>[] = [
    {
      accessorKey: "name",
      header: "Organization Name",
      cell: ({ row }) => (
        <Link href={`/services/business-assistance/${row.original.id}`} className="text-blue-600 hover:underline">
          {row.getValue("name")}
        </Link>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "website",
      header: "Website",
      cell: ({ row }) => (
        <a
          href={row.getValue("website")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {row.getValue("website")}
        </a>
      ),
    },
  ]

  if (isLoading) {
    return (
      <Layout>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h2 className="text-3xl font-bold tracking-tight">Business Assistance</h2>
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h2 className="text-3xl font-bold tracking-tight">Business Assistance</h2>
          <div className="text-red-500">{error}</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <h2 className="text-3xl font-bold tracking-tight">Business Assistance Directory</h2>

        <Card>
          <CardHeader>
            <CardTitle>Search and Filter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="advanced-search" checked={showAdvancedSearch} onCheckedChange={setShowAdvancedSearch} />
              <Label htmlFor="advanced-search">Advanced Search</Label>
            </div>
            {showAdvancedSearch && (
              <div className="flex flex-col space-y-2">
                <Label htmlFor="sortByService">Filter by Service</Label>
                <select
                  id="sortByService"
                  value={sortByService}
                  onChange={(e) => setSortByService(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select a service</option>
                  {serviceCategories.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={filteredOrganizations} />
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

