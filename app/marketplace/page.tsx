"use client"

import { Layout } from "@/components/layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const workforceData = [
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

const contractorData = [
  {
    id: "1",
    name: "Skyline Builders",
    specialty: "Commercial Construction",
    yearsInBusiness: 15,
    rating: 4.8,
  },
  {
    id: "2",
    name: "GreenTech Homes",
    specialty: "Sustainable Residential Construction",
    yearsInBusiness: 8,
    rating: 4.6,
  },
  {
    id: "3",
    name: "Urban Renovators",
    specialty: "Interior Remodeling",
    yearsInBusiness: 12,
    rating: 4.7,
  },
  {
    id: "4",
    name: "Precision Paving",
    specialty: "Road Construction",
    yearsInBusiness: 20,
    rating: 4.9,
  },
  {
    id: "5",
    name: "Aqua Systems",
    specialty: "Water Infrastructure",
    yearsInBusiness: 18,
    rating: 4.5,
  },
  {
    id: "6",
    name: "SteelWorks Inc.",
    specialty: "Steel Fabrication and Erection",
    yearsInBusiness: 25,
    rating: 4.8,
  },
  {
    id: "7",
    name: "ElectroPro Solutions",
    specialty: "Electrical Systems",
    yearsInBusiness: 10,
    rating: 4.6,
  },
  {
    id: "8",
    name: "EcoLandscapes",
    specialty: "Landscape Architecture",
    yearsInBusiness: 7,
    rating: 4.7,
  },
]

const projectData = [
  {
    id: "1",
    name: "Downtown Revitalization",
    type: "Urban Development",
    budget: "$50M - $75M",
    location: "Metro City, USA",
    deadline: "2025-12-31",
  },
  {
    id: "2",
    name: "Green Energy Park",
    type: "Renewable Energy",
    budget: "$30M - $40M",
    location: "Sunnyvale, CA",
    deadline: "2024-06-30",
  },
  {
    id: "3",
    name: "Smart Highway Project",
    type: "Infrastructure",
    budget: "$100M - $150M",
    location: "Interstate 95",
    deadline: "2026-12-31",
  },
  {
    id: "4",
    name: "Sustainable Community Housing",
    type: "Residential",
    budget: "$25M - $35M",
    location: "Portland, OR",
    deadline: "2024-09-30",
  },
  {
    id: "5",
    name: "Tech Hub Office Complex",
    type: "Commercial",
    budget: "$80M - $100M",
    location: "Austin, TX",
    deadline: "2025-03-31",
  },
  {
    id: "6",
    name: "Coastal Resilience Initiative",
    type: "Environmental",
    budget: "$40M - $60M",
    location: "Miami, FL",
    deadline: "2025-06-30",
  },
]

const supplierData = [
  {
    id: "1",
    name: "BuildRight Materials",
    products: ["Lumber", "Concrete", "Steel"],
    location: "Multiple Locations",
    rating: 4.7,
  },
  {
    id: "2",
    name: "EcoConstruct Supplies",
    products: ["Recycled Materials", "Solar Panels", "Green Insulation"],
    location: "West Coast",
    rating: 4.5,
  },
  {
    id: "3",
    name: "MetalWorks Pro",
    products: ["Structural Steel", "Metal Roofing", "Rebar"],
    location: "Midwest",
    rating: 4.8,
  },
  {
    id: "4",
    name: "TechBuild Solutions",
    products: ["Smart Home Systems", "Energy Management Tools", "Security Systems"],
    location: "Nationwide",
    rating: 4.6,
  },
  {
    id: "5",
    name: "StoneAge Quarries",
    products: ["Natural Stone", "Gravel", "Sand"],
    location: "Rocky Mountains",
    rating: 4.4,
  },
]

export default function MarketplacePage() {
  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Marketplace</h2>
        </div>
        <Tabs defaultValue="workforce" className="space-y-4">
          <TabsList className="flex flex-wrap">
            <TabsTrigger value="workforce">Workforce</TabsTrigger>
            <TabsTrigger value="contractors">Contractors</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          </TabsList>
          <TabsContent value="workforce" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {workforceData.map((worker) => (
                <Card key={worker.id}>
                  <CardHeader className="flex flex-row items-center gap-4">
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
                      <CardTitle>{worker.name}</CardTitle>
                      <CardDescription>{worker.title}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {worker.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="contractors" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {contractorData.map((contractor) => (
                <Card key={contractor.id}>
                  <CardHeader>
                    <CardTitle>{contractor.name}</CardTitle>
                    <CardDescription>{contractor.specialty}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Years in Business: {contractor.yearsInBusiness}</p>
                    <p>Rating: {contractor.rating}/5</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="projects" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {projectData.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Budget: {project.budget}</p>
                    <p>Location: {project.location}</p>
                    <p>Deadline: {project.deadline}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="suppliers" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {supplierData.map((supplier) => (
                <Card key={supplier.id}>
                  <CardHeader>
                    <CardTitle>{supplier.name}</CardTitle>
                    <CardDescription>{supplier.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Products: {supplier.products.join(", ")}</p>
                    <p>Rating: {supplier.rating}/5</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

