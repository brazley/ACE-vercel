"use client"

import { Layout } from "@/components/layout"
import { DataTable } from "@/components/data-table/data-table"
import { Badge } from "@/components/ui/badge"

const data = [
  {
    id: "1",
    name: "BuildRight Materials",
    products: ["Lumber", "Concrete", "Steel"],
    location: "Multiple Locations",
    rating: 4.7,
  },
  {
    id: "2",
    name: "EcoConstruct Supplies",
    products: ["Recycled Materials", "Solar Panels", "Green Insulation"],
    location: "West Coast",
    rating: 4.5,
  },
  {
    id: "3",
    name: "MetalWorks Pro",
    products: ["Structural Steel", "Metal Roofing", "Rebar"],
    location: "Midwest",
    rating: 4.8,
  },
  {
    id: "4",
    name: "TechBuild Solutions",
    products: ["Smart Home Systems", "Energy Management Tools", "Security Systems"],
    location: "Nationwide",
    rating: 4.6,
  },
  {
    id: "5",
    name: "StoneAge Quarries",
    products: ["Natural Stone", "Gravel", "Sand"],
    location: "Rocky Mountains",
    rating: 4.4,
  },
]

const columns = [
  {
    accessorKey: "name",
    header: "Supplier Name",
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      const products = row.getValue("products") as string[]
      return (
        <div className="flex flex-wrap gap-1">
          {products.map((product) => (
            <Badge key={product} variant="secondary">
              {product}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number
      return <Badge variant="secondary">{rating.toFixed(1)}</Badge>
    },
  },
]

export default function SupplierPortalPage() {
  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Supplier Portal</h2>
        </div>
        <div className="space-y-4">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </Layout>
  )
}

