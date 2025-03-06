/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import locationData from '../../../public/data/location.json';

// Define the type for locationData
interface LocationData {
  [division: string]: {
    [district: string]: string[];
  };
}

const AllCountry = () => {
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedUpazila, setSelectedUpazila] = useState<string | null>(null);
  const [districtSearch, setDistrictSearch] = useState<string>("");
  const [upazilaSearch, setUpazilaSearch] = useState<string>("");

  // Cast locationData to the defined type
  const typedLocationData = locationData as LocationData;

  // Get list of divisions
  const divisions = Object.keys(typedLocationData);

  // Get districts for selected division
  const districtsInDivision = selectedDivision
    ? Object.keys(typedLocationData[selectedDivision])
    : [];

  // Get upazilas for selected district
  const upazilaInDistrict =
    selectedDivision && selectedDistrict
      ? typedLocationData[selectedDivision][selectedDistrict]
      : [];

  // Filter districts
  const filteredDistricts = districtsInDivision.filter((district) =>
    district.toLowerCase().includes(districtSearch.toLowerCase())
  );

  // Filter upazilas
  const filteredUpazilas = upazilaInDistrict.filter((upazila) =>
    upazila.toLowerCase().includes(upazilaSearch.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 dark:bg-gray-500 bg-blue-200 py-6 px-2">
      <div className="flex items-center justify-center">
        <h1 className="text-2xl font-bold text-center dark:text-blue-300 text-blue-900">
          এলাকা নির্বাচন করুন
        </h1>
      </div>

      {/* Division Selector */}
      <div className="flex justify-center">
        <Select
          onValueChange={(value) => {
            setSelectedDivision(value);
            setSelectedDistrict(null);
            setSelectedUpazila(null);
            setDistrictSearch("");
          }}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>বিভাগ</SelectLabel>
              {divisions.map((division) => (
                <SelectItem key={division} value={division}>
                  {division}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* District Selector */}
      <div className="flex justify-center">
        <Select
          onValueChange={(value) => {
            setSelectedDistrict(value);
            setSelectedUpazila(null);
            setUpazilaSearch("");
          }}
          disabled={!selectedDivision}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="জেলা নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <div className="p-2">
              <Input
                placeholder="জেলা খুঁজুন"
                value={districtSearch}
                onChange={(e) => setDistrictSearch(e.target.value)}
                className="mb-2"
              />
            </div>
            <SelectGroup>
              <SelectLabel>জেলা</SelectLabel>
              {selectedDivision ? (
                filteredDistricts.length > 0 ? (
                  filteredDistricts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-center text-gray-500">
                    কোন জেলা পাওয়া যায়নি
                  </div>
                )
              ) : (
                <div className="p-2 text-center text-gray-500">
                  প্রথমে বিভাগ নির্বাচন করুন
                </div>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Upazila Selector */}
      <div className="flex justify-center">
        <Select onValueChange={setSelectedUpazila} disabled={!selectedDistrict}>
          <SelectTrigger className="">
            <SelectValue placeholder="উপজেলা নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <div className="p-2">
              <Input
                placeholder="উপজেলা খুঁজুন"
                value={upazilaSearch}
                onChange={(e) => setUpazilaSearch(e.target.value)}
                className="mb-2"
              />
            </div>
            <SelectGroup>
              <SelectLabel>উপজেলা</SelectLabel>
              {selectedDistrict ? (
                filteredUpazilas.length > 0 ? (
                  filteredUpazilas.map((upazila) => (
                    <SelectItem key={upazila} value={upazila}>
                      {upazila}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-center text-gray-500">
                    কোন উপজেলা পাওয়া যায়নি
                  </div>
                )
              ) : (
                <div className="p-2 text-center text-gray-500">
                  প্রথমে জেলা নির্বাচন করুন
                </div>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Search Button */}
      <div className="flex justify-center">
        <Link href={"/national/region"}>
          <button className="px-6 py-2 bg-blue-700 text-white font-medium rounded hover:bg-blue-800 transition">
            খুঁজুন
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AllCountry;