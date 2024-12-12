import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-auto">
      <header className="bg-background/80 backdrop-blur-lg border rounded-full px-4 py-2 shadow-lg">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <span className="font-bold px-3">MCE</span>
          </Link>
          <nav className="flex items-center space-x-1">
            <Link href="/companies">
              <Button variant="ghost" size="sm" className="rounded-full">
                Companies
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="ghost" size="sm" className="rounded-full">
                Projects
              </Button>
            </Link>
            <Link href="/jobs">
              <Button variant="ghost" size="sm" className="rounded-full">
                Jobs
              </Button>
            </Link>
            <div className="mx-2">
              <ThemeToggle />
            </div>
            <Link href="/auth">
              <Button size="sm" className="rounded-full">
                Sign In / Sign Up
              </Button>
            </Link>
          </nav>
        </div>
      </header>
    </div>
  )
}

