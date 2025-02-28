import { put } from "@vercel/blob"

/**
 * Uploads a file to Vercel Blob storage
 * @param file The file to upload
 * @param folder Optional folder path to organize files
 * @returns The URL of the uploaded file
 */
export async function uploadToBlob(file: File, folder = "uploads"): Promise<string> {
  try {
    // Create a path with folder structure
    const path = `${folder}/${Date.now()}-${file.name}`

    // Upload to Vercel Blob
    const { url } = await put(path, file, {
      access: "public",
    })

    return url
  } catch (error) {
    console.error("Error uploading to Blob:", error)
    throw new Error("Failed to upload file. Please try again.")
  }
}

/**
 * Uploads multiple files to Vercel Blob storage
 * @param files The files to upload
 * @param folder Optional folder path to organize files
 * @returns Array of URLs of the uploaded files
 */
export async function uploadMultipleToBlob(files: FileList, folder = "uploads"): Promise<string[]> {
  try {
    const uploadPromises = Array.from(files).map((file) => uploadToBlob(file, folder))
    return await Promise.all(uploadPromises)
  } catch (error) {
    console.error("Error uploading multiple files to Blob:", error)
    throw new Error("Failed to upload files. Please try again.")
  }
}

