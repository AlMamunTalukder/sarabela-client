"use client"

import Link from "next/link"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { LockKeyhole, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import axios from "axios"
import { setCookie } from "@/axios/Cookies"
import toast from "react-hot-toast"
import TextInput from "@/util/TextInput"

type Inputs = {
  name: string
  email: string
  password: string
}

const Reg = () => {
  const router = useRouter()
  const form = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: Inputs) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/user", data)

      const accessToken = res?.data?.data?.accessToken

      if (accessToken) {
        setCookie("sarabela-news", accessToken, { expires: 7 })
        localStorage.setItem("sarabela-news", accessToken)
        router.push("/")
      }

      if (res.data.success) {
        toast.success("Registered successfully!")
      } else {
        toast.error(res.data.message || "Registration failed!")
      }
    } catch (err: any) {
      if (err.response?.data?.errorSources) {
        const errorMessages = err.response.data.errorSources
          .map((error: { message: string }) => error.message)
          .join(", ")
        toast.error(errorMessages || "Failed to register")
      } else {
        toast.error(err.response?.data?.message || "Failed to register")
      }
    }
  }

  return (
    <div className=" flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">Join Sarabela News today</p>
        </div>
        <Form {...form}>
          <div className="space-y-6">
            <div className="relative">
              <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <TextInput
                control={form.control}
                name="name"
                placeholder="Full Name"
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rules={{ required: "Name is required" }}
              />
            </div>
            <div className="relative">
              <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <TextInput
                control={form.control}
                name="email"
                placeholder="Email Address"
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rules={{ required: "Email is required" }}
              />
            </div>
            <div className="relative">
              <LockKeyhole className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <TextInput
                control={form.control}
                name="password"
                type="password"
                placeholder="Password"
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rules={{ required: "Password is required" }}
              />
            </div>
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </Button>
          </div>
        </Form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already a member?{" "}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Reg

