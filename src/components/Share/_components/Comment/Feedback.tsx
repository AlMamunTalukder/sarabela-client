/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommentList } from "./CommentList"
import { useCreateCommentMutation, } from "@/redux/dailynews/commentApi"
import toast from "react-hot-toast"
import { TNews } from "@/types"
import { useGetSingleNewsQuery } from "@/redux/dailynews/news.api"


type NewsParams = {
  news: TNews
}

const Feedback = ({ news }: NewsParams) => {

  const [createComment] = useCreateCommentMutation();
  const { refetch } = useGetSingleNewsQuery(news.slug);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const commentText = form.comments.value.trim();
    if (!commentText) return;

    try {
      const res = await createComment({
        commentData: { comments: commentText },
        id: news._id as string,
      }).unwrap();

      if (res.success) {
        toast.success("Comment added successfully");
        form.reset();
        refetch();
      }
    } catch (err: any) {
      console.error("Error adding comment:", err);
      toast.error(err.data?.message || "Failed to add comment.");
    }
  };




  return (
    <div className=" mx-auto my-8 p-6 bg-white rounded-xl shadow-sm">


      {/* Comments Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          {/* {comments.length} {comments.length === 1 ? "Comment" : "Comments"} */}
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
              name="comments"
              placeholder="Write your comment here..."

              className="w-full min-h-[80px] p-4 resize-none"
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200"
              // disabled={!comments.trim()}
              >
                <Send className="w-4 h-4 mr-2" />
                <span>Comment</span>
              </Button>
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

