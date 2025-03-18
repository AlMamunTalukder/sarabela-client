"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

import logo from "../../../src/assets/logo/sarabela.jpg"
import toast from "react-hot-toast"

export default function PremiumSubscriptionModal() {
  const [showModal, setShowModal] = useState(false)
  const [hoverYes, setHoverYes] = useState(false)
  const [hoverNo, setHoverNo] = useState(false)
  const [stage, setStage] = useState<"initial" | "yes-hover" | "no-hover" | "closing">("initial")
  const [isSubscribing, setIsSubscribing] = useState(false)

  useEffect(() => {
    // Check if the user has already made a choice
    const subscriptionChoice = localStorage.getItem("subscriptionChoice")

    // If no choice found, show the modal after a short delay
    if (!subscriptionChoice) {
      const timer = setTimeout(() => {
        setShowModal(true)
      }, 1500) // Show after 1.5 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  // Helper function to convert the VAPID key
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

      // Check if service worker is supported
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        throw new Error("Push notifications are not supported in this browser")
      }

      // First, unregister any existing service workers to avoid conflicts
      const registrations = await navigator?.serviceWorker?.getRegistrations()
      for (const registration of registrations) {
        await registration.unregister()
      }

      // Register the service worker from the public folder - IMPORTANT: use .js not .ts
      const reg = await navigator?.serviceWorker?.register("/sw.js", { scope: "/" })
      console.log("Service Worker registered successfully", reg)

      // Subscribe to push notifications using the VAPID public key
      const subscription = await reg?.pushManager?.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
      })

      console.log("Push subscription created:", subscription)

      // Send subscription object to the server
      const response = await fetch("https://api.sarabelanews24.com/api/v1/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      })

      if (!response.ok) {
        throw new Error("Failed to send subscription to server")
      }

      // Success animation and close
      setStage("closing")
      toast.success("আপনি এখন সারাবেলানিউজ২৪ থেকে নোটিফিকেশন পাবেন।")

      // Save the user's choice to not show the modal again
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

  // If user clicks "না"
  const handleDecline = () => {
    setStage("closing")
    // Animate before closing
    setTimeout(() => {
      localStorage.setItem("subscriptionChoice", "no")
      setShowModal(false)
    }, 800)
  }

  // Update stage based on hover state
  useEffect(() => {
    if (hoverYes) setStage("yes-hover")
    else if (hoverNo) setStage("no-hover")
    else if (stage !== "closing") setStage("initial")
  }, [hoverYes, hoverNo, stage])

  // Don't render anything if modal shouldn't be shown
  if (!showModal) return null

  return (
    <AnimatePresence>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="w-full max-w-md relative"
          >
            {/* Decorative elements */}
            <motion.div
              className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-blue-600/20 z-0"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-8 -right-8 w-16 h-16 rounded-full bg-blue-600/20 z-0"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2.5,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />

            <Card className="border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
              {/* Animated top border */}
              <motion.div
                className="h-1.5 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-500"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{ backgroundSize: "200% 200%" }}
              />

              <div className="absolute right-3 top-3 z-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
                  onClick={handleDecline}
                  disabled={isSubscribing}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>

              <div className="pt-8 pb-6 px-6">
                {/* Logo with pulse effect */}
                <div className="relative mx-auto w-24 h-24 mb-4">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-blue-500/20"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0, 0.2],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-white shadow-lg">
                      <Image
                        src={logo || "/placeholder.svg"}
                        alt="SarabelaNews24 Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Title with animated gradient */}
                <motion.div
                  className="text-center mb-6"
                  animate={stage === "closing" ? { y: -20, opacity: 0 } : { y: 0, opacity: 1 }}
                >
                  <h2 className="text-2xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                    সারাবেলানিউজ২৪
                  </h2>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-300">আপনার নিউজ আপডেট</p>
                </motion.div>

                {/* Message with icon */}
                <motion.div
                  className="bg-blue-50 dark:bg-gray-800/50 rounded-lg p-4 mb-6 flex items-start gap-3 border border-blue-100 dark:border-gray-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="mt-0.5">
                    <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                      আপনি কি সারাবেলানিউজ২৪ থেকে নোটিফিকেশন পেতে চান?
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">সর্বশেষ খবর এবং আপডেট পেতে সাবস্ক্রাইব করুন</p>
                  </div>
                </motion.div>

                {/* Benefits that appear on hover */}
                <AnimatePresence>
                  {hoverYes && !isSubscribing && (
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-100 dark:border-green-900/30">
                        <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-2">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="font-medium">সাবস্ক্রাইব করার সুবিধা</span>
                        </div>
                        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 pl-6 list-disc">
                          <li>সর্বশেষ খবর সবার আগে পান</li>
                          <li>ব্রেকিং নিউজ নোটিফিকেশন</li>
                          <li>গুরুত্বপূর্ণ আপডেট</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {hoverNo && !isSubscribing && (
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-100 dark:border-amber-900/30">
                        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-2">
                          <AlertCircle className="h-4 w-4" />
                          <span className="font-medium">আপনি মিস করবেন</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          আপনি যেকোনো সময় আবার সাবস্ক্রাইব করতে পারবেন
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buttons with hover effects */}
                <div className="flex justify-center gap-4">
                  <motion.div
                    whileHover={{ scale: isSubscribing ? 1 : 1.05 }}
                    whileTap={{ scale: isSubscribing ? 1 : 0.98 }}
                    onHoverStart={() => !isSubscribing && setHoverNo(true)}
                    onHoverEnd={() => !isSubscribing && setHoverNo(false)}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleDecline}
                      disabled={isSubscribing}
                      className={cn(
                        "w-28 h-12 text-lg font-medium border-2 transition-all duration-300",
                        hoverNo && !isSubscribing ? "border-gray-400 bg-gray-100 dark:bg-gray-800" : "",
                      )}
                    >
                      না
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: isSubscribing ? 1 : 1.05 }}
                    whileTap={{ scale: isSubscribing ? 1 : 0.98 }}
                    onHoverStart={() => !isSubscribing && setHoverYes(true)}
                    onHoverEnd={() => !isSubscribing && setHoverYes(false)}
                  >
                    <Button
                      size="lg"
                      onClick={subscribeToPush}
                      disabled={isSubscribing}
                      className={cn(
                        "w-28 h-12 text-lg font-medium transition-all duration-300",
                        "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600",
                        "border-2 border-transparent",
                        hoverYes && !isSubscribing ? "shadow-lg shadow-blue-500/25" : "",
                      )}
                    >
                      {isSubscribing ? <Loader2 className="h-5 w-5 animate-spin" /> : "হ্যাঁ"}
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Bottom wave decoration */}
              <div className="h-6 bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='%23ffffff'/%3E%3C/svg%3E\")",
                    backgroundSize: "1200px 100%",
                    height: "100%",
                    width: "100%",
                  }}
                  animate={{
                    x: [0, -600, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

