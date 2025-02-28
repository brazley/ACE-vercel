"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, BarChart, ListTodo, FileText, Users, Eye, Star } from "lucide-react"
import { DataTable } from "@/components/data-table/data-table"
import { Badge } from "@/components/ui/badge"
import { Overview } from "@/components/dashboard/overview"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { InvoiceView } from "@/components/invoice-view"
import { CashFlowChart } from "@/components/cash-flow-chart"

// Mock data for projects
const projectsData = [
  { id: "1", name: "Downtown Revitalization", type: "Urban Development", budget: "$50M - $75M", status: "In Progress" },
  { id: "2", name: "Green Energy Park", type: "Renewable Energy", budget: "$30M - $40M", status: "Planning" },
  { id: "3", name: "Smart Highway Project", type: "Infrastructure", budget: "$100M - $150M", status: "Bidding" },
  { id: "4", name: "Sustainable Community Housing", type: "Residential", budget: "$25M - $35M", status: "Completed" },
]

const projectColumns = [
  {
    accessorKey: "name",
    header: "Project Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "budget",
    header: "Budget",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      return <Badge variant={status === "Completed" ? "success" : "secondary"}>{status}</Badge>
    },
  },
]

// Mock data for invoices
const invoicesData = [
  {
    id: "INV001",
    project: "Downtown Revitalization",
    contractor: "ABC Construction",
    status: "Paid",
    amount: "$250,000",
  },
  { id: "INV002", project: "Green Energy Park", contractor: "EcoBuilders Inc.", status: "Pending", amount: "$180,000" },
  {
    id: "INV003",
    project: "Smart Highway Project",
    contractor: "TechRoads Co.",
    status: "Overdue",
    amount: "$500,000",
  },
  {
    id: "INV004",
    project: "Sustainable Community Housing",
    contractor: "GreenHomes LLC",
    status: "Paid",
    amount: "$320,000",
  },
]

const invoiceColumns = [
  {
    accessorKey: "id",
    header: "Invoice ID",
  },
  {
    accessorKey: "project",
    header: "Project",
  },
  {
    accessorKey: "contractor",
    header: "Contractor",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      let badgeVariant = "secondary"
      if (status === "Paid") badgeVariant = "success"
      if (status === "Overdue") badgeVariant = "destructive"
      return <Badge variant={badgeVariant}>{status}</Badge>
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Invoice {row.original.id}</DialogTitle>
            </DialogHeader>
            <InvoiceView invoice={row.original} />
          </DialogContent>
        </Dialog>
      )
    },
  },
]

// Mock data for contractors
const contractorsData = [
  {
    id: "1",
    name: "Skyline Builders",
    specialty: "Commercial Construction",
    yearsInBusiness: 15,
    rating: 4.8,
    location: "New York, NY",
  },
  {
    id: "2",
    name: "GreenTech Homes",
    specialty: "Sustainable Residential Construction",
    yearsInBusiness: 8,
    rating: 4.6,
    location: "Portland, OR",
  },
  {
    id: "3",
    name: "Urban Renovators",
    specialty: "Interior Remodeling",
    yearsInBusiness: 12,
    rating: 4.7,
    location: "Chicago, IL",
  },
  {
    id: "4",
    name: "Precision Paving",
    specialty: "Road Construction",
    yearsInBusiness: 20,
    rating: 4.9,
    location: "Houston, TX",
  },
]

const contractorColumns = [
  {
    accessorKey: "name",
    header: "Company Name",
  },
  {
    accessorKey: "specialty",
    header: "Specialty",
  },
  {
    accessorKey: "yearsInBusiness",
    header: "Years in Business",
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating") as number
      return <Badge variant="secondary">{rating.toFixed(1)}</Badge>
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    id: "favorite",
    header: "Favorite",
    cell: ({ row }) => {
      const [isFavorite, setIsFavorite] = useState(false)
      return (
        <Button variant="ghost" size="sm" onClick={() => setIsFavorite(!isFavorite)}>
          <Star className={isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"} />
        </Button>
      )
    },
  },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const isAdminMode = localStorage.getItem("adminMode") === "true"
    if (!isAdminMode) {
      router.push("/")
    }
  }, [router])

  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button asChild className="bg-black text-white hover:bg-black/90 rounded-md">
              <Link href="/admin/projects/add" className="flex items-center px-4 py-2">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Project
              </Link>
            </Button>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="contractors">Contractors</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          {/* Tab contents */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                  <ListTodo className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Contractors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">145</div>
                  <p className="text-xs text-muted-foreground">+18 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$5.2M</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">-3 from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>All Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={projectColumns} data={projectsData} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="contractors">
            <Card>
              <CardHeader>
                <CardTitle>Contractor Management</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable columns={contractorColumns} data={contractorsData} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="invoices">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Invoices</CardTitle>
                <Button asChild className="bg-black text-white hover:bg-black/90 rounded-full">
                  <Link href="/admin/invoices/new" className="flex items-center px-4 py-2">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Invoice
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <DataTable columns={invoiceColumns} data={invoicesData} />
                <div className="mt-6">
                  <CashFlowChart />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Business Intelligence Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Project Performance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">On-Time Completion Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">87%</div>
                          <p className="text-xs text-muted-foreground">+5% from last quarter</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Average Budget Variance</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">-2.3%</div>
                          <p className="text-xs text-muted-foreground">Improved from -3.7% last quarter</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Client Satisfaction Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">4.7/5</div>
                          <p className="text-xs text-muted-foreground">+0.2 from last quarter</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Financial Metrics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Gross Profit Margin</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">32%</div>
                          <p className="text-xs text-muted-foreground">+3% year-over-year</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Average Days Sales Outstanding</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">45 days</div>
                          <p className="text-xs text-muted-foreground">-5 days from last quarter</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Return on Investment (ROI)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">18.5%</div>
                          <p className="text-xs text-muted-foreground">+2.1% year-over-year</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

