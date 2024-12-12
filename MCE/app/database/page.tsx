"use client"

import { useState } from "react"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Company {
  id: string
  name: string
  industry: string
  services: string
  owner: string
  city: string
  state: string
  verified: boolean
}

const dummyData: Company[] = Array(15).fill(null).map((_, i) => ({
  id: `company-${i}`,
  name: "7pm Group",
  industry: "Project Management",
  services: "Design, Build, Manage",
  owner: "Carl Brazley",
  city: "Louisville",
  state: "Ky",
  verified: true
}))

export default function DatabasePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState({
    owner: true,
    city: true,
    industry: true
  })

  const toggleFilter = (filter: keyof typeof activeFilters) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }))
  }

  const filteredData = dummyData.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filters:</span>
          <Button
            variant={activeFilters.owner ? "secondary" : "ghost"}
            size="sm"
            onClick={() => toggleFilter("owner")}
            className="rounded-full"
          >
            Owner
          </Button>
          <Button
            variant={activeFilters.city ? "secondary" : "ghost"}
            size="sm"
            onClick={() => toggleFilter("city")}
            className="rounded-full"
          >
            City
          </Button>
          <Button
            variant={activeFilters.industry ? "secondary" : "ghost"}
            size="sm"
            onClick={() => toggleFilter("industry")}
            className="rounded-full"
          >
            Industry
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">{company.name}</TableCell>
                <TableCell>{company.industry}</TableCell>
                <TableCell>{company.services}</TableCell>
                <TableCell>{company.owner}</TableCell>
                <TableCell>{company.city}</TableCell>
                <TableCell>{company.state}</TableCell>
                <TableCell>
                  {company.verified && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Verified
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

