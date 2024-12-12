'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCompanyById, Company } from '@/lib/projectService'

export default function CompanyPage() {
  const { id } = useParams()
  const [company, setCompany] = useState<Company | null>(null)

  useEffect(() => {
    const fetchCompany = async () => {
      if (typeof id === 'string') {
        const companyData = await getCompanyById(id)
        setCompany(companyData)
      }
    }
    fetchCompany()
  }, [id])

  if (!company) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={company.logo} alt={company.name} />
              <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl">{company.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Industry</h3>
            <p>{company.industry}</p>
          </div>
          <div>
            <h3 className="font-semibold">Description</h3>
            <p>{company.description}</p>
          </div>
          <div>
            <h3 className="font-semibold">Employees</h3>
            <p>{company.employees}</p>
          </div>
          <div>
            <h3 className="font-semibold">Founded</h3>
            <p>{company.founded}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

