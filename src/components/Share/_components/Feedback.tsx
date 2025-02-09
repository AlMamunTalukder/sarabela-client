"use client";
import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  MessageCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "Facebook",
    link: "https://www.facebook.com",
    icon: <Facebook className="w-4 h-4" />,
    color: "hover:text-blue-600",
  },
  {
    name: "Twitter",
    link: "https://www.twitter.com",
    icon: <Twitter className="w-4 h-4" />,
    color: "hover:text-blue-400",
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com",
    icon: <Instagram className="w-4 h-4" />,
    color: "hover:text-pink-600",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com",
    icon: <Linkedin className="w-4 h-4" />,
    color: "hover:text-blue-700",
  },
];

const Feedback = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (comment.trim()) {
      console.log("Submitted comment:", comment);
      setComment("");
    }
  };

  return (
    <div className="my-8 p-4">
      {/* Social Media Section */}
      <div className="space-y-4 my-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-800">Share With</h2>
        </div>
        <div className="flex gap-6 items-center">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${social.color} border-2 rounded-lg p-2 border-blue-300`}
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={comment}
              placeholder="Write your comment here..."
              onChange={(e) => setComment(e.target.value)}
            ></Input>
            <Button
              type="submit"
              className="flex items-center  bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300 "
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
