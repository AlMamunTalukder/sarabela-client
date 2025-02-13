import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className="", type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full  bg-transparent px-3 py-3 text-base transition-colors outline-none",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
