"use client";
import React, { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SocialShare from "./SocialShare";

const Feedback = () => {
  const path = window.location.pathname;
  const [comment, setComment] = useState("");

  console.log("this is link path", path);

  // Handle comment submission
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (comment.trim()) {
      setComment("");
    }
  };

  return (
    <div className="my-8 p-4">
      {/* Social Media Section */}
      <SocialShare />
      {/* Comment Section */}
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={comment}
              placeholder="Write your comment here..."
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              type="submit"
              className="flex items-center bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300"
            >
              <Send className="w-4 h-4" />
              <span>Submit</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
