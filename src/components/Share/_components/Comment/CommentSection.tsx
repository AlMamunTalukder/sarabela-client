"use client"

import type React from "react"
import { useState } from "react"
import { Send, SortDesc } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SocialShare from "./SocialShare"
import { CommentList } from "./CommentList"
import { Comment } from "@/types"



export default function CommentSection() {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      text: "this is most important news",
      author: {
        name: "Ibrahim Sikder",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      createdAt: new Date(Date.now() - 60000), // 1 minute ago
      likes: 0,
    },
    {
      id: "2",
      text: "this is so awesome post",
      author: {
        name: "Ibrahim Sikder",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      createdAt: new Date(Date.now() - 60000), // 1 minute ago
      likes: 0,
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (comment.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        text: comment,
        author: {
          name: "You",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        createdAt: new Date(),
        likes: 0,
      }
      setComments([newComment, ...comments])
      setComment("")
    }
  }

  const handleLike = (commentId: string) => {
    setComments(
      comments.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)),
    )
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">{comments.length} Comments</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <SortDesc className="h-4 w-4" />
                Sort by: Newest
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Newest</DropdownMenuItem>
              <DropdownMenuItem>Oldest</DropdownMenuItem>
              <DropdownMenuItem>Most Popular</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Social Share Section */}
          <div className="border-b pb-4">
            <SocialShare/>
          </div>

          {/* Comment Input Section */}
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <form onSubmit={handleSubmit} className="flex-1 space-y-4">
              <Input
                type="text"
                value={comment}
                placeholder="Write your comment here..."
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px] p-4 resize-y"
              />
              <div className="flex justify-end">
                <Button type="submit" className="flex items-center gap-2 px-6" disabled={!comment.trim()}>
                  <Send className="w-4 h-4" />
                  <span>Comment</span>
                </Button>
              </div>
            </form>
          </div>

          {/* Comments List */}
          <CommentList comments={comments} onLike={handleLike} />
        </div>
      </CardContent>
    </Card>
  )
}

