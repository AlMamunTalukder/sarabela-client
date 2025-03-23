/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {  AnimatePresence } from "framer-motion"
import { Bell, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import logo from "../../../src/assets/logo/sarabela.jpg"
import toast from "react-hot-toast"

export default function PremiumSubscriptionModal() {
  const [showModal, setShowModal] = useState(false)

  const [stage, setStage] = useState<"initial" | "yes-hover" | "no-hover" | "closing">("initial")
  const [isSubscribing, setIsSubscribing] = useState(false)

  useEffect(() => {

    const subscriptionChoice = localStorage.getItem("subscriptionChoice")

    if (!subscriptionChoice) {
      const timer = setTimeout(() => {
        setShowModal(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [])


  function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData?.length; ++i) {
      outputArray[i] = rawData?.charCodeAt(i)
    }
    return outputArray
  }

  // Function to subscribe the user for push notifications
  const subscribeToPush = async () => {
    try {
      setIsSubscribing(true)


      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        throw new Error("Push notifications are not supported in this browser")
      }


      const registrations = await navigator?.serviceWorker?.getRegistrations()
      for (const registration of registrations) {
        await registration.unregister()
      }


      const reg = await navigator?.serviceWorker?.register("/sw.js", { scope: "/" })

      // Subscribe to push notifications using the VAPID public key
      const subscription = await reg?.pushManager?.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
      })

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      })

      if (!response.ok) {
        throw new Error("Failed to send subscription to server")
      }


      setStage("closing")
      toast.success("আপনি এখন সারাবেলানিউজ২৪ থেকে নোটিফিকেশন পাবেন।")


      setTimeout(() => {
        localStorage.setItem("subscriptionChoice", "yes")
        setShowModal(false)
        setIsSubscribing(false)
      }, 800)
    } catch (error) {
      console.error("Subscription error:", error)
      setIsSubscribing(false)
      toast.error("সাবস্ক্রাইব ব্যর্থ হয়েছে। দুঃখিত, একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।")
    }
  }


  const handleDecline = () => {
    setStage("closing")

    setTimeout(() => {
      localStorage.setItem("subscriptionChoice", "no")
      setShowModal(false)
    }, 800)
  }



  if (!showModal) return null

  return (
    <AnimatePresence>
    {showModal && (
      <div className="fixed bottom-4 right-0 z-[99] p-4">
        <div className="w-full max-w-md ">
          <Card className="border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <div className="py-5 px-5">
              <div className="flex gap-x-5">
                <div className="relative h-12 md:h-16 w-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
                  <Image
                    src={logo || "/placeholder.svg"}
                    alt="SarabelaNews24 Logo"
                    fill
                    className="w-full h-full rounded-full object-contain"
                  />
                </div>
                <div className="bg-blue-50 dark:bg-gray-800/50 rounded-lg p-2 md:p-4 mb-6 flex items-start gap-3 border border-blue-100 dark:border-gray-700">
                  <div className="mt-0.5">
                    <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium md:text-xl text-sm text-gray-900 dark:text-gray-100 mb-1">
                      আপনি কি সারাবেলানিউজ২৪ থেকে নোটিফিকেশন পেতে চান?
                    </h3>
                  </div>
                </div>
              </div>
  
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleDecline}
                  disabled={isSubscribing}
                  className='w-5 md:w-10 h-8 md:h-10 text-sm md:text-lg font-medium border-2 transition-all duration-300'
                >
                  না
                </Button>
  
                <Button
                  size="lg"
                  onClick={subscribeToPush}
                  disabled={isSubscribing}
                  className={cn(
                    "w-5 md:w-10 h-8 md:h-10 md:text-lg font-medium transition-all duration-300 text-sm",
                    "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600",
                    "border-2 border-transparent"
                  )}
                >
                  {isSubscribing ? <Loader2 className="h-3 w-3 animate-spin" /> : "হ্যাঁ"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )}
  </AnimatePresence>
  
  )
}

