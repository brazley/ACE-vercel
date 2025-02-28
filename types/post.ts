export interface Post {
  id: string
  content: string
  timestamp: {
    seconds: number
    nanoseconds: number
  }
  likes: number
  comments: number
  shares: number
  author: {
    name: string
    avatar: string
    title: string
  }
}

