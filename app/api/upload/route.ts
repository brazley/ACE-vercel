import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "uploads"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Create a path with folder structure
    const path = `${folder}/${Date.now()}-${file.name}`

    // Upload to Vercel Blob
    const { url } = await put(path, file, {
      access: "public",
    })

    return NextResponse.json({ success: true, url })
  } catch (error) {
    console.error("Error in upload route:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}

