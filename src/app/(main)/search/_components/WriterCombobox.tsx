"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const writers = [
  { value: "all", label: "সকল" },
  { value: "featured", label: "বিশেষ" },
  { value: "regular", label: "নিয়মিত" },
]

export function WriterCombobox({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-[50px]" 
        >
          {value ? writers.find((writer) => writer.value === value)?.label : "সেকশন"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="সেকশন খুঁজুন..." />
          <CommandList>
            <CommandEmpty>কোন লেখক পাওয়া যায়নি।</CommandEmpty>
            <CommandGroup>
              {writers.map((writer) => (
                <CommandItem
                  key={writer.value}
                  value={writer.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === writer.value ? "opacity-100" : "opacity-0")} />
                  {writer.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
