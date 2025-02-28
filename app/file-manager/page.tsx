"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Download, RefreshCw, FolderOpen, Eye, Upload } from "lucide-react"
import Image from "next/image"
import { format } from "date-fns"
import { CSVViewer } from "@/components/csv-viewer"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface BlobFile {
  url: string
  pathname: string
  contentType: string
  size: number
  uploadedAt: Date
}

export default function FileManagerPage() {
  const [files, setFiles] = useState<BlobFile[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFolder, setActiveFolder] = useState("Ace Drive")
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [selectedCSV, setSelectedCSV] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const multiFileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    async function fetchFiles() {
      try {
        setLoading(true)
        const response = await fetch(`/api/blob?folder=${activeFolder}`)
        const data = await response.json()

        if (data.blobs && data.blobs.blobs) {
          setFiles(data.blobs.blobs)
        } else {
          setFiles([])
        }
      } catch (error) {
        console.error("Error fetching files:", error)
        setFiles([])
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [activeFolder, refreshTrigger])

  const handleDeleteFile = async (url: string) => {
    try {
      await fetch(`/api/blob?url=${encodeURIComponent(url)}`, {
        method: "DELETE",
      })

      setRefreshTrigger((prev) => prev + 1)
    } catch (error) {
      console.error("Error deleting file:", error)
    }
  }

  const refreshFiles = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  const isImageFile = (contentType: string) => {
    return contentType.startsWith("image/")
  }

  const isCSVFile = (contentType: string) => {
    return contentType === "text/csv" || contentType === "application/vnd.ms-excel"
  }

  const getFileIcon = (contentType: string) => {
    if (contentType.includes("pdf")) return "📄"
    if (contentType.includes("word") || contentType.includes("doc")) return "📝"
    if (contentType.includes("text") || contentType.includes("csv")) return "📃"
    return "📁"
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, isMultiple: boolean) => {
    const files = event.target.files
    if (!files) return

    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i])
    }
    formData.append("folder", activeFolder)

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        console.log(isMultiple ? "Files uploaded successfully" : "File uploaded successfully")
        refreshFiles()
      } else {
        console.error("Upload failed")
      }
    } catch (error) {
      console.error("Error uploading file:", error)
    }
  }

  return (
    <Layout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">File Manager</h2>
          <Button onClick={refreshFiles} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        <Tabs defaultValue="Ace Drive" value={activeFolder} onValueChange={setActiveFolder}>
          <TabsList>
            <TabsTrigger value="Ace Drive">Ace Drive</TabsTrigger>
            <TabsTrigger value="Company Logos">Company Logos</TabsTrigger>
            <TabsTrigger value="Documents">Documents</TabsTrigger>
            <TabsTrigger value="Company Documents">Company Documents</TabsTrigger>
            <TabsTrigger value="Uploads">Other Uploads</TabsTrigger>
          </TabsList>

          <div className="mt-4 grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FolderOpen className="mr-2 h-5 w-5" />
                  Upload to {activeFolder}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => handleFileUpload(e, false)}
                      className="hidden"
                      accept={
                        activeFolder.includes("Ace Drive") || activeFolder.includes("Company Logos") ? "image/*" : "*/*"
                      }
                    />
                    <Button onClick={() => fileInputRef.current?.click()} className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Single File
                    </Button>
                  </div>
                  <div>
                    <input
                      type="file"
                      ref={multiFileInputRef}
                      onChange={(e) => handleFileUpload(e, true)}
                      className="hidden"
                      multiple
                      accept={
                        activeFolder.includes("Ace Drive") || activeFolder.includes("Company Logos") ? "image/*" : "*/*"
                      }
                    />
                    <Button onClick={() => multiFileInputRef.current?.click()} className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Multiple Files
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Files in {activeFolder}</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : files.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No files found in this folder</div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {files.map((file) => (
                      <Card key={file.url} className="overflow-hidden">
                        <div className="aspect-square relative bg-muted">
                          {isImageFile(file.contentType) ? (
                            <Image
                              src={file.url || "/placeholder.svg"}
                              alt={file.pathname.split("/").pop() || "File"}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-4xl">
                              {getFileIcon(file.contentType)}
                            </div>
                          )}
                        </div>
                        <CardContent className="p-3">
                          <div className="space-y-1">
                            <p className="text-sm font-medium truncate" title={file.pathname.split("/").pop()}>
                              {file.pathname.split("/").pop()}
                            </p>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{formatFileSize(file.size)}</span>
                              <span>{format(new Date(file.uploadedAt), "MMM d, yyyy")}</span>
                            </div>
                            <div className="flex justify-between pt-2">
                              <Button variant="outline" size="sm" asChild className="w-1/3 mr-1">
                                <a href={file.url} target="_blank" rel="noopener noreferrer">
                                  <Download className="h-4 w-4 mr-1" />
                                  Open
                                </a>
                              </Button>
                              {isCSVFile(file.contentType) && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="w-1/3 mx-1"
                                      onClick={() => setSelectedCSV(file.url)}
                                    >
                                      <Eye className="h-4 w-4 mr-1" />
                                      View
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-4xl">
                                    <DialogHeader>
                                      <DialogTitle>CSV Viewer</DialogTitle>
                                    </DialogHeader>
                                    {selectedCSV && <CSVViewer url={selectedCSV} />}
                                  </DialogContent>
                                </Dialog>
                              )}
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteFile(file.url)}
                                className="w-1/3 ml-1"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </Tabs>
      </div>
    </Layout>
  )
}

