"use client"

import type React from "react"

import { useChat } from "ai/react"
import { useState, useRef, useEffect } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { Paperclip, Send, Trash2 } from "lucide-react"
import { ChatMessage } from "@/components/chat/chat-message"
import { ChatScrollAnchor } from "@/components/chat/chat-scroll-anchor"
import { useToast } from "@/components/ui/use-toast"
import { put } from "@vercel/blob"

export default function AcePage() {
  const [selectedAgent, setSelectedAgent] = useState("Business Coach")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [attachment, setAttachment] = useState<File | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN is not set")
      toast({
        title: "Configuration Error",
        description: "File uploads are currently unavailable. Please contact support.",
        variant: "destructive",
      })
    }
  }, [toast])

  const { messages, input, handleInputChange, handleSubmit, isLoading, reload, error } = useChat({
    api: "/api/chat",
    body: {
      agent: selectedAgent,
    },
    onError: (error) => {
      console.error("Chat error:", error)
      toast({
        title: "Error",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      })
    },
  })

  useEffect(() => {
    if (error) {
      console.error("Chat error:", error)
      toast({
        title: "Error",
        description: `An error occurred: ${error.message || "Unknown error"}`,
        variant: "destructive",
      })
    }
  }, [error, toast])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "File size exceeds 5MB limit",
          variant: "destructive",
        })
        return
      }
      setAttachment(file)
    }
  }

  const handleClearChat = () => {
    reload()
    toast({
      title: "Chat cleared",
      description: "The chat has been reset.",
    })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      let attachmentUrl = ""
      if (attachment) {
        const { url } = await put(`chat-attachments/${attachment.name}`, attachment, { access: "public" })
        attachmentUrl = url
      }

      const messageContent = attachmentUrl ? `[Attached file: ${attachment.name}](${attachmentUrl})\n${input}` : input

      await handleSubmit(e, { input: messageContent })
      setAttachment(null)
    } catch (error) {
      console.error("Error submitting message:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Layout>
      <Card className="w-full h-[calc(100vh-4rem)] relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>ACE Chat</CardTitle>
          <div className="flex items-center space-x-2">
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Business Coach">Business Coach</SelectItem>
                <SelectItem value="Legal">Legal</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleClearChat}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" asChild>
              <Link href="/saved-chats">Saved Chats</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-[calc(100vh-12rem)] p-4 pb-20 border rounded-md">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} isLoading={isLoading && index === messages.length - 1} />
            ))}
            <ChatScrollAnchor trackVisibility={isLoading} />
          </ScrollArea>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit(e)
            }}
            className="absolute bottom-0 left-0 right-0 bg-background p-4 border-t flex space-x-2"
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
              accept=".txt,.pdf,.doc,.docx"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message here..."
              className="flex-1 min-h-[40px] max-h-[200px] resize-none overflow-y-auto"
              style={{ height: "40px" }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  onSubmit(e as any)
                }
              }}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </Layout>
  )
}

