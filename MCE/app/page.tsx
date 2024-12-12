import { PostForm } from "@/components/post-form"
import { PostFeed } from "@/components/post-feed"

export default function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to MCE</h1>
      <p className="text-xl">Connecting and empowering minority-owned companies in the construction industry.</p>
      <div className="space-y-6">
        <PostForm />
        <PostFeed />
      </div>
    </div>
  )
}

