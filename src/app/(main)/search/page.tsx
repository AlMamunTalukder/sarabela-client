"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WriterCombobox } from "./_components/WriterCombobox";
import SearchShowData from "./_components/SearchShowData";
import { DatePickerDemo } from "./_components/DatePicker";
import { RadioGroup, RadioGroupItem } from "./_components/RadioGroupItem";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");
  const [selectedWriter, setSelectedWriter] = React.useState("")
  const { newsData, loading, error } = useSpecificNewsData({ searchTerm: query });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(searchTerm);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold">অনুসন্ধান</h1>

        <div className="flex items-center  gap-2 mt-3 ">
          <div className="flex-1">
            <Input
              name="search"
              type="search"
              placeholder="যা খুঁজতে চান"
              className="w-full h-[60px] rounded-md dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              
            />
          </div>
          <Button type="submit" className="h-[56px]">
            <Search className="" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
            <div className="space-y-2">
              <label className="text-sm">তারিখ</label>
              <DatePickerDemo />
            </div>

            <div className="space-y-2">
              <label className="text-sm">লেখক</label>
              <Input
                type="text"
                placeholder="লেখক"
                value={selectedWriter}
                onChange={(e) => setSelectedWriter(e.target.value)}
                className="w-full h-[50px] rounded-md "
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm">সেকশন</label>
              <WriterCombobox value={selectedWriter} onChange={setSelectedWriter} />

            </div>

            <div className="space-y-2">
              <label className="text-sm">ধরন</label>

              <Select>
                <SelectTrigger className="w-full h-[50px] dark:bg-black bg-white">
                  <SelectValue placeholder="সব" />
                </SelectTrigger>
                <SelectContent>
                  <div className="flex flex-col gap-1 p-1">
                    <SelectItem value="all" className="py-2 flex items-center gap-2">
                      <div className="flex items-center justify-between w-full ">
                        <RadioGroup defaultValue="all" className="flex items-between w-full ">
                          <RadioGroupItem value="all" id="all" className="text-primary" />
                          <span>সব</span>
                        </RadioGroup>
                      </div>

                    </SelectItem>
                    <SelectItem value="feature" className="py-2 flex items-center gap-2">
                      <div className="flex items-center justify-between w-full">
                        <RadioGroup defaultValue="feature" className="flex items-between w-full ">
                          <RadioGroupItem value="feature" id="feature" />
                          <span>ফিচার</span>
                        </RadioGroup>
                      </div>
                    </SelectItem>
                    <SelectItem value="news" className="py-2 flex items-center gap-2">
                      <div className="flex items-center justify-between w-full">
                        <RadioGroup defaultValue="news" className="flex items-between w-full ">
                          <RadioGroupItem value="news" id="news" />
                          <span>নিউজ</span>
                        </RadioGroup>
                      </div>
                    </SelectItem>
                    <SelectItem value="video" className="py-2 flex items-center gap-2">
                      <div className="flex items-center justify-between w-full">
                        <RadioGroup defaultValue="video" className="flex items-between w-full ">
                          <RadioGroupItem value="video" id="video" />
                          <span>ভিডিও</span>
                        </RadioGroup>
                      </div>
                    </SelectItem>
                    <SelectItem value="editorial" className="py-2 flex items-center gap-2">
                      <div className="flex items-center justify-between w-full">
                        <RadioGroup defaultValue="editorial" className="flex items-between w-full ">
                          <RadioGroupItem value="editorial" id="editorial" />
                          <span>সম্পাদকীয়</span>
                        </RadioGroup>
                      </div>
                    </SelectItem>
                    <SelectItem value="interview" className="py-2 flex items-center gap-2">
                      <div className="flex items-center justify-between w-full">
                        <RadioGroup defaultValue="interview" className="flex items-between w-full ">
                          <RadioGroupItem value="interview" id="interview" />
                          <span>সাক্ষাৎকার</span>
                        </RadioGroup>
                      </div>
                    </SelectItem>
                  </div>
                </SelectContent>
              </Select>

            </div>
          </div>

          <div className="flex justify-between items-center text-sm border-t pt-4">
            <div>প্রাপ্ত ফলাফল: ১৩০৬৫০২</div>
            <Select defaultValue="latest">
              <SelectTrigger className="w-[180px] h-[50px] focus:outline-none focus:border-none">
                <SelectValue placeholder="সাজানো" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>ফলাফল সাজানো</SelectLabel>
                  <SelectItem value="latest">সাম্প্রতিক</SelectItem>
                  <SelectItem value="oldest">পুরনো</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>


        </div>
      </form>



      <SearchShowData loading={loading} error={error} newsData={newsData}/>
    </div>
  );
};

export default Page;
