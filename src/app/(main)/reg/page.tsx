"use client";

import Link from "next/link";
import Image from "next/image";

import img from "../../../assets/login.gif";
// import google from "../../../../public/assests/logInReg/google.png";
// import fb from "../../../../public/assests/logInReg/fb.svg";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { LockKeyhole, Mail, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
                
                <div className="space-y-5">
                  {/* ------------------ */}

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
