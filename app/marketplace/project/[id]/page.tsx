"use client"

import { useParams, useRouter } from "next/navigation"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, FileText, ClipboardList, Users, Scale } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const projectsData = [
  {
    id: "1",
    name: "Downtown Revitalization",
    type: "Urban Development",
    budget: "$50M - $75M",
    location: "Metro City, USA",
    deadline: "2025-12-31",
    overview:
      "The Downtown Revitalization project aims to transform the heart of Metro City into a vibrant, sustainable, and economically thriving urban center. This comprehensive initiative will breathe new life into our historic downtown, creating a model for 21st-century urban living and working.",
    scopeOfWork: [
      "Renovation of 10 historic buildings for mixed-use development",
      "Creation of a 2-acre central plaza with green spaces and public art installations",
      "Implementation of smart city technologies for traffic management and public safety",
      "Upgrade of underground utilities and implementation of green infrastructure",
      "Development of a new public transit hub integrating bus, light rail, and bike-sharing services",
    ],
    timeline: [
      { phase: "Planning and Design", duration: "6 months" },
      { phase: "Historic Building Renovation", duration: "18 months" },
      { phase: "Infrastructure Upgrades", duration: "12 months" },
      { phase: "Public Space Development", duration: "9 months" },
      { phase: "Smart City Technology Implementation", duration: "6 months" },
      { phase: "Final Integration and Testing", duration: "3 months" },
    ],
    evaluationCriteria: [
      { criterion: "Technical Expertise and Innovation", weight: "30%" },
      { criterion: "Project Management and Timeline", weight: "25%" },
      { criterion: "Cost Effectiveness", weight: "20%" },
      { criterion: "Sustainability and Environmental Impact", weight: "15%" },
      { criterion: "Local Community Engagement and Benefits", weight: "10%" },
    ],
    submissionInstructions:
      "Interested parties should submit a comprehensive proposal including technical approach, project timeline, detailed budget, team composition, and relevant past project examples. All submissions must be received by 5:00 PM EST on October 1, 2023. Electronic submissions should be sent to rfp@metrocity.gov, or hard copies can be mailed to: Metro City Urban Development Office, 123 Main St, Metro City, USA 12345.",
  },
  {
    id: "2",
    name: "Green Energy Park",
    type: "Renewable Energy",
    budget: "$30M - $40M",
    location: "Sunnyvale, CA",
    deadline: "2024-06-30",
    overview:
      "The Green Energy Park project aims to create a large-scale renewable energy facility that combines solar and wind power generation with cutting-edge energy storage solutions. This initiative will significantly boost the region's clean energy production and serve as a model for sustainable power generation.",
    scopeOfWork: [
      "Installation of a 100MW solar panel array",
      "Construction of 20 wind turbines with a total capacity of 50MW",
      "Implementation of a 50MWh battery storage system",
      "Development of a smart grid system for efficient energy distribution",
      "Creation of an educational center for renewable energy technologies",
    ],
    timeline: [
      { phase: "Environmental Impact Assessment and Permitting", duration: "6 months" },
      { phase: "Site Preparation and Infrastructure Development", duration: "8 months" },
      { phase: "Solar Array Installation", duration: "6 months" },
      { phase: "Wind Turbine Construction", duration: "8 months" },
      { phase: "Energy Storage System Implementation", duration: "4 months" },
      { phase: "Smart Grid Integration and Testing", duration: "3 months" },
    ],
    evaluationCriteria: [
      { criterion: "Technical Innovation and Efficiency", weight: "35%" },
      { criterion: "Environmental Impact and Sustainability", weight: "25%" },
      { criterion: "Cost Effectiveness and Financial Viability", weight: "20%" },
      { criterion: "Project Management and Timeline", weight: "15%" },
      { criterion: "Community Benefits and Job Creation", weight: "5%" },
    ],
    submissionInstructions:
      "Proposals must be submitted electronically to greenenergy@sunnyvale.gov by 11:59 PM PST on March 31, 2024. Include detailed technical specifications, environmental impact assessments, financial projections, and a comprehensive project timeline. Questions can be directed to the Sunnyvale Sustainability Office at 555-123-4567.",
  },
  {
    id: "3",
    name: "Smart Highway Project",
    type: "Infrastructure",
    budget: "$100M - $150M",
    location: "Interstate 95",
    deadline: "2026-12-31",
    overview:
      "The Smart Highway Project is a groundbreaking initiative to upgrade a 100-mile stretch of Interstate 95 with cutting-edge technologies. This project aims to enhance safety, reduce congestion, and prepare our infrastructure for the future of transportation, including autonomous vehicles.",
    scopeOfWork: [
      "Installation of IoT sensors for real-time traffic and weather monitoring",
      "Implementation of an adaptive traffic management system",
      "Deployment of vehicle-to-infrastructure (V2I) communication technology",
      "Construction of smart electric vehicle charging stations",
      "Integration of solar panels in noise barriers for energy generation",
    ],
    timeline: [
      { phase: "Detailed Design and Engineering", duration: "12 months" },
      { phase: "Procurement and Contracting", duration: "6 months" },
      { phase: "Phase 1: Sensor Installation and Base Infrastructure", duration: "18 months" },
      { phase: "Phase 2: Smart Systems Integration", duration: "12 months" },
      { phase: "Phase 3: Advanced Features Implementation", duration: "12 months" },
      { phase: "Testing and Commissioning", duration: "6 months" },
    ],
    evaluationCriteria: [
      { criterion: "Technical Innovation and Interoperability", weight: "30%" },
      { criterion: "Safety Enhancements", weight: "25%" },
      { criterion: "Traffic Efficiency Improvements", weight: "20%" },
      { criterion: "Environmental Sustainability", weight: "15%" },
      { criterion: "Cost Effectiveness and Long-term Value", weight: "10%" },
    ],
    submissionInstructions:
      "Interested contractors should submit their proposals to smarthighway@dot.gov by 5:00 PM EST on June 30, 2024. Proposals must include detailed technical specifications, safety assessments, traffic flow simulations, and a phased implementation plan. A mandatory pre-bid conference will be held on March 15, 2024, at the Department of Transportation headquarters.",
  },
  {
    id: "4",
    name: "Sustainable Community Housing",
    type: "Residential",
    budget: "$25M - $35M",
    location: "Portland, OR",
    deadline: "2024-09-30",
    overview:
      "The Sustainable Community Housing project aims to create an innovative, mixed-income residential development that showcases the best practices in sustainable urban living. This project will provide affordable, environmentally friendly housing while fostering a strong sense of community.",
    scopeOfWork: [
      "Construction of 200 mixed-income housing units (50% affordable)",
      "Implementation of green building practices aiming for LEED Platinum certification",
      "Development of community gardens and shared green spaces",
      "Installation of renewable energy systems (solar and geothermal)",
      "Creation of a greywater recycling system and rainwater harvesting infrastructure",
    ],
    timeline: [
      { phase: "Community Engagement and Final Design", duration: "4 months" },
      { phase: "Permitting and Pre-construction", duration: "3 months" },
      { phase: "Site Preparation and Foundation Work", duration: "5 months" },
      { phase: "Building Construction", duration: "14 months" },
      { phase: "Sustainable Systems Installation", duration: "4 months" },
      { phase: "Landscaping and Community Space Development", duration: "3 months" },
    ],
    evaluationCriteria: [
      { criterion: "Sustainability and Energy Efficiency", weight: "30%" },
      { criterion: "Affordability and Social Impact", weight: "25%" },
      { criterion: "Innovative Design and Community Integration", weight: "20%" },
      { criterion: "Construction Quality and Durability", weight: "15%" },
      { criterion: "Project Management and Timeline", weight: "10%" },
    ],
    submissionInstructions:
      "Proposals must be submitted to housing@portland.gov by 11:59 PM PST on March 31, 2024. Include detailed architectural plans, sustainability strategies, community engagement plans, and financial models demonstrating long-term viability. A public presentation of shortlisted proposals will be held in May 2024.",
  },
  {
    id: "5",
    name: "Tech Hub Office Complex",
    type: "Commercial",
    budget: "$80M - $100M",
    location: "Austin, TX",
    deadline: "2025-03-31",
    overview:
      "The Tech Hub Office Complex project aims to create a state-of-the-art work environment designed to attract and nurture innovative technology companies. This development will serve as a cornerstone for Austin's growing tech ecosystem, providing flexible workspaces, advanced connectivity, and sustainable design.",
    scopeOfWork: [
      "Construction of a 500,000 sq ft office complex with flexible floor plans",
      "Implementation of a high-speed fiber optic network throughout the complex",
      "Development of collaborative spaces, including an innovation lab and startup incubator",
      "Installation of smart building systems for energy efficiency and space optimization",
      "Creation of green spaces and rooftop gardens for employee well-being",
    ],
    timeline: [
      { phase: "Architectural Design and City Approval", duration: "6 months" },
      { phase: "Site Preparation and Foundation Work", duration: "4 months" },
      { phase: "Core and Shell Construction", duration: "14 months" },
      { phase: "Interior Fit-out and Smart Systems Installation", duration: "8 months" },
      { phase: "Landscaping and Exterior Finishing", duration: "3 months" },
      { phase: "Final Testing and Commissioning", duration: "2 months" },
    ],
    evaluationCriteria: [
      { criterion: "Innovative Design and Flexibility", weight: "30%" },
      { criterion: "Technological Infrastructure", weight: "25%" },
      { criterion: "Sustainability and Energy Efficiency", weight: "20%" },
      { criterion: "Cost Effectiveness and ROI Potential", weight: "15%" },
      { criterion: "Local Economic Impact", weight: "10%" },
    ],
    submissionInstructions:
      "Proposals should be submitted electronically to techhub@austindevelopment.gov by 5:00 PM CST on September 30, 2024. Include comprehensive architectural plans, technology infrastructure designs, sustainability strategies, and economic impact projections. Shortlisted teams will be invited for in-person presentations in November 2024.",
  },
  {
    id: "6",
    name: "Coastal Resilience Initiative",
    type: "Environmental",
    budget: "$40M - $60M",
    location: "Miami, FL",
    deadline: "2025-06-30",
    overview:
      "The Coastal Resilience Initiative is a comprehensive project to enhance Miami's ability to withstand and adapt to the challenges posed by climate change, particularly sea-level rise and intensifying storms. This project combines innovative engineering solutions with nature-based approaches to protect our coastline and communities.",
    scopeOfWork: [
      "Construction of adaptive sea walls and storm surge barriers",
      "Implementation of nature-based solutions, including mangrove restoration and artificial reefs",
      "Development of water pumping and storage systems to manage flooding",
      "Creation of elevated greenways and public spaces for flood mitigation",
      "Installation of advanced monitoring and early warning systems",
    ],
    timeline: [
      { phase: "Environmental Impact Studies and Community Engagement", duration: "6 months" },
      { phase: "Detailed Engineering and Design", duration: "8 months" },
      { phase: "Permitting and Regulatory Approval", duration: "4 months" },
      { phase: "Phase 1: Critical Infrastructure Implementation", duration: "12 months" },
      { phase: "Phase 2: Nature-based Solutions", duration: "10 months" },
      { phase: "Phase 3: Monitoring Systems and Public Space Development", duration: "8 months" },
    ],
    evaluationCriteria: [
      { criterion: "Effectiveness of Proposed Solutions", weight: "35%" },
      { criterion: "Environmental Sustainability and Ecological Benefits", weight: "25%" },
      { criterion: "Innovation and Adaptability", weight: "20%" },
      { criterion: "Community Impact and Engagement", weight: "15%" },
      { criterion: "Cost Effectiveness and Long-term Viability", weight: "5%" },
    ],
    submissionInstructions:
      "Proposals must be submitted to resilience@miamigov.com by 11:59 PM EST on December 31, 2024. Include detailed engineering plans, environmental impact assessments, community engagement strategies, and long-term maintenance plans. A series of public workshops will be held in February 2025 to gather community input on shortlisted proposals.",
  },
]

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const project = projectsData.find((p) => p.id === params.id)

  if (!project) {
    return (
      <Layout>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h2 className="text-3xl font-bold tracking-tight">Project Not Found</h2>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-8 pt-6">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl font-bold">{project.name}</CardTitle>
                <CardDescription className="mt-2">
                  <Badge variant="outline">{project.type}</Badge>
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-lg">
                {project.budget}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {project.location}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Deadline: {project.deadline}
              </div>
            </div>

            <Separator />

            <section>
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Project Overview
              </h3>
              <p>{project.overview}</p>
            </section>

            <Separator />

            <section>
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <ClipboardList className="mr-2 h-5 w-5" />
                Scope of Work
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {project.scopeOfWork.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Project Timeline
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {project.timeline.map((phase, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{phase.phase}:</span>
                    <span>{phase.duration}</span>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            <section>
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <Scale className="mr-2 h-5 w-5" />
                Evaluation Criteria
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {project.evaluationCriteria.map((criterion, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{criterion.criterion}:</span>
                    <span>{criterion.weight}</span>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            <section>
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Submission Instructions
              </h3>
              <p>{project.submissionInstructions}</p>
            </section>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg">
              Submit Bid
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  )
}

