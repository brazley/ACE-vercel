"use client"

import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const savedChats = [
  {
    id: 1,
    title: "Business Strategy Discussion",
    summary: "Discussed Q4 goals and expansion plans",
    agent: "Business Coach",
    timestamp: "2023-05-15 14:30",
  },
  {
    id: 2,
    title: "Contract Review",
    summary: "Analyzed new vendor agreement",
    agent: "Legal",
    timestamp: "2023-05-14 11:15",
  },
  {
    id: 3,
    title: "Marketing Campaign Planning",
    summary: "Brainstormed ideas for summer promotion",
    agent: "Marketing",
    timestamp: "2023-05-13 09:45",
  },
  {
    id: 4,
    title: "Financial Forecast",
    summary: "Reviewed Q2 projections and budget allocations",
    agent: "Finance",
    timestamp: "2023-05-12 16:20",
  },
  {
    id: 5,
    title: "Team Performance Review",
    summary: "Discussed strategies to improve team productivity",
    agent: "Business Coach",
    timestamp: "2023-05-11 13:00",
  },
]

export default function SavedChatsPage() {
  const router = useRouter()
  return (
    <Layout>
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Saved Chats</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Date/Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savedChats.map((chat) => (
                <TableRow key={chat.id}>
                  <TableCell className="font-medium">{chat.title}</TableCell>
                  <TableCell>{chat.summary}</TableCell>
                  <TableCell>{chat.agent}</TableCell>
                  <TableCell>{chat.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  )
}

