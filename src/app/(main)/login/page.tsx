"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import img from "../../../assets/login.gif";
// import google from "../../../../public/asset/Economy/agriculture.jpg";
// import fb from "../../../../public/asset/Economy/agriculture.jpg";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
// import TextInput from "@/util/TextInput";
import { LockKeyhole, User } from "lucide-react";
import { setCookie } from "@/axios/Cookies";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import TextInput from "@/util/TextInput";

type Inputs = {
  name: string;
  password: string;
};

const LogIn = () => {
  const router = useRouter()
  const form = useForm<Inputs>({
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = async (data: Inputs) => {
    console.log(data)
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/login', data);
      console.log('response ', res)

      // Correctly accessing the accessToken
      const accessToken = res?.data?.data?.accessToken;

      if (accessToken) {
        // Storing the accessToken in a cookie
        setCookie("sarabela-news", accessToken, { expires: 7 }); // Expires in 7 days

        // Optional: Store in localStorage if needed
        localStorage.setItem("sarabela-news", accessToken);

        // Navigate to dashboard
        router.push("/");
      }

      // Display success or error messages based on the response
      if (res.data.success) {
        toast.success('Login successfully!');
      } else {
        toast.error(res.data.message || 'Login failed!');
      }
    } catch (err: any) {
      if (err.response?.data?.errorSources) {
        // Map the error messages and display them
        const errorMessages = err.response.data.errorSources
          .map((error: { message: string }) => error.message)
          .join(', ');
        toast.error(errorMessages || 'Failed to register');
      } else {
        toast.error(err.response?.data?.message || 'Failed to register');
      }
    }
  };
  return (
    <>
      <div className="  max-w-7xl mx-auto ">
        <Form {...form}>
          <div className="">
            <div className="shadow-xl mx-2 lg:mx-48  bg-white rounded-lg p-4 lg:p-8 border mt-4">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="flex flex-col items-center space-y-5">
                  <Image
                    src={img}
                    alt="login"
                    className="h-auto w-auto rounded-lg"
                    height={100}
                    width={100}
                  />
                </div>
                <div className="w-auto space-y-8 mt-5">
                  <h2 className="text-3xl font-bold">Log In</h2>
                  <div className="space-y-5">


                    <div className="relative flex-grow">
                      <div className="absolute p-2">
                        <User className="h-4 md:h-5 w-4 md:w-5" />
                      </div>

                      <TextInput
                        control={form.control}
                        placeholder="Name"
                        className="pl-10 py-3 w-full border  focus:ring-1 rounded"
                        type="text"
                        name="name"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="relative flex-grow">
                        <div className="absolute p-2">
                          <LockKeyhole className="h-4 md:h-5 w-4 md:w-5" />
                        </div>

                        <TextInput
                          control={form.control}
                          className="pl-10 py-3 w-full border  focus:ring-1 rounded"
                          type="password"
                          name="password"
                          placeholder="Password"
                        />
                      </div>


                    </div>
                  </div>

                  <div className="flex gap-2 text-sm font-light">
                    <input type="checkbox" value="" /> Remember me
                  </div>

                  <Button onClick={form.handleSubmit(onSubmit)} type="submit">Log In</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 items-center mt-5 space-y-4 md:space-y-0 lg:space-y-0">
                <div className="flex flex-col lg:items-center ">
                  <h2 className="flex items-center gap-2 text-sm">
                    Create an Account?
                    <Link
                      href={"/reg"}
                      className="text-purple-600 hover:underline text-base lg:text-center"
                    >
                      {" "}
                      Register Now.
                    </Link>
                  </h2>
                </div>


              </div>
            </div>
          </div>
          {/* </Container> */}
        </Form>
      </div>
    </>
  );
};

export default LogIn;
