"use client"

import { useChat } from "ai/react"
import { useParams } from "next/navigation"
import { ChatHeader } from "@/components/chat-header"
import { ChatList } from "@/components/chat-list"
import { ChatPanel } from "@/components/chat-panel"
import { useState } from "react"

export default function ChatPage() {
  const [agent, setAgent] = useState("Business Coach")
  const params = useParams<{ id: string }>()

  const { messages, input, handleInputChange, handleSubmit, isLoading, reload, error } = useChat({
    api: "/api/chat",
    id: params.id,
    body: {
      agent,
      id: params.id,
    },
    initialMessages: [],
  })

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
      <ChatHeader agent={agent} onAgentChange={setAgent} onClearChat={reload} />
      <ChatList messages={messages} isLoading={isLoading} />
      <ChatPanel
        id={params.id}
        isLoading={isLoading}
        error={error}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

