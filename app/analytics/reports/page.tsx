import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

const reports = [
  {
    id: 1,
    title: "The Future of AI in Construction: Revolutionizing the Industry",
    excerpt:
      "Artificial Intelligence is set to transform the construction sector, promising increased efficiency and safety. Here's how AI is shaping the future of building.",
    author: "Emily Chen",
    date: "May 15, 2023",
    image: "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?q=80&w=3271&auto=format&fit=crop",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Sustainable Materials: Building a Greener Tomorrow",
    excerpt:
      "Explore the latest innovations in eco-friendly construction materials that are not only good for the environment but also cost-effective in the long run.",
    author: "Michael Green",
    date: "May 10, 2023",
    image: "https://images.unsplash.com/photo-1533378890784-b2a5b0a59d40?q=80&w=3474&auto=format&fit=crop",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "The Rise of Modular Construction: Faster, Cheaper, Smarter",
    excerpt:
      "Modular construction is gaining traction in the industry. Learn about its benefits, challenges, and why it might be the future of construction.",
    author: "Sarah Johnson",
    date: "May 5, 2023",
    image: "https://images.unsplash.com/photo-1498631906572-66c58d46ecf7?q=80&w=3383&auto=format&fit=crop",
    readTime: "6 min read",
  },
]

export default function ReportsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Industry Reports</h1>
        <div className="grid gap-8">
          {reports.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <Image
                    src={report.image}
                    alt={report.title}
                    width={300}
                    height={200}
                    className="h-48 w-full object-cover md:h-full md:w-48"
                  />
                </div>
                <div className="p-8">
                  <CardHeader className="p-0">
                    <CardTitle className="text-xl font-semibold mb-2">
                      <Link href={`/analytics/reports/${report.id}`} className="hover:underline">
                        {report.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="mt-2 text-gray-500">{report.excerpt}</p>
                    <div className="mt-4 flex items-center">
                      <div className="text-sm">
                        <p className="text-gray-900 font-medium">{report.author}</p>
                        <p className="text-gray-500">
                          {report.date} · {report.readTime}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

