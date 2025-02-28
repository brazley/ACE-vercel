import { list, del } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    // Get the folder from query params
    const { searchParams } = new URL(request.url)
    const folder = searchParams.get("folder") || ""

    // List all blobs in the specified folder
    const blobs = await list({ prefix: folder })

    return NextResponse.json({ blobs })
  } catch (error) {
    console.error("Error listing blobs:", error)
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get("url")

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 })
    }

    // Delete the blob
    await del(url)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blob:", error)
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 })
  }
}

