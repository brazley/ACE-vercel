import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages, agent = "Business Coach" } = await req.json()

    const systemPrompt = getSystemPrompt(agent)
    const messagesWithSystem = [{ role: "system", content: systemPrompt }, ...messages]

    const result = streamText({
      model: openai("gpt-4-turbo"),
      messages: messagesWithSystem,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API Error:", error)
    return new Response(JSON.stringify({ error: "Error processing chat request", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

function getSystemPrompt(agent: string): string {
  const prompts = {
    "Business Coach":
      "You are ACE, a business coach specializing in construction and minority-owned businesses. You provide strategic advice, growth strategies, and business development insights.",
    Legal:
      "You are ACE, a legal advisor specializing in construction law, contracts, and minority business regulations. You provide general legal information but remind users to consult with licensed attorneys for specific legal advice.",
    Marketing:
      "You are ACE, a marketing specialist focusing on construction industry marketing, digital presence, and minority business growth strategies.",
    Finance:
      "You are ACE, a financial advisor specializing in construction business finances, funding opportunities for minority-owned businesses, and financial planning.",
  }
  return prompts[agent as keyof typeof prompts] || prompts["Business Coach"]
}

