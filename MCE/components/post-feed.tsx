"use client"

import { useState, useEffect } from 'react'
import { collection, query, orderBy, limit, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react'
import Link from 'next/link'

interface Post {
  id: string
  authorId: string
  authorName: string
  authorPhoto: string
  content: string
  timestamp: any
  likes: string[]
  comments: number
  projectId?: string
  projectName?: string
}

export function PostFeed() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const postsQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'), limit(20))
    const querySnapshot = await getDocs(postsQuery)
    const fetchedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post))
    setPosts(fetchedPosts)
  }

  const handleLike = async (postId: string) => {
    const postRef = doc(db, 'posts', postId)
    const post = posts.find(p => p.id === postId)
    if (post?.likes) {
      if (post.likes.length > 0) {
        await updateDoc(postRef, {
          likes: arrayRemove(post.likes[0])
        })
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion("placeholder")
        })
      }
    }
    fetchPosts() 
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={post.authorPhoto} />
                <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.authorName}</p>
                <p className="text-sm text-gray-500">{post.timestamp.toDate().toLocaleString()}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
            {post.projectId && (
              <div className="mt-4">
                <Link href={`/projects/${post.projectId}`} className="text-blue-500 hover:underline">
                  View Project: {post.projectName}
                </Link>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                <ThumbsUp className={`w-4 h-4 mr-2 ${post.likes.length > 0 ? 'fill-current text-blue-500' : ''}`} />
                {post.likes.length}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                {post.comments}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

