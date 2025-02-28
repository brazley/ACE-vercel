"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
      <p className="text-xl text-muted-foreground mb-8">
        We apologize for the inconvenience. Our team has been notified and is working on a fix.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}

