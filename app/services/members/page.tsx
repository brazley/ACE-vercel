"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin } from "lucide-react"
import Link from "next/link"

interface Member {
  id: string
  name: string
  avatar: string
  title: string
  company: string
  location: string
}

const members: Member[] = [
  {
    id: "1",
    name: "Jane Jones",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80",
    title: "Senior Project Manager",
    company: "TechInnovate Solutions",
    location: "San Francisco Bay Area",
  },
  {
    id: "2",
    name: "John Smith",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&q=80",
    title: "Software Engineer",
    company: "CodeCraft Inc.",
    location: "New York City",
  },
  {
    id: "3",
    name: "Emily Chen",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80",
    title: "UX Designer",
    company: "DesignHub",
    location: "Seattle",
  },
  {
    id: "4",
    name: "Michael Johnson",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&q=80",
    title: "Marketing Director",
    company: "BrandBoost Agency",
    location: "Chicago",
  },
  {
    id: "5",
    name: "Sarah Lee",
    avatar: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=300&q=80",
    title: "Data Scientist",
    company: "DataDrive Analytics",
    location: "Boston",
  },
  {
    id: "6",
    name: "David Patel",
    avatar: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=300&q=80",
    title: "Product Manager",
    company: "InnovateTech",
    location: "Austin",
  },
  {
    id: "7",
    name: "Lisa Thompson",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&q=80",
    title: "HR Manager",
    company: "PeopleFirst Corp",
    location: "Denver",
  },
  {
    id: "8",
    name: "Robert Kim",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    title: "Financial Analyst",
    company: "WealthWise Investments",
    location: "Los Angeles",
  },
]

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(members)

  useEffect(() => {
    const filtered = members.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.company.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredMembers(filtered)
  }, [searchTerm])

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Members</h1>
        <input
          type="text"
          placeholder="Search members..."
          className="w-full p-2 mb-4 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="flex flex-col h-full">
              <CardHeader className="flex flex-col items-center text-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <CardTitle className="text-xl font-bold">{member.name}</CardTitle>
                  <p className="text-sm font-medium text-muted-foreground">{member.title}</p>
                  <p className="text-sm text-muted-foreground">{member.company}</p>
                  <div className="flex items-center justify-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{member.location}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex items-end justify-center p-6">
                <Link href={`/services/members/${member.id}`} className="w-full">
                  <Button className="w-full">View Profile</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

