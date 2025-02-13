"use client"

import Link from "next/link";
import Image from "next/image";

import img from "../../../assets/login.gif";
// import google from "../../../../public/assests/logInReg/google.png";
// import fb from "../../../../public/assests/logInReg/fb.svg";


import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { LockKeyhole, Mail, User } from "lucide-react";
import TextInput from "@/util/TextInput";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { setCookie } from "@/axios/Cookies";
import { useRouter } from "next/navigation";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Reg = () => {
  const router = useRouter()
  const form = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: Inputs) => {
    try {
      const res = await axios.post('http://localhost:5000/api/v1/user', data);
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
        toast.success('Registered successfully!');
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
    <div className="max-w-7xl mx-auto">
      <Form {...form}>
        <div className="py-8 pt-20 lg:pt-0 mx-auto">
          <div className="shadow-xl mx-2 lg:mx-48 my-5 bg-white rounded-lg p-1 lg:p-8 border mt-4">
            <div className="grid md:grid-cols-2 ">
              <div className="w-auto space-y-8 mt-5">
                <h2 className="text-3xl font-bold">Registration</h2>
                <div className="flex gap-2 items-center border border-b-[1px] border-white border-b-gray-300 ">
                  <User />
                  <TextInput
                    control={form.control}
                    type="name"
                    name="name"
                    placeholder="Name"
                    className="w-full"
                    rules={{
                      required: "Name is required",
                    }}
                  />
                </div>
                <div className="flex gap-2 items-center border border-b-[1px] border-white border-b-gray-300 ">
                  <Mail />
                  <TextInput
                    control={form.control}
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full"
                    rules={{
                      required: "Email is required",
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


                </div>


                <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Registration</Button>
              </div>

              <div className="flex lg:justify-center lg:items-center lg:content-center  mt-6 md:mt-0 lg:mt-0">
                <Image
                  src={img}
                  alt="login"
                  className="h-auto w-auto rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 items-center mt-5 space-y-4 md:space-y-0 lg:space-y-0">

              <div className="flex flex-col items-center">
                <h2 className="flex items-center gap-1 text-sm">
                  Already a Member? Please
                  <Link
                    href={"/login"}
                    className="text-purple-600 hover:underline text-base text-center"
                  >
                    {" "}
                    Log In.
                  </Link>{" "}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Reg;
