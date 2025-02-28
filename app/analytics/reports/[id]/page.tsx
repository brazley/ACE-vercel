"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Layout } from "@/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"

const article = {
  id: 1,
  title: "The Future of AI in Construction: Revolutionizing the Industry",
  content: `
    <p>Artificial Intelligence (AI) is poised to revolutionize the construction industry, promising increased efficiency, improved safety, and enhanced decision-making capabilities. As we stand on the brink of this technological transformation, it's crucial to understand how AI will shape the future of building and what it means for professionals in the field.</p>

    <h2>Enhanced Project Planning and Design</h2>
    <p>AI-powered software is already being used to optimize building designs and project plans. These tools can analyze vast amounts of data, including site conditions, building codes, and material properties, to generate optimal designs that maximize efficiency and minimize costs. As AI continues to evolve, we can expect even more sophisticated planning tools that can predict potential issues and suggest solutions before construction even begins.</p>

    <h2>Improved Safety and Risk Management</h2>
    <p>Safety is paramount in construction, and AI is set to play a significant role in reducing workplace accidents. Machine learning algorithms can analyze data from wearable devices and site sensors to identify potential safety hazards in real-time. Additionally, AI-powered computer vision systems can monitor construction sites 24/7, alerting supervisors to any unsafe conditions or practices.</p>

    <h2>Autonomous Equipment and Robotics</h2>
    <p>The integration of AI with construction equipment is leading to the development of autonomous and semi-autonomous machines. These smart machines can perform repetitive tasks with greater precision and efficiency than their human counterparts, potentially reducing labor costs and improving project timelines. From bricklaying robots to autonomous excavators, the future of construction sites may look very different from what we see today.</p>

    <h2>Predictive Maintenance and Asset Management</h2>
    <p>AI algorithms can analyze data from sensors embedded in buildings and infrastructure to predict when maintenance will be required. This proactive approach to asset management can significantly reduce downtime and extend the lifespan of buildings and equipment. For facility managers, this means more efficient operations and reduced maintenance costs over time.</p>

    <h2>Challenges and Considerations</h2>
    <p>While the potential benefits of AI in construction are immense, there are also challenges to consider. The implementation of AI systems requires significant investment in technology and training. There are also concerns about data privacy and security, as well as the potential displacement of certain job roles. Industry leaders will need to navigate these challenges carefully to fully realize the benefits of AI while mitigating potential drawbacks.</p>

    <h2>Conclusion</h2>
    <p>The integration of AI into the construction industry is not just a possibility but an inevitability. As we move forward, it's crucial for construction professionals to stay informed about these technological advancements and be prepared to adapt to new ways of working. The future of construction is smart, efficient, and AI-driven – and it's arriving faster than we might think.</p>
  `,
  author: {
    name: "Emily Chen",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Emily Chen is a technology journalist specializing in the intersection of AI and traditional industries. With over a decade of experience, she has written for leading tech publications and is a frequent speaker at industry conferences.",
  },
  date: "May 15, 2023",
  readTime: "5 min read",
  heroImage: "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?q=80&w=3271&auto=format&fit=crop",
  gallery: [
    "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?q=80&w=3271&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1533378890784-b2a5b0a59d40?q=80&w=3474&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498631906572-66c58d46ecf7?q=80&w=3383&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?q=80&w=3271&auto=format&fit=crop",
  ],
}

export default function ArticlePage() {
  const params = useParams()
  const [currentSlide, setCurrentSlide] = useState(0)

  // In a real application, you would fetch the article based on the ID
  // For this example, we're using the hardcoded article

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="overflow-hidden">
          <div className="relative h-[400px] w-full">
            <Image src={article.heroImage} alt={article.title} layout="fill" objectFit="cover" />
          </div>
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center mb-6">
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={article.author.image} alt={article.author.name} />
                <AvatarFallback>{article.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{article.author.name}</p>
                <p className="text-sm text-gray-500">
                  {article.date} · {article.readTime}
                </p>
              </div>
            </div>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />

            <h2 className="text-2xl font-bold mt-8 mb-4">Image Gallery</h2>
            <Carousel className="w-full max-w-xs mx-auto">
              <CarouselContent>
                {article.gallery.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <Image
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            width={300}
                            height={300}
                            className="object-cover"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            <div className="mt-8 p-6 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">About the Author</h3>
              <p>{article.author.bio}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

