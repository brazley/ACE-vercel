'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { getJobById, Job } from '@/lib/projectService'

export default function JobPage() {
  const { id } = useParams()
  const [job, setJob] = useState<Job | null>(null)

  useEffect(() => {
    const fetchJob = async () => {
      if (typeof id === 'string') {
        const jobData = await getJobById(id)
        setJob(jobData)
      }
    }
    fetchJob()
  }, [id])

  if (!job) {
    return <div>Loading...</div>
  }

  const handleApply = () => {
    console.log('Applying for job:', job.id)
    // Implement application logic here
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{job.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Company</h3>
            <p>{job.company}</p>
          </div>
          <div>
            <h3 className="font-semibold">Location</h3>
            <p>{job.location}</p>
          </div>
          <div>
            <h3 className="font-semibold">Description</h3>
            <p>{job.description}</p>
          </div>
          <div>
            <h3 className="font-semibold">Salary</h3>
            <p>{job.salary}</p>
          </div>
          <div>
            <h3 className="font-semibold">Posted On</h3>
            <p>{job.createdAt.toLocaleDateString()}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleApply}>Apply for Job</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

