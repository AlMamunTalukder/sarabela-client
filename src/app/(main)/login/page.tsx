/* eslint-disable react/no-unescaped-entities */
"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { LockKeyhole, User } from "lucide-react"
import { setCookie } from "@/axios/Cookies"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import TextInput from "@/util/TextInput"

type Inputs = {
  name: string
  password: string
}

const LogIn = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get("returnUrl") || "/"

  const form = useForm<Inputs>({
    defaultValues: {
      name: "",
      password: "",
    },
  })

  const onSubmit = async (data: Inputs) => {
    try {
      const res = await axios.post("https://api.sarabelanews24.com/api/v1/auth/login", data)

      const accessToken = res?.data?.data?.accessToken

      if (accessToken) {
        setCookie("sarabela-news", accessToken, { expires: 7 })
        localStorage.setItem("sarabela-news", accessToken)

        if (res.data.success) {
          toast.success("Login successful!")
          // Redirect to the return URL after successful login
          router.push(returnUrl)
        } else {
          toast.error(res.data.message || "Login failed!")
        }
      } else {
        toast.error("Login failed: No access token received")
      }
    } catch (err: any) {
      if (err.response?.data?.errorSources) {
        const errorMessages = err.response.data.errorSources
          .map((error: { message: string }) => error.message)
          .join(", ")
        toast.error(errorMessages || "Failed to login")
      } else {
        toast.error(err.response?.data?.message || "Failed to login")
      }
    }
  }

  return (
    <div className="py-8 flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/placeholder.svg?height=100&width=100"
            alt="login"
            className="mx-auto h-24 w-auto rounded-full shadow-md"
            height={100}
            width={100}
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
        </div>
        <Form {...form}>
          <div className="space-y-6">
            <div className="relative">
              <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <TextInput
                control={form.control}
                placeholder="Username"
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                name="name"
              />
            </div>
            <div className="relative">
              <LockKeyhole className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <TextInput
                control={form.control}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </Button>
          </div>
        </Form>
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/reg" className="font-medium text-blue-600 hover:text-blue-500">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LogIn

