"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Send, LogIn } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommentList } from "./CommentList"
import { useCreateCommentMutation } from "@/redux/dailynews/commentApi"
import toast from "react-hot-toast"
import type { TNews } from "@/types"
import { useGetSingleNewsQuery } from "@/redux/dailynews/news.api"
import { getCookie } from "@/axios/Cookies"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

type NewsParams = {
  news: TNews
}

const Feedback = ({ news }: NewsParams) => {
  const [createComment] = useCreateCommentMutation()
  const { refetch } = useGetSingleNewsQuery(news.slug)
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const authToken: string | undefined = getCookie("sarabela-news")
    setToken(authToken ?? null) 
  }, [])
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token) {
      router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`)
      return
    }

    const form = e.target as HTMLFormElement
    const commentText = form.comments.value.trim()
    if (!commentText) return

    try {
      const res = await createComment({
        commentData: { comments: commentText },
        id: news._id as string,
      }).unwrap()

      if (res.success) {
        toast.success("Thank you for your feedback!")
        form.reset()
        refetch()
      }
    } catch (err: any) {
      console.error("Error adding comment:", err)
      toast.error(err.data?.message || "Failed to add comment.")
    }
  }

  return (
    <div className="mx-auto my-8 p-6 bg-white rounded-xl shadow-sm">
      {/* Comments Header */}
      <div className="flex w-full gap-x-5 items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">মন্তব্য করুন</h2>
        <Select defaultValue="newest">
          <SelectTrigger className="w-[140px] h-[30px] md:h-auto ">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <Input
              type="text"
              name="comments"
              placeholder={token ? "Write your comment here..." : "Please log in to comment"}
              className="w-full min-h-[80px] p-4 resize-none"
              disabled={!token}
            />
            <div className="flex justify-end">
              {token ? (
                <Button
                  type="submit"
                  className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200"
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span>Comment</span>
                </Button>
              ) : (
                <Link href={`/login?returnUrl=${encodeURIComponent(pathname)}`} passHref>
                  <Button
                    type="button"
                    className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    <span>Log in to Comment</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <CommentList news={news} />
    </div>
  )
}

export default Feedback

