"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, MapPin, Calendar } from "lucide-react"

interface Member {
  id: string
  name: string
  avatar: string
  title: string
  company: string
  location: string
  about: string
  experience: {
    title: string
    company: string
    duration: string
    description: string
  }[]
  skills: string[]
}

const membersData: Member[] = [
  {
    id: "1",
    name: "Jane Jones",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&q=80",
    title: "Senior Project Manager",
    company: "TechInnovate Solutions",
    location: "San Francisco Bay Area",
    about:
      "Experienced project manager with a passion for leading cross-functional teams to deliver innovative solutions. Skilled in Agile methodologies, risk management, and stakeholder communication.",
    experience: [
      {
        title: "Senior Project Manager",
        company: "TechInnovate Solutions",
        duration: "Jan 2020 - Present",
        description:
          "Lead complex software development projects from inception to delivery, managing budgets exceeding $5M and teams of up to 20 members.",
      },
      {
        title: "Project Manager",
        company: "Global Tech Enterprises",
        duration: "Mar 2016 - Dec 2019",
        description:
          "Managed multiple concurrent projects in the fintech sector, consistently delivering on time and within budget.",
      },
    ],
    skills: [
      "Project Management",
      "Agile Methodologies",
      "Risk Management",
      "Stakeholder Communication",
      "Team Leadership",
      "Budgeting",
      "Strategic Planning",
    ],
  },
  // Add more detailed member data here for members 2-8
]

export default function MemberProfilePage() {
  const params = useParams<{ id: string }>()
  const [member, setMember] = useState<Member | null>(null)

  useEffect(() => {
    // Simulating an API call
    const fetchMember = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const foundMember = membersData.find((m) => m.id === params.id)
      setMember(foundMember || null)
    }

    fetchMember()
  }, [params.id])

  if (!member) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Member not found</h1>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-6 pb-8">
            <Avatar className="w-32 h-32">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-3xl font-bold">{member.name}</CardTitle>
              <p className="text-xl mt-2">{member.title}</p>
              <p className="text-lg text-muted-foreground">{member.company}</p>
              <div className="flex items-center justify-center sm:justify-start mt-2 text-muted-foreground">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{member.location}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-2">About</h2>
              <p>{member.about}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-2">Experience</h2>
              <div className="space-y-4">
                {member.experience.map((exp, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start">
                        <Briefcase className="w-5 h-5 mt-1 mr-2" />
                        <div>
                          <h3 className="font-semibold">{exp.title}</h3>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{exp.duration}</span>
                          </div>
                          <p className="mt-2 text-sm">{exp.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

