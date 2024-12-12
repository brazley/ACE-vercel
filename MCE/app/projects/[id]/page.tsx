'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { getProjectById, Project } from '@/lib/projectService'
import { PostForm } from "@/components/post-form"

export default function ProjectPage() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [showShareForm, setShowShareForm] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      if (typeof id === 'string') {
        const projectData = await getProjectById(id)
        setProject(projectData)
      }
    }
    fetchProject()
  }, [id])

  if (!project) {
    return <div>Loading...</div>
  }

  const handleBid = () => {
    console.log('Bidding on project:', project.id)
    // Implement bidding logic here
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{project.name || 'Untitled Project'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Company</h3>
            <p>{project.company || 'Company not specified'}</p>
          </div>
          <div>
            <h3 className="font-semibold">Posted By</h3>
            <p>{project.postedBy || 'Unknown'}</p>
          </div>
          <div>
            <h3 className="font-semibold">Project Details</h3>
            <p>{project.details || 'No details available'}</p>
          </div>
          <div>
            <h3 className="font-semibold">Posted On</h3>
            <p>{project.createdAt.toLocaleDateString()}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleBid}>Bid on Project</Button>
          <Button onClick={() => setShowShareForm(!showShareForm)} variant="outline">
            {showShareForm ? 'Cancel Share' : 'Share Project'}
          </Button>
        </CardFooter>
      </Card>

      {showShareForm && (
        <Card>
          <CardHeader>
            <CardTitle>Share this project</CardTitle>
          </CardHeader>
          <CardContent>
            <PostForm
              projectId={project.id}
              projectName={project.name}
              onPostCreated={() => setShowShareForm(false)}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

