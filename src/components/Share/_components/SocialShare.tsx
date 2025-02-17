import React, { useState } from "react";
import { Facebook, Link, Check, Twitter, Linkedin, Share2 } from "lucide-react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

const socialLinks = [
  {
    name: "Facebook",
    ShareButton: FacebookShareButton,
    Icon: Facebook,
    iconColor: "text-blue-600",
    label: "Share on Facebook",
  },
  {
    name: "Twitter",
    ShareButton: TwitterShareButton,
    Icon: Twitter,
    iconColor: "text-blue-400",
    label: "Share on Twitter",
  },
  {
    name: "LinkedIn",
    ShareButton: LinkedinShareButton,
    Icon: Linkedin,
    iconColor: "text-blue-700",
    label: "Share on LinkedIn",
  },
];

const SocialShare = () => {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4">
      {socialLinks.map(({ name, ShareButton, Icon, iconColor }) => (
        <ShareButton key={name} url={shareUrl}>
          <div className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
            <Icon size={24} className={iconColor} />
          </div>
        </ShareButton>
      ))}

      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
        title="Copy link"
      >
        {copied ? (
          <Check size={24} className="text-green-600" />
        ) : (
          <Link size={24} className="text-gray-600" />
        )}
      </button>

      <div className="relative group md:hidden">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Share2 size={24} className="text-gray-600" />
        </button>
        <div className="absolute right-0 mt-2 p-2 bg-white rounded-lg shadow-lg hidden group-hover:block">
          <div className="flex flex-col gap-2">
            {socialLinks.map(
              ({ name, ShareButton, Icon, iconColor, label }) => (
                <ShareButton key={name} url={shareUrl}>
                  <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                    <Icon size={20} className={iconColor} />
                    <span className="text-sm">{label}</span>
                  </div>
                </ShareButton>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
