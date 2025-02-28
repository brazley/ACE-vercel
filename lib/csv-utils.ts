export async function fetchCSVData(url: string) {
  try {
    const response = await fetch(url)
    const text = await response.text()
    const rows = text.split("\n").map((row) => row.split(","))
    const headers = rows[0]
    const data = rows.slice(1).map((row) => {
      const obj: Record<string, string> = {}
      headers.forEach((header, index) => {
        obj[header.trim()] = row[index]?.trim() || ""
      })
      return obj
    })
    return data
  } catch (error) {
    console.error("Error fetching CSV data:", error)
    throw new Error("Failed to fetch CSV data")
  }
}

