"use client"

import { Layout } from "@/components/layout"
import { DataTable } from "@/components/data-table/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const data = [
  {
    id: "1",
    name: "Downtown Revitalization",
    type: "Urban Development",
    budget: "$50M - $75M",
    location: "Metro City, USA",
    deadline: "2025-12-31",
  },
  {
    id: "2",
    name: "Green Energy Park",
    type: "Renewable Energy",
    budget: "$30M - $40M",
    location: "Sunnyvale, CA",
    deadline: "2024-06-30",
  },
  {
    id: "3",
    name: "Smart Highway Project",
    type: "Infrastructure",
    budget: "$100M - $150M",
    location: "Interstate 95",
    deadline: "2026-12-31",
  },
  {
    id: "4",
    name: "Sustainable Community Housing",
    type: "Residential",
    budget: "$25M - $35M",
    location: "Portland, OR",
    deadline: "2024-09-30",
  },
  {
    id: "5",
    name: "Tech Hub Office Complex",
    type: "Commercial",
    budget: "$80M - $100M",
    location: "Austin, TX",
    deadline: "2025-03-31",
  },
  {
    id: "6",
    name: "Coastal Resilience Initiative",
    type: "Environmental",
    budget: "$40M - $60M",
    location: "Miami, FL",
    deadline: "2025-06-30",
  },
]

const columns = [
  {
    accessorKey: "name",
    header: "Project Name",
    cell: ({ row }) => {
      return (
        <Link href={`/marketplace/project/${row.original.id}`} className="hover:underline">
          {row.getValue("name")}
        </Link>
      )
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return <Badge variant="outline">{type}</Badge>
    },
  },
  {
    accessorKey: "budget",
    header: "Budget",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button asChild size="sm">
          <Link href={`/marketplace/project/${row.original.id}`}>View Details</Link>
        </Button>
      )
    },
  },
]

export default function ProjectPortalPage() {
  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Project Portal</h2>
        </div>
        <div className="space-y-4">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </Layout>
  )
}

