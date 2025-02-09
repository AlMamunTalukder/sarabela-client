// Add the "use client" directive to indicate this component is client-side only
"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";
import { CommandList } from "cmdk";

type SearchItem = {
  value: string;
  label: string;
};

const searchItems: SearchItem[] = [
  {
    value: "next",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

interface SearchComboboxProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  placeholder?: string;
}

const SearchCombobox: React.FC<SearchComboboxProps> = ({
  setIsOpen,
  placeholder = "Search...",
}) => {
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);

  return (
    <PopoverContent
      className="w-[400px] p-2 mt-4"
      align="center"
      sideOffset={5}
    >
      <Command>
        <CommandInput placeholder={placeholder} className="h-9" autoFocus />
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            {searchItems?.map((item, idx) => (
              <CommandItem
                key={idx}
                value={item.value}
                onSelect={(currentValue) => {
                  const newValue =
                    currentValue === selectedValue ? "" : currentValue;
                  setSelectedValue(newValue);
                  setIsOpen(false);
                }}
              >
                {item.label}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedValue === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  );
};

export default SearchCombobox;
