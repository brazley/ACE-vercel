"use client"

import { Layout } from "@/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const organizations = [
  {
    name: "Builders Exchange",
    image: "https://www.bxkentucky.com/wp-content/uploads/2023/10/bx-kentucky-logo-final.png",
    website: "http://www.bxkentucky.com/",
  },
  {
    name: "Louisville Water",
    image: "https://theme.zdassets.com/theme_assets/10935684/25bd95f85b0a2898e7e6425e7c92e7df953fc532.png",
    website: "https://www.lwckyplanroom.com/View/Default.aspx",
  },
  {
    name: "Lynn Imaging",
    image: "https://www.lynnimaging.com/wp-content/uploads/thegem-logos/logo_0603638931f42a3f711977a0886e1a75_2x.png",
    website: "https://www.lynnimaging.com/",
  },
  {
    name: "KY State Plan Room",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Seal_of_Kentucky.svg/2048px-Seal_of_Kentucky.svg.png",
    website: "https://www.stateofkyplanroom.com/View/ViewJobList.aspx?group_id=public_all",
  },
  {
    name: "Louisville Ky",
    image: "https://upload.wikimedia.org/wikipedia/en/d/db/200px-Louisville_Kentucky_seal.png",
    website: "https://louisvilleky.gov/",
  },
  {
    name: "University of Louisville",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/University_of_Louisville_seal.svg/800px-University_of_Louisville_seal.svg.png",
    website: "https://www.uoflplanroom.com/View/ViewJobList.aspx?group_id=public_all",
  },
  {
    name: "University of Kentucky",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Kentucky_Wildcats_logo.svg/2503px-Kentucky_Wildcats_logo.svg.png",
    website: "https://www.ukplanroom.com/View/ViewJob.aspx?job_id=14909&view=vp",
  },
  {
    name: "Louisville MSD",
    image:
      "https://content.govdelivery.com/attachments/fancy_images/KYLOUISVILLE/2024/02/8956548/msd-logo_original.png",
    website: "https://www.msdbids.com/construction/View/ViewJobList.aspx?group_id=public_all",
  },
  {
    name: "Western Kentucky University",
    image:
      "https://images.sidearmdev.com/resize?url=https%3A%2F%2Fwkusports.com%2Fimages%2F2021%2F6%2F24%2Fwku_red_towel.jpg&width=1600",
    website: "https://www.wkuplanroom.com/View/ViewJobList.aspx?group_id=public_all",
  },
  {
    name: "Zen Reprographics",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQVV9wHy3WKu4PcVbIgOw_CTgCRG5nhzqhQ&s",
    website: "https://www.zenreproplanroom.com/",
  },
]

export default function PlanRoomPage() {
  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Plan Room</h1>
            <p className="text-muted-foreground">
              Access construction documents and bidding information from our partner organizations.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {organizations.map((org) => (
              <Link key={org.name} href={org.website} target="_blank" rel="noopener noreferrer" className="block">
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="aspect-[3/2] relative mb-4">
                      <Image
                        src={org.image || "/placeholder.svg"}
                        alt={`${org.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-center font-semibold">{org.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

