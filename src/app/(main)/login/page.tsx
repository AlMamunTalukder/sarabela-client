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
import TextInput from "@/util/TextInput";
import { LockKeyhole, User } from "lucide-react";
import axios from "axios";
import { setCookie } from "@/axios/Cookies";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
        toast.error(res.data.message || 'Registration failed!');
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
                  <div className="flex gap-2 items-center border border-b-[1px] border-white border-b-gray-300 ">
                    <User />
                    <TextInput
                      control={form.control}
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="w-full"
                      rules={{
                        required: "Name is required",
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex gap-2 items-center border border-b-[1px] border-white border-b-gray-300">
                      <LockKeyhole />
                      <TextInput
                        control={form.control}
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full"
                        rules={{
                          required: "Password is required",
                        }}
                      />
                    </div>

                    <Link
                      href={"#"}
                      className="text-yellow-500 text-right justify-end text-xs font-bold"
                    >
                      {" "}
                      Forgot Password?
                    </Link>
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

                {/* <div className="flex items-center gap-2">
                  <h2 className="text-sm">Or, Log In with - </h2>
                  <Link href={"#"}>
                    <Image
                      src={google}
                      className="h-5 w-5 rounded"
                      alt="this is google"
                      height={100}
                      width={100}
                    />
                  </Link>
                  <Link href={"#"}>
                    <Image
                      src={fb}
                      className="h-5 w-5 rounded"
                      alt="this is facebook"
                      height={100}
                      width={100}
                    />
                  </Link>
                </div> */}
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
