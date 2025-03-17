// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { motion, AnimatePresence } from "framer-motion"
// import { Bell, X } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import logo from '../../../src/assets/logo/sarabela.jpg'
// export default function SubscriptionModal() {
//     const [showModal, setShowModal] = useState(false)

//     useEffect(() => {
//         // Check if the user has already made a choice
//         const subscriptionChoice = localStorage.getItem("subscriptionChoice")

//         // If no choice found, show the modal after a short delay
//         if (!subscriptionChoice) {
//             const timer = setTimeout(() => {
//                 setShowModal(true)
//             }, 1500) // Show after 1.5 seconds

//             return () => clearTimeout(timer)
//         }
//     }, [])

//     // If user clicks "হ্যাঁ"
//     const handleSubscribe = async () => {
//         // 1) Optionally call your backend to store subscription
//         //    e.g. await fetch('/api/subscribe', { method: 'POST', ... });

//         // 2) Save the choice in localStorage
//         localStorage.setItem("subscriptionChoice", "yes")
//         setShowModal(false)
//     }

//     // If user clicks "না"
//     const handleDecline = () => {
//         localStorage.setItem("subscriptionChoice", "no")
//         setShowModal(false)
//     }

//     // Don't render anything if modal shouldn't be shown
//     if (!showModal) return null

//     return (
//         <AnimatePresence>
//             {showModal && (
//                 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//                     <motion.div
//                         initial={{ scale: 0.9, opacity: 0 }}
//                         animate={{ scale: 1, opacity: 1 }}
//                         exit={{ scale: 0.9, opacity: 0 }}
//                         transition={{ type: "spring", damping: 15 }}
//                         className="w-full max-w-md"
//                     >
//                         <Card className="border-2 shadow-lg overflow-hidden">
//                             <div className="absolute right-2 top-2">
//                                 <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleDecline}>
//                                     <X className="h-4 w-4" />
//                                     <span className="sr-only">Close</span>
//                                 </Button>
//                             </div>

//                             <CardHeader className="pb-2 text-center">
//                                 <div className="mx-auto flex flex-col items-center mb-2">
//                                     <div className="relative h-16 w-16 mb-2">
//                                         <Image
//                                             src={logo}
//                                             alt="SarabelaNews24 Logo"
//                                             fill
//                                             className="object-contain"
//                                         />
//                                     </div>
//                                     <CardTitle className="text-xl font-bold">SarabelaNews24</CardTitle>
//                                 </div>
//                                 <CardDescription className="text-center text-base">
//                                     আপনি কি সারাবেলানিউজ২৪ থেকে আপডেট নিয়মিত পেতে চান?
//                                 </CardDescription>
//                             </CardHeader>

//                             <CardContent className="pt-0 pb-2">
//                                 <div className="flex items-center justify-center gap-2 text-sm">
//                                     <Bell className="h-4 w-4 text-blue-500" />
//                                     <p>সর্বশেষ খবর এবং আপডেট পেতে সাবস্ক্রাইব করুন</p>
//                                 </div>
//                             </CardContent>

//                             <CardFooter className="flex justify-center gap-4 pt-2 pb-6">
//                                 <Button variant="outline" size="lg" onClick={handleDecline} className="w-24 text-lg font-medium">
//                                     না
//                                 </Button>
//                                 <Button
//                                     size="lg"
//                                     onClick={handleSubscribe}
//                                     className="w-24 text-lg font-medium bg-blue-600 hover:bg-blue-700"
//                                 >
//                                     হ্যাঁ
//                                 </Button>
//                             </CardFooter>
//                         </Card>
//                     </motion.div>
//                 </div>
//             )}
//         </AnimatePresence>
//     )
// }

