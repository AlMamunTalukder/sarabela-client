"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AllCountry = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 dark:bg-gray-500 bg-blue-200 py-6 px-2">
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center dark:text-blue-300 text-blue-900">
          এলাকা নির্বাচন করুন
        </h1>
      </div>

      <div className="flex justify-center">
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>বিভাগ</SelectLabel>
              <SelectItem value="ঢাকা">ঢাকা</SelectItem>
              <SelectItem value="চট্টগ্রাম">চট্টগ্রাম</SelectItem>
              <SelectItem value="খুলনা">খুলনা</SelectItem>
              <SelectItem value="রাজশাহী">রাজশাহী</SelectItem>
              <SelectItem value="সিলেট">সিলেট</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-center">
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="জেলা নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>জেলা</SelectLabel>
              <SelectItem value="ফরিদপুর">ফরিদপুর</SelectItem>
              <SelectItem value="গাজীপুর">গাজীপুর</SelectItem>
              <SelectItem value="নারায়ণগঞ্জ">নারায়ণগঞ্জ</SelectItem>
              <SelectItem value="বরিশাল">বরিশাল</SelectItem>
              <SelectItem value="রংপুর">রংপুর</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-center">
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="উপজেলা নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>উপজেলা</SelectLabel>
              <SelectItem value="টঙ্গী">টঙ্গী</SelectItem>
              <SelectItem value="সাভার">সাভার</SelectItem>
              <SelectItem value="সোনারগাঁও">সোনারগাঁও</SelectItem>
              <SelectItem value="মির্জাপুর">মির্জাপুর</SelectItem>
              <SelectItem value="মানিকগঞ্জ">মানিকগঞ্জ</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-center">
        <button className="px-6 py-2 bg-blue-700 text-white font-medium rounded hover:bg-blue-800 transition">
          খুঁজুন
        </button>
      </div>
    </div>
  );
};

export default AllCountry;
