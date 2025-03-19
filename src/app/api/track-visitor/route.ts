import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const visitorData = await request.json()

    // Send the visitor data to your backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/visitor-tracker`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visitorData),
    })

    if (!response.ok) {
      throw new Error("Failed to track visitor on backend")
    }

    const result = await response.json()
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error("Error in visitor tracking API route:", error)
    return NextResponse.json({ success: false, message: "Failed to track visitor" }, { status: 500 })
  }
}

