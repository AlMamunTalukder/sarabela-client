"use client"

import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommentList } from "./CommentList"
import { Comment } from "@/types"



const Feedback = () => {

  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      text: "This is a great article! Thanks for sharing.",
      author: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      createdAt: new Date(Date.now() - 1000 * 60 * 60),
      likes: 0
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
        likes: 0
      }
      setComments([newComment, ...comments])
      setComment("")
    }
  }
  const handleLike = (commentId: string) => {
    setComments(comments.map((comment) =>
      comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  };
  
  return (
    <div className=" mx-auto my-8 p-6 bg-white rounded-xl shadow-sm">
   

      {/* Comments Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </h2>
        <Select defaultValue="newest">
          <SelectTrigger className="w-[140px]">
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
              value={comment}
              placeholder="Write your comment here..."
              onChange={(e) => setComment(e.target.value)}
              className="w-full min-h-[80px] p-4 resize-none"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200"
                disabled={!comment.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                <span>Comment</span>
              </Button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <CommentList comments={comments} onLike={handleLike}/>
    </div>
  )
}

export default Feedback

