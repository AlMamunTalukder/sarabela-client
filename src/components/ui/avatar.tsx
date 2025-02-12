"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

// Assuming you're using `clsx` for conditional classNames and `tailwind-merge` for merging Tailwind classes

// Avatar component
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className ?? "" 
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

// AvatarImage component
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className ?? "")} // Handle undefined className
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

// AvatarFallback component
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className ?? "" // Handle undefined className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

// utils/cn.ts (Updated `cn` function to handle undefined values)
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function to merge class names
export function cn(...inputs: (string | undefined)[]) {
  return twMerge(clsx(inputs.filter(Boolean))) // Filters out undefined values
}
