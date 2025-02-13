/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommentList } from "./CommentList"
import { Comment } from "@/types"
import { getCookie } from "@/axios/Cookies"
import { jwtDecode } from "jwt-decode"
import axios from "axios"


type IdParams = {
  id:string;
}

const Feedback = ({id}:IdParams) => {
  const [decodedToken, setDecodedToken] = useState<any>(null);

  useEffect(() => {
    const token = getCookie("sarabela-news");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
        console.log('Decoded Token:', decoded);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);
  console.log(decodedToken)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const commentText = (e.target as any).comments.value.trim();

    if (!commentText) return;

    if (!decodedToken || !decodedToken.userId) {
      console.error("User ID is missing. Cannot submit comment.");
      return;
    }

    const commentData = {
      user: decodedToken.userId,
      replyComments: [],
      comments: commentText,
    };
    console.log(commentData)

    const token = getCookie("sarabela-news"); 
    console.log('decoded token therer ',decodedToken)

    try {
      const response = await axios.post(
        `https://api.sarabelanews24.com/api/v1/comment/create-comment/${id}`,
        commentData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      console.log("Comment posted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting comment:", error);
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
      <CommentList/>
    </div>
  )
}

export default Feedback

