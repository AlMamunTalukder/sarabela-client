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

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Reg = () => {
  const form = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
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
                  

                  <Button type="submit">Registration</Button>
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
              {/* <div className="flex items-center gap-2 pl-16">
                <h2 className="text-sm">Or, Log In with - </h2>
                <Link href={"#"}>
                  <Image
                    src={google}
                    className="h-5 w-5 rounded"
                    alt="this is google"
                  />
                </Link>

                <Link href={"#"}>
                  <Image
                    src={fb}
                    className="h-5 w-5 rounded"
                    alt="this is facebook"
                  />
                </Link>
              </div> */}
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
