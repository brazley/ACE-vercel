"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface SavedChat {
  id: string
  messages: { role: 'user' | 'assistant'; content: string }[]
}

export default function SavedChatsPage() {
  const [savedChats, setSavedChats] = useState<SavedChat[]>([])

  useEffect(() => {
    const chats = JSON.parse(localStorage.getItem('savedChats') || '{}')
    setSavedChats(Object.entries(chats).map(([id, messages]) => ({ id, messages: messages as SavedChat['messages'] })))
  }, [])

  const handleDeleteChat = (id: string) => {
    const updatedChats = savedChats.filter(chat => chat.id !== id)
    setSavedChats(updatedChats)
    const chatsObject = updatedChats.reduce((acc, chat) => {
      acc[chat.id] = chat.messages
      return acc
    }, {} as Record<string, SavedChat['messages']>)
    localStorage.setItem('savedChats', JSON.stringify(chatsObject))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Saved Chats</h1>
      {savedChats.length === 0 ? (
        <p>No saved chats found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {savedChats.map((chat) => (
            <Card key={chat.id}>
              <CardHeader>
                <CardTitle>Chat {chat.id.slice(0, 8)}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {chat.messages[0]?.content.slice(0, 50)}...
                </p>
                <div className="flex justify-between">
                  <Button variant="outline" asChild>
                    <Link href={`/chat/${chat.id}`}>View Chat</Link>
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteChat(chat.id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

