import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const subscription = await request.json()
    console.log("Received subscription:", subscription)

    // Here you would typically store the subscription in your database
    // For example:
    // await db.insert({ table: 'subscriptions', data: subscription })

    // You could also send a test notification here if you want
    // await sendTestNotification(subscription)

    return NextResponse.json({ success: true, message: "Subscription successful" })
  } catch (error) {
    console.error("Error in subscription API:", error)
    return NextResponse.json({ success: false, message: "Subscription failed" }, { status: 500 })
  }
}

