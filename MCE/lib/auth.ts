import { useState, useEffect } from 'react'

interface User {
  uid: string
  displayName: string | null
  photoURL: string | null
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate authentication
    const timer = setTimeout(() => {
      setUser({
        uid: '1',
        displayName: 'John Doe',
        photoURL: null
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return { user, loading }
}

