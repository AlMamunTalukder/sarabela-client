/* eslint-disable @typescript-eslint/no-unused-vars */
import { Facebook, Twitter, Linkedin, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast'
export default function SocialShare() {
  const handleShare = (platform: string) => {
    // Add your sharing logic here
    toast.success(`Shared on ${platform}`)
  }

  return (
    <div className="flex items-center gap-2 justify-end">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleShare("Facebook")}
        className="text-blue-600 hover:text-blue-700"
      >
        <Facebook className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleShare("Twitter")}
        className="text-sky-500 hover:text-sky-600"
      >
        <Twitter className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleShare("LinkedIn")}
        className="text-blue-700 hover:text-blue-800"
      >
        <Linkedin className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          toast.success("Link copied to clipboard!")
        }}
      >
        <Link2 className="h-5 w-5" />
      </Button>
    </div>
  )
}

