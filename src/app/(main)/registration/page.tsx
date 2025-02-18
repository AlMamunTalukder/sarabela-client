"use client";

import Link from "next/link";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { LockKeyhole, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setCookie } from "@/axios/Cookies";
import toast from "react-hot-toast";
import TextInput from "@/util/TextInput";
import Image from "next/image";
import img from "../../../assets/login.gif";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Registration = () => {
  const router = useRouter();
  const form = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: Inputs) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/user`,
        data
      );

      const accessToken = res?.data?.data?.accessToken;

      if (accessToken) {
        setCookie("sarabela-news", accessToken, { expires: 7 });
        localStorage.setItem("sarabela-news", accessToken);
        router.push("/");
      }

      if (res.data.success) {
        toast.success("Registered successfully!");
      } else {
        toast.error(res.data.message || "Registration failed!");
      }
    } catch (err: any) {
      if (err.response?.data?.errorSources) {
        const errorMessages = err.response.data.errorSources
          .map((error: { message: string }) => error.message)
          .join(", ");
        toast.error(errorMessages || "Failed to register");
      } else {
        toast.error(err.response?.data?.message || "Failed to register");
      }
    }
  };

  return (
    <div className="py-8 flex items-center justify-center">
      <div className="shadow-xl mx-2 lg:mx-48  bg-white rounded-lg p-4 lg:p-8 border mt-4">
        <Form {...form}>
          <div className="">
            <div className="  bg-white p-1 lg:p-2  mt-4">
              <div className="grid md:grid-cols-2 ">
                <div className="max-w-md w-full space-y-8 bg-white rounded-xl ">
                  <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                      Create your account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                      Join Sarabela News today
                    </p>
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
                </div>
                {/* <div className="w-auto space-y-8 mt-5">
                <h2 className="text-3xl font-bold">Registration</h2>
                
                <div className="space-y-5">
            

                  <div className="relative flex-grow">
                    <div className="absolute p-2">
                      <User className="h-4 md:h-5 w-4 md:w-5" />
                    </div>

                    <Input
                      placeholder="Name"
                      className="pl-10 py-3 w-full border  focus:ring-1 rounded"
                      type="name"
                      name="name"
                    />
                  </div>
                  <div className="relative flex-grow">
                    <div className="absolute p-2">
                      <Mail className="h-4 md:h-5 w-4 md:w-5" />
                    </div>

                    <Input
                      placeholder="Email"
                      className="pl-10 py-3 w-ful border  focus:ring-1 rounded"
                      type="email"
                      name="email"
                    />
                  </div>
              
                    <div className="relative flex-grow">
                      <div className="absolute p-2">
                        <LockKeyhole className="h-4 md:h-5 w-4 md:w-5" />
                      </div>

                      <Input
                        className="pl-10 py-3 w-ful border  focus:ring-1 rounded"
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                    </div>
                   
             
                </div>

                <Button type="submit">Registration</Button>
              </div> */}

                <div className="flex lg:justify-center lg:items-center lg:content-center  mt-6 md:mt-0 lg:mt-0">
                  <Image
                    src={img}
                    alt="login"
                    className="h-auto w-auto rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 items-center mt-0 space-y-4 md:space-y-0 lg:space-y-0">
                <div className="text-center mt-0">
                  <p className="text-sm text-gray-600">
                    Already a member?
                    <Link
                      href="/login"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {" "}Log in here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
