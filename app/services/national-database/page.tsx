"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { DataTable } from "@/components/data-table/data-table"
import { Building2, Phone, Mail } from "lucide-react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Company {
  id: string
  address: string
  businessCategory: string
  capability: string
  city: string
  companyName: string
  email: string
  firstName: string
  lastName: string
  phone: string
  state: string
  zip: string
}

const columns = [
  {
    accessorKey: "companyName",
    header: "Company Name",
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Building2 className="h-4 w-4 text-muted-foreground" />
        <span>{row.getValue("companyName")}</span>
      </div>
    ),
  },
  {
    accessorKey: "capability",
    header: "Capabilities",
    cell: ({ row }) => {
      const capability = row.getValue("capability") as string
      return (
        <div className="max-w-[500px] truncate" title={capability}>
          {capability}
        </div>
      )
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => {
      const data = row.original as Company
      return (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{data.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{data.email}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const data = row.original as Company
      return (
        <div>
          <div>
            {data.city}, {data.state} {data.zip}
          </div>
          <div className="text-sm text-muted-foreground">{data.address}</div>
        </div>
      )
    },
  },
]

export default function NationalDatabasePage() {
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const companiesCollection = collection(db, "companies")
        const companiesSnapshot = await getDocs(companiesCollection)
        const companiesData = companiesSnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Company,
        )
        setCompanies(companiesData)
      } catch (error) {
        console.error("Error fetching companies:", error)
      }
    }

    fetchCompanies()
  }, [])

  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">National Database</h1>
            <p className="text-muted-foreground">Browse companies in our national database.</p>
          </div>
          <DataTable columns={columns} data={companies} />
        </div>
      </div>
    </Layout>
  )
}

