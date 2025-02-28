import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Calendar } from "lucide-react"
import { Layout } from "@/components/layout"
import Link from "next/link"

export default function ProfilePage() {
  return (
    <Layout>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-6 pb-8">
          <Image
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2Zlc3Npb25hbCUyMG1pbm9yaXR5fGVufDB8fDB8fHww"
            alt="Jane Jones"
            width={120}
            height={120}
            className="rounded-full"
          />
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl font-bold">Jane Jones</CardTitle>
            <CardDescription className="text-lg mt-2">Senior Project Manager at TechInnovate Solutions</CardDescription>
            <div className="flex items-center justify-center sm:justify-start mt-2 text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              <span>San Francisco Bay Area</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4 justify-center sm:justify-start">
              <Button size="sm">Connect</Button>
              <Button size="sm" variant="outline" asChild>
                <Link href="/ace">ACE</Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-sm text-muted-foreground">
                Experienced project manager with a passion for leading cross-functional teams to deliver innovative
                solutions. Skilled in Agile methodologies, risk management, and stakeholder communication. Committed to
                fostering diversity and inclusion in the tech industry.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">Experience</h2>
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <Briefcase className="w-5 h-5 mt-1 mr-2" />
                      <div>
                        <h3 className="font-semibold">Senior Project Manager</h3>
                        <p className="text-sm text-muted-foreground">TechInnovate Solutions</p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>Jan 2020 - Present</span>
                        </div>
                        <p className="mt-2 text-sm">
                          Lead complex software development projects from inception to delivery, managing budgets
                          exceeding $5M and teams of up to 20 members.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start">
                      <Briefcase className="w-5 h-5 mt-1 mr-2" />
                      <div>
                        <h3 className="font-semibold">Project Manager</h3>
                        <p className="text-sm text-muted-foreground">Global Tech Enterprises</p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>Mar 2016 - Dec 2019</span>
                        </div>
                        <p className="mt-2 text-sm">
                          Managed multiple concurrent projects in the fintech sector, consistently delivering on time
                          and within budget.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
            <section>
              <h2 className="text-lg font-semibold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                <Badge>Project Management</Badge>
                <Badge>Agile Methodologies</Badge>
                <Badge>Risk Management</Badge>
                <Badge>Stakeholder Communication</Badge>
                <Badge>Team Leadership</Badge>
                <Badge>Budgeting</Badge>
                <Badge>Strategic Planning</Badge>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </Layout>
  )
}

