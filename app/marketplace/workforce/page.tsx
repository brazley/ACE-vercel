"use client"

import { Layout } from "@/components/layout"
import { DataTable } from "@/components/data-table/data-table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const data = [
  {
    id: "1",
    name: "Jane Jones",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80",
    title: "Senior Project Manager",
    skills: ["Project Management", "Team Leadership", "Agile Methodologies"],
  },
  {
    id: "2",
    name: "Carl Brazley",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    title: "CEO",
    skills: ["Strategic Planning", "Business Development", "Executive Leadership"],
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    title: "Software Engineer",
    skills: ["Full-stack Development", "Cloud Computing", "DevOps"],
  },
  {
    id: "4",
    name: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    title: "Data Scientist",
    skills: ["Machine Learning", "Data Analysis", "Python"],
  },
  {
    id: "5",
    name: "Samantha Lee",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    title: "UX Designer",
    skills: ["User Research", "Wireframing", "Prototyping"],
  },
  {
    id: "6",
    name: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
    title: "Marketing Director",
    skills: ["Digital Marketing", "Brand Strategy", "Content Creation"],
  },
  {
    id: "7",
    name: "Olivia Patel",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
    title: "Sustainability Consultant",
    skills: ["Environmental Assessment", "Green Building", "Sustainability Strategy"],
  },
  {
    id: "8",
    name: "Jamal Washington",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&q=80",
    title: "Financial Analyst",
    skills: ["Financial Modeling", "Risk Assessment", "Investment Analysis"],
  },
]

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const worker = row.original
      return (
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={worker.avatar} alt={worker.name} />
            <AvatarFallback>
              {worker.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{worker.name}</div>
            <div className="text-sm text-muted-foreground">{worker.title}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "skills",
    header: "Skills",
    cell: ({ row }) => {
      const skills = row.getValue("skills") as string[]
      return (
        <div className="flex flex-wrap gap-1">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      )
    },
  },
]

export default function WorkforcePortalPage() {
  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Workforce Portal</h2>
        </div>
        <div className="space-y-4">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </Layout>
  )
}

