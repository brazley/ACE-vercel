'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { searchProjects, Project } from '@/lib/projectService'
import Link from 'next/link'

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const loadProjects = async () => {
      const allProjects = await searchProjects('')
      setProjects(allProjects)
    }
    loadProjects()
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const results = await searchProjects(searchTerm)
    setProjects(results)
  }

  const handleBid = (e: React.MouseEvent, projectId: string) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Bidding on project:', projectId)
    // Implement bidding logic here
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Project Portal</h1>
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </form>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
              <CardHeader>
                <CardTitle>{project.name || 'Untitled Project'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{project.company || 'Company not specified'}</p>
                <p className="text-sm text-muted-foreground">Posted by: {project.postedBy || 'Unknown'}</p>
                <p className="mt-2 line-clamp-3">{project.details}</p>
                <p className="text-sm text-muted-foreground mt-2">Posted on: {project.createdAt.toLocaleDateString()}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={(e) => handleBid(e, project.id)}>Bid on Project</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

