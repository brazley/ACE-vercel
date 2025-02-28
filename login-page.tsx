import { GitlabIcon as GitHub, GitlabIcon as GitLab, GithubIcon as Bitbucket, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Log in to Vercel</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button className="bg-gray-900 text-white hover:bg-gray-700 w-full">
            <GitHub className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
          <Button className="bg-indigo-700 text-white hover:bg-indigo-500 w-full">
            <GitLab className="mr-2 h-4 w-4" />
            Continue with GitLab
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-400 w-full">
            <Bitbucket className="mr-2 h-4 w-4" />
            Continue with Bitbucket
          </Button>
          <Button variant="outline" className="w-full">
            <Lock className="mr-2 h-4 w-4" />
            Continue with SAML SSO
          </Button>
          <Button variant="outline" className="w-full">
            <Lock className="mr-2 h-4 w-4" />
            Login with Passkey
          </Button>
          <Button variant="link" className="w-full justify-center">
            Continue with Email →
          </Button>
        </CardContent>
      </Card>
      <div className="text-center mt-4">
        <Button variant="link">Don't have an account? Sign Up</Button>
      </div>
    </div>
  )
}

