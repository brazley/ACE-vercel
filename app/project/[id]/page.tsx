"use client"

import { useParams, useRouter } from "next/navigation"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, DollarSign } from "lucide-react"

// This would come from your API in a real application
const projects = [
  {
    id: "1",
    name: "City Center Renovation",
    company: "7pm Group",
    description:
      "A major renovation project for the city center, focusing on sustainable design and improved public spaces.",
    budget: "$10,000,000",
    deadline: "2024-12-31",
    status: "In Progress",
  },
  // ... (add other projects here)
]

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const project = projects.find((p) => p.id === params.id)

  if (!project) {
    return (
      <Layout>
        <div>Project not found</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-4 p-0 md:hidden" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">{project.name}</CardTitle>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                {project.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Company</h3>
                <p>{project.company}</p>
              </div>
              <div>
                <h3 className="font-semibold">Budget</h3>
                <p className="flex items-center">
                  <DollarSign className="mr-1 h-4 w-4" />
                  {project.budget}
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Deadline</h3>
                <p className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {project.deadline}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Description</h3>
              <p>{project.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

