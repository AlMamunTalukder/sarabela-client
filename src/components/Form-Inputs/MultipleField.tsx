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
  CommandList,
} from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";

interface SearchItem {
  value: string;
  label: string;
}

interface MultipleFieldProps {
  searchNews: SearchItem[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const MultipleField: React.FC<MultipleFieldProps> = ({ searchNews, value, setValue }) => {
  return (
    <PopoverContent className="w-[400px] p-0 mt-2">
      <Command>
        <CommandInput placeholder="Search framework..." className="h-9" />
        <CommandList>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {searchNews.map((news) => (
              <CommandItem
                key={news.value}
                value={news.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                }}
              >
                {news.label}
                <Check
                  className={cn(
                    "ml-auto",
                    value === news.value ? "opacity-100" : "opacity-0"
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

export default MultipleField;
