"use client"

import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface PostFormProps {
  projectId?: string
  projectName?: string
  onPostCreated?: () => void
}

export function PostForm({ projectId, projectName, onPostCreated }: PostFormProps) {
  const [content, setContent] = useState('')
  //const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    //if (!user || !content.trim()) return

    if (!content.trim()) return

    try {
      await addDoc(collection(db, 'posts'), {
        //authorId: user.uid,
        //authorName: user.displayName,
        //authorPhoto: user.photoURL,
        content,
        timestamp: serverTimestamp(),
        likes: [],
        comments: 0,
        projectId,
        projectName,
      })

      setContent('')
      if (onPostCreated) {
        onPostCreated()
      }
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-4">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          {projectId && (
            <span className="text-sm text-gray-500">
              Sharing project: {projectName}
            </span>
          )}
          <Button type="submit" disabled={!content.trim()}>Post</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

