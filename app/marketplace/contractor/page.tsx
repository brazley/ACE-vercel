"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { DataTable } from "@/components/data-table/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const data = [
  {
    id: "1",
    name: "Skyline Builders",
    specialty: "Commercial Construction",
    yearsInBusiness: 15,
    rating: 4.8,
    location: "New York, NY",
    naicsCodes: ["236220", "237310"],
    bondingCapacity: "$10M",
    maximumCapacity: "$50M",
    csiCodes: ["03-00-00", "04-00-00"],
  },
  {
    id: "2",
    name: "GreenTech Homes",
    specialty: "Sustainable Residential Construction",
    yearsInBusiness: 8,
    rating: 4.6,
    location: "Portland, OR",
    naicsCodes: ["236115", "236118"],
  },
  {
    id: "3",
    name: "Urban Renovators",
    specialty: "Interior Remodeling",
    yearsInBusiness: 12,
    rating: 4.7,
    location: "Chicago, IL",
    naicsCodes: ["236118", "238350"],
  },
  {
    id: "4",
    name: "Precision Paving",
    specialty: "Road Construction",
    yearsInBusiness: 20,
    rating: 4.9,
    location: "Houston, TX",
    naicsCodes: ["237310", "237990"],
  },
  {
    id: "5",
    name: "Aqua Systems",
    specialty: "Water Infrastructure",
    yearsInBusiness: 18,
    rating: 4.5,
    location: "Miami, FL",
    naicsCodes: ["237110", "237990"],
  },
  {
    id: "6",
    name: "SteelWorks Inc.",
    specialty: "Steel Fabrication and Erection",
    yearsInBusiness: 25,
    rating: 4.8,
    location: "Pittsburgh, PA",
    naicsCodes: ["238120", "332312"],
  },
  {
    id: "7",
    name: "ElectroPro Solutions",
    specialty: "Electrical Systems",
    yearsInBusiness: 10,
    rating: 4.6,
    location: "San Francisco, CA",
    naicsCodes: ["238210"],
  },
  {
    id: "8",
    name: "EcoLandscapes",
    specialty: "Landscape Architecture",
    yearsInBusiness: 7,
    rating: 4.7,
    location: "Denver, CO",
    naicsCodes: ["561730"],
  },
]

const columns = [
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "specialty",
    header: "Specialty",
  },
  {
    accessorKey: "yearsInBusiness",
    header: "Years in Business",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number
      return <Badge variant="secondary">{rating.toFixed(1)}</Badge>
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button asChild size="sm">
        <Link href={`/marketplace/contractor/${row.original.id}`}>View Details</Link>
      </Button>
    ),
  },
]

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
]

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
]

const csiCodes = [
  "03-00-00 - Concrete",
  "04-00-00 - Masonry",
  "05-00-00 - Metals",
  "06-00-00 - Wood, Plastics, and Composites",
  "07-00-00 - Thermal and Moisture Protection",
  "08-00-00 - Openings",
  "09-00-00 - Finishes",
  "10-00-00 - Specialties",
]

const maximumCapacities = ["Up to $1M", "$1M - $5M", "$5M - $10M", "$10M - $50M", "$50M - $100M", "$100M+"]

export default function ContractorPortalPage() {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)

  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Contractor Portal</h2>
        </div>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Search Contractors</CardTitle>
              <div className="flex items-center space-x-2">
                <Switch id="advanced-search" checked={showAdvancedSearch} onCheckedChange={setShowAdvancedSearch} />
                <Label htmlFor="advanced-search">Advanced Search</Label>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="Enter company name" />
                </div>

                {showAdvancedSearch && (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city.toLowerCase()}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>State</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state.toLowerCase()}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Bonding Capacity</Label>
                      <Input placeholder="Enter bonding capacity" />
                    </div>

                    <div className="space-y-2">
                      <Label>Maximum Capacity</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Maximum Capacity" />
                        </SelectTrigger>
                        <SelectContent>
                          {maximumCapacities.map((capacity) => (
                            <SelectItem key={capacity} value={capacity.toLowerCase()}>
                              {capacity}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>CSI Code</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select CSI Code" />
                        </SelectTrigger>
                        <SelectContent>
                          {csiCodes.map((code) => (
                            <SelectItem key={code} value={code.split(" ")[0]}>
                              {code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>NAICS Code</Label>
                      <Input placeholder="Enter NAICS code" />
                    </div>
                  </div>
                )}
              </div>
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </Layout>
  )
}

