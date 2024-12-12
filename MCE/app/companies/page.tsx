'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { searchCompanies, Company } from '@/lib/projectService'
import Link from 'next/link'

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    const loadCompanies = async () => {
      const allCompanies = await searchCompanies('')
      setCompanies(allCompanies)
    }
    loadCompanies()
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const results = await searchCompanies(searchTerm)
    setCompanies(results)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Companies</h1>
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </form>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <Link href={`/companies/${company.id}`} key={company.id}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={company.logo} alt={company.name} />
                    <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{company.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold text-muted-foreground">{company.industry}</p>
                <p className="mt-2 line-clamp-3">{company.description}</p>
                <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                  <span>Employees: {company.employees}</span>
                  <span>Founded: {company.founded}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

