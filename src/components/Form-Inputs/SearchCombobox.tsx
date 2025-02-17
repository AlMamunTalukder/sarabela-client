"use client";

import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { PopoverContent } from "@/components/ui/popover";
import { CommandList } from "cmdk";
import Link from "next/link";

type SearchItem = {
  id: number;
  title: string;
};

const searchItems: SearchItem[] = [
  { id: 1, title: "আমাদের সম্পর্কে" },
  { id: 2, title: "যোগাযোগ করুন" },
  { id: 3, title: "ব্লগ পোস্ট" },
  { id: 4, title: "সেবাসমূহ" },
  { id: 5, title: "সর্বশেষ সংবাদ" },
  { id: 6, title: "আমাদের টিম" },
  { id: 7, title: "প্রকল্পসমূহ" },
  { id: 8, title: "গ্যালারি" },
  { id: 9, title: "প্রশ্ন ও উত্তর" },
  { id: 10, title: "কর্মজীবন" },
  { id: 11, title: "নীতিমালা" },
  { id: 12, title: "গ্রাহক সেবা" },
  { id: 13, title: "প্রশিক্ষণ কোর্স" },
  { id: 14, title: "ইভেন্টসমূহ" },
  { id: 15, title: "সাফল্যের গল্প" },
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
  return (
    <PopoverContent
      className="w-[400px] h-[500px] p-2 mt-4"
      align="center"
      sideOffset={5}
    >
      <Command>
        <CommandInput placeholder={placeholder} autoFocus />
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandList>
          <CommandGroup>
            {searchItems.map((item) => (
              <CommandItem key={item.id} onSelect={() => setIsOpen(false)}>
                <Link href={`/search/${item.id}`} onClick={() => setIsOpen(false)}>
                  {item.title}
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  );
};

export default SearchCombobox;
