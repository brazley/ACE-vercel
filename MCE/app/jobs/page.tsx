'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { searchJobs, Job } from '@/lib/projectService'
import Link from 'next/link'

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    const loadJobs = async () => {
      const allJobs = await searchJobs('')
      setJobs(allJobs)
    }
    loadJobs()
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const results = await searchJobs(searchTerm)
    setJobs(results)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Job Listings</h1>
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </form>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Link href={`/jobs/${job.id}`} key={job.id}>
            <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{job.company}</p>
                <p className="text-sm text-muted-foreground">{job.location}</p>
                <p className="mt-2 line-clamp-3">{job.description}</p>
                <p className="mt-2 font-semibold">{job.salary}</p>
                <p className="text-sm text-muted-foreground mt-2">Posted: {job.createdAt.toLocaleDateString()}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

