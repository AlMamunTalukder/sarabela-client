/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const subscription = await request.json()

    return NextResponse.json({ success: true, message: "Subscription successful" })
  } catch (error) {
    console.error("Error in subscription API:", error)
    return NextResponse.json({ success: false, message: "Subscription failed" }, { status: 500 })
  }
}

