"use client"

import { useParams, useRouter } from "next/navigation"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ArrowLeft, MapPin, Phone, Mail, Globe, Award, Calendar, DollarSign, Users, Briefcase } from "lucide-react"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("@/components/map"), { ssr: false })

const contractorsData = [
  {
    id: "1",
    name: "Skyline Builders",
    specialty: "Commercial Construction",
    yearsInBusiness: 15,
    rating: 4.8,
    location: "New York, NY",
    address: "123 Broadway, New York, NY 10007",
    phone: "(212) 555-1234",
    email: "info@skylinebuilders.com",
    website: "https://www.skylinebuilders.com",
    description:
      "Skyline Builders is a leading commercial construction company with a focus on innovative and sustainable building practices. With 15 years of experience, we've shaped the New York City skyline and beyond.",
    keyProjects: ["Empire State Building Renovation", "Central Park Tower Construction", "Hudson Yards Development"],
    certifications: ["LEED Certified", "ISO 9001:2015"],
    employeeCount: 500,
    annualRevenue: "$100M - $500M",
    naicsCodes: ["236220", "237310"],
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: "2",
    name: "GreenTech Homes",
    specialty: "Sustainable Residential Construction",
    yearsInBusiness: 8,
    rating: 4.6,
    location: "Portland, OR",
    address: "456 Eco Lane, Portland, OR 97201",
    phone: "(503) 555-5678",
    email: "hello@greentechhomes.com",
    website: "https://www.greentechhomes.com",
    description:
      "GreenTech Homes is at the forefront of sustainable residential construction. We specialize in building energy-efficient, environmentally friendly homes that minimize carbon footprint without compromising on comfort or style.",
    keyProjects: [
      "EcoVillage Community Development",
      "Net-Zero Energy Home Showcase",
      "Portland Green Apartment Complex",
    ],
    certifications: ["ENERGY STAR Certified", "Passive House Certified"],
    employeeCount: 75,
    annualRevenue: "$10M - $50M",
    naicsCodes: ["236115", "236118"],
    coordinates: { lat: 45.5155, lng: -122.6789 },
  },
  {
    id: "3",
    name: "Urban Renovators",
    specialty: "Interior Remodeling",
    yearsInBusiness: 12,
    rating: 4.7,
    location: "Chicago, IL",
    address: "789 Renovation Ave, Chicago, IL 60601",
    phone: "(312) 555-9012",
    email: "info@urbanrenovators.com",
    website: "https://www.urbanrenovators.com",
    description:
      "Urban Renovators specializes in transforming interior spaces in the heart of Chicago. From historic brownstones to modern condos, we bring fresh life to urban dwellings with our innovative designs and quality craftsmanship.",
    keyProjects: [
      "Chicago Theatre Lobby Restoration",
      "Millennium Park Loft Conversions",
      "Navy Pier Restaurant Redesign",
    ],
    certifications: ["NARI Certified Remodeler", "EPA Lead-Safe Certified"],
    employeeCount: 50,
    annualRevenue: "$5M - $10M",
    naicsCodes: ["236118", "238350"],
    coordinates: { lat: 41.8781, lng: -87.6298 },
  },
  {
    id: "4",
    name: "Precision Paving",
    specialty: "Road Construction",
    yearsInBusiness: 20,
    rating: 4.9,
    location: "Houston, TX",
    address: "1010 Asphalt Rd, Houston, TX 77001",
    phone: "(713) 555-3456",
    email: "info@precisionpaving.com",
    website: "https://www.precisionpaving.com",
    description:
      "Precision Paving is Texas' premier road construction company. With two decades of experience, we specialize in building and maintaining high-quality, durable roads that connect communities across the Lone Star State.",
    keyProjects: ["I-10 Highway Expansion", "Houston Downtown Street Renovation", "Texas Medical Center Access Road"],
    certifications: ["TxDOT Pre-Qualified Contractor", "OSHA 30 Certified"],
    employeeCount: 200,
    annualRevenue: "$50M - $100M",
    naicsCodes: ["237310", "237990"],
    coordinates: { lat: 29.7604, lng: -95.3698 },
  },
  {
    id: "5",
    name: "Aqua Systems",
    specialty: "Water Infrastructure",
    yearsInBusiness: 18,
    rating: 4.5,
    location: "Miami, FL",
    address: "2020 Water Way, Miami, FL 33101",
    phone: "(305) 555-7890",
    email: "contact@aquasystems.com",
    website: "https://www.aquasystems.com",
    description:
      "Aqua Systems is dedicated to building and maintaining robust water infrastructure. From advanced water treatment plants to innovative stormwater management systems, we ensure communities have access to clean, safe water.",
    keyProjects: [
      "Miami-Dade Water Treatment Facility Upgrade",
      "Everglades Restoration Project",
      "South Beach Flood Mitigation System",
    ],
    certifications: ["AWWA Certified", "Florida Water and Pollution Control Operators Association Certified"],
    employeeCount: 150,
    annualRevenue: "$25M - $50M",
    naicsCodes: ["237110", "237990"],
    coordinates: { lat: 25.7617, lng: -80.1918 },
  },
  {
    id: "6",
    name: "SteelWorks Inc.",
    specialty: "Steel Fabrication and Erection",
    yearsInBusiness: 25,
    rating: 4.8,
    location: "Pittsburgh, PA",
    address: "3030 Steel Ave, Pittsburgh, PA 15222",
    phone: "(412) 555-2345",
    email: "info@steelworksinc.com",
    website: "https://www.steelworksinc.com",
    description:
      "SteelWorks Inc. has been a cornerstone of Pittsburgh's construction industry for a quarter century. We specialize in custom steel fabrication and precision erection for projects ranging from skyscrapers to bridges.",
    keyProjects: [
      "Pittsburgh International Airport Modernization",
      "Monongahela River Bridge Reconstruction",
      "U.S. Steel Tower Renovation",
    ],
    certifications: ["AISC Certified Fabricator", "AWS Certified Welding Fabricator"],
    employeeCount: 300,
    annualRevenue: "$75M - $150M",
    naicsCodes: ["238120", "332312"],
    coordinates: { lat: 40.4406, lng: -79.9959 },
  },
  {
    id: "7",
    name: "ElectroPro Solutions",
    specialty: "Electrical Systems",
    yearsInBusiness: 10,
    rating: 4.6,
    location: "San Francisco, CA",
    address: "4040 Circuit St, San Francisco, CA 94105",
    phone: "(415) 555-6789",
    email: "hello@electroprosolutions.com",
    website: "https://www.electroprosolutions.com",
    description:
      "ElectroPro Solutions is at the cutting edge of electrical systems installation and maintenance. We specialize in smart building technologies, renewable energy integration, and high-efficiency electrical solutions for the Bay Area's most innovative structures.",
    keyProjects: [
      "Salesforce Tower Electrical Systems",
      "Golden Gate Bridge Lighting Upgrade",
      "San Francisco International Airport Terminal 1 Redevelopment",
    ],
    certifications: ["NECA Certified", "California Certified Electrician"],
    employeeCount: 100,
    annualRevenue: "$15M - $30M",
    naicsCodes: ["238210"],
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: "8",
    name: "EcoLandscapes",
    specialty: "Landscape Architecture",
    yearsInBusiness: 7,
    rating: 4.7,
    location: "Denver, CO",
    address: "5050 Green Blvd, Denver, CO 80202",
    phone: "(303) 555-0123",
    email: "design@ecolandscapes.com",
    website: "https://www.ecolandscapes.com",
    description:
      "EcoLandscapes is redefining urban green spaces in the Mile High City. We create sustainable, water-efficient landscapes that celebrate Colorado's natural beauty while meeting the unique challenges of the region's climate.",
    keyProjects: [
      "Denver Botanic Gardens Renovation",
      "Red Rocks Park Sustainable Landscaping",
      "Cherry Creek Trail Extension",
    ],
    certifications: ["ASLA Professional", "LEED AP"],
    employeeCount: 40,
    annualRevenue: "$5M - $10M",
    naicsCodes: ["561730"],
    coordinates: { lat: 39.7392, lng: -104.9903 },
  },
]

export default function ContractorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const contractor = contractorsData.find((c) => c.id === params.id)

  if (!contractor) {
    return (
      <Layout>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <h2 className="text-3xl font-bold tracking-tight">Contractor Not Found</h2>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex-1 space-y-6 p-8 pt-6">
        <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Contractors
        </Button>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl font-bold">{contractor.name}</CardTitle>
                <CardDescription>
                  <div className="flex items-center mt-2">
                    <Badge variant="outline" className="mr-2">
                      {contractor.specialty}
                    </Badge>
                  </div>
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-lg">
                Rating: {contractor.rating.toFixed(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  {contractor.address}
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  {contractor.phone}
                </div>
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  {contractor.email}
                </div>
                <div className="flex items-center">
                  <Globe className="mr-2 h-4 w-4" />
                  <a
                    href={contractor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {contractor.website}
                  </a>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Years in Business: {contractor.yearsInBusiness}
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Employees: {contractor.employeeCount}
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Annual Revenue: {contractor.annualRevenue}
                </div>
                <div className="flex items-center">
                  <Briefcase className="mr-2 h-4 w-4" />
                  NAICS Codes: {contractor.naicsCodes.join(", ")}
                </div>
              </div>
            </div>

            <Separator />

            <section>
              <h3 className="text-xl font-semibold mb-2">About</h3>
              <p>{contractor.description}</p>
            </section>

            <Separator />

            <section>
              <h3 className="text-xl font-semibold mb-2">Key Projects</h3>
              <ul className="list-disc pl-5">
                {contractor.keyProjects.map((project, index) => (
                  <li key={index}>{project}</li>
                ))}
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-xl font-semibold mb-2">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {contractor.certifications.map((cert, index) => (
                  <Badge key={index} variant="secondary">
                    <Award className="mr-1 h-4 w-4" />
                    {cert}
                  </Badge>
                ))}
              </div>
            </section>

            <Separator />

            <section>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <div className="h-64 rounded-md overflow-hidden">
                <Map center={contractor.coordinates} zoom={13} />
              </div>
            </section>
          </CardContent>
          <CardFooter>
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full" size="lg">
                  Contact Contractor
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Contact {contractor.name}</SheetTitle>
                  <SheetDescription>Get in touch with {contractor.name} for your project needs.</SheetDescription>
                </SheetHeader>
                {/* Add contact form or additional information here */}
              </SheetContent>
            </Sheet>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  )
}

