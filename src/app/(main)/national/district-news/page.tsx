/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import locationData from "../../../../../public/data/location.json"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search } from "lucide-react"
import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useSpecificNewsData } from "@/hooks/useSpecificNewsData"
import { formatDate } from "@/util/formateDate"
import { useState, useEffect } from "react"

interface LocationData {
  [division: string]: {
    [district: string]: string[]
  }
}

export default function NewsSection() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const division = searchParams.get("division")
  const district = searchParams.get("district")
  const upazila = searchParams.get("upazila")

  const [selectedDivision, setSelectedDivision] = useState<string | null>(division)
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(district)
  const [selectedUpazila, setSelectedUpazila] = useState<string | null>(upazila)
  const [districtSearch, setDistrictSearch] = useState<string>("")
  const [upazilaSearch, setUpazilaSearch] = useState<string>("")

  // Cast locationData to the defined type
  const typedLocationData = locationData as LocationData

  // Get list of divisions
  const divisions = Object.keys(typedLocationData)

  // Add this useEffect to update the dropdown selections when URL parameters change
  useEffect(() => {
    setSelectedDivision(division)
    setSelectedDistrict(district)
    setSelectedUpazila(upazila)
  }, [division, district, upazila])

  // Pass the query parameters to the hook
  const { newsData, loading, error } = useSpecificNewsData({
    division,
    district,
    upazila,
  })

  // Handle division change
  const handleDivisionChange = (value: string) => {
    setSelectedDivision(value)
    setSelectedDistrict(null) // Reset district when division changes
    setSelectedUpazila(null) // Reset upazila when division changes
  }

  // Handle district change
  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value)
    setSelectedUpazila(null) // Reset upazila when district changes
  }

  // Handle search button click
  const handleSearch = () => {
    const params = new URLSearchParams()
    if (selectedDivision) params.set("division", selectedDivision)
    if (selectedDistrict) params.set("district", selectedDistrict)
    if (selectedUpazila) params.set("upazila", selectedUpazila)

    // Use the current path with the new query parameters
    const currentPath = window.location.pathname
    router.push(`${currentPath}?${params.toString()}`)
  }

  // Get districts for selected division
  const districtsInDivision = selectedDivision ? Object.keys(typedLocationData[selectedDivision]) : []

  // Get upazilas for selected district
  const upazilaInDistrict =
    selectedDivision && selectedDistrict ? typedLocationData[selectedDivision][selectedDistrict] : []

  // Filter districts
  const filteredDistricts = districtsInDivision.filter((district) =>
    district.toLowerCase().includes(districtSearch.toLowerCase()),
  )

  // Filter upazilas
  const filteredUpazilas = upazilaInDistrict.filter((upazila) =>
    upazila.toLowerCase().includes(upazilaSearch.toLowerCase()),
  )
  return (
    <div className="max-w-5xl mx-auto py-6">
      {/* Subtitle and Title */}
      <h3 className="text-lg font-semibold text-gray-600">উপজেলা</h3>
      <h2 className="text-3xl font-bold text-red-600">{upazila || "সকল উপজেলা"}</h2>

      <hr className="my-4" />

      {/* Filter Section */}
      <div className="grid grid-cols-12 gap-4 xl:6">
        {/* Left Section: Filters */}
        <div className="lg:col-span-4 col-span-full space-y-3">
          <h4 className="text-lg font-semibold text-blue-600">আমার এলাকার খবর</h4>
          <div className="flex justify-center">
            <Select onValueChange={handleDivisionChange}>
              <SelectTrigger className="w-full border py-3 rounded-lg">
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

          <div className="flex justify-center">
            <Select onValueChange={handleDistrictChange}>
              <SelectTrigger className="w-full border py-3 rounded-lg">
                <SelectValue placeholder="জেলা নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
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
                      <div className="p-2 text-center text-gray-500">কোন জেলা পাওয়া যায়নি</div>
                    )
                  ) : (
                    <div className="p-2 text-center text-gray-500">প্রথমে বিভাগ নির্বাচন করুন</div>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center">
            <Select  onValueChange={setSelectedUpazila}>
              <SelectTrigger className="w-full border py-3 rounded-lg">
                <SelectValue placeholder="উপজেলা নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
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
                      <div className="p-2 text-center text-gray-500">কোন উপজেলা পাওয়া যায়নি</div>
                    )
                  ) : (
                    <div className="p-2 text-center text-gray-500">প্রথমে জেলা নির্বাচন করুন</div>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button style={{background:'#075899'}} className="w-full flex items-center gap-2" onClick={handleSearch}>
            <Search  size={18} /> খুঁজুন
          </Button>
        </div>

        {/* Right Section: News Cards */}
        <div className="lg:col-span-8 col-span-full space-y-5">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : newsData.length === 0 ? (
            <div className="text-center py-8">No news found for this location.</div>
          ) : (
            newsData.map((news, index) => (
              <div key={index}>
                <Card className="p-4 flex gap-4">
                  <div className="flex-1">
                    <Link href={`/${news.category.slug}/${news._id}`}>
                      <h3 className="text-lg font-semibold hover:text-blue-500">{news.newsTitle}</h3>
                    </Link>
                    <p className="text-gray-600 text-sm mt-1">{news.shortDescription}</p>
                    <span className="text-xs text-gray-500">{formatDate(news?.postDate)}</span>
                  </div>
                  {news.images && news.images.length > 0 && (
                    <Image
                      src={news.images[0] || "/placeholder.svg"}
                      alt={news.newsTitle}
                      width={120}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                  )}
                </Card>
              </div>
            ))
          )}

          {newsData.length > 0 && (
            <Button style={{background:'#075899'}} className="w-full flex items-center gap-2">
              <Search size={18} /> আরও
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

