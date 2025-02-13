"use client";

import Link from "next/link";
import Image from "next/image";
import img from "../../../assets/login.gif";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { LockKeyhole, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setCookie } from "@/axios/Cookies";
import toast from "react-hot-toast";
import TextInput from "@/util/TextInput";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Reg = () => {
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
      const res = await axios.post("http://localhost:5000/api/v1/user", data);
      console.log("response ", res);

      const accessToken = res?.data?.data?.accessToken;

      if (accessToken) {
        // Storing the accessToken in a cookie
        setCookie("sarabela-news", accessToken, { expires: 7 }); // Expires in 7 days

        // Optional: Store in localStorage if needed
        localStorage.setItem("sarabela-news", accessToken);

        // Navigate to dashboard
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
    <div className="max-w-7xl mx-auto">
      <Form {...form}>
        <div className="py-8 pt-20 lg:pt-0 mx-auto">
          <div className="shadow-xl mx-2 lg:mx-48 my-5 bg-white rounded-lg p-1 lg:p-8 border mt-4">
            <div className="grid md:grid-cols-2">
              <div className="w-auto space-y-8 mt-5">
                <h2 className="text-3xl font-bold">Registration</h2>

                <div className="space-y-5">
                  {/* Name input */}
                  <div className="relative flex-grow">
                    <div className="absolute p-2">
                      <User className="h-4 md:h-5 w-4 md:w-5" />
                    </div>

                    <TextInput
                      control={form.control}
                      name="name"
                      placeholder="Name"
                      className="pl-10 py-3 w-full border focus:ring-1 rounded"
                      rules={{ required: "Name is required" }}
                    />
                  </div>

                  {/* Email input */}
                  <div className="relative flex-grow">
                    <div className="absolute p-2">
                      <Mail className="h-4 md:h-5 w-4 md:w-5" />
                    </div>

                    <TextInput
                      control={form.control}
                      name="email"
                      placeholder="Email"
                      className="pl-10 py-3 w-full border focus:ring-1 rounded"
                      rules={{ required: "Email is required" }}
                    />
                  </div>

                  {/* Password input */}
                  <div className="relative flex-grow">
                    <div className="absolute p-2">
                      <LockKeyhole className="h-4 md:h-5 w-4 md:w-5" />
                    </div>

                    <TextInput
                      control={form.control}
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="pl-10 py-3 w-full border focus:ring-1 rounded"
                      rules={{ required: "Password is required" }}
                    />
                  </div>
                </div>

                <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                  Register
                </Button>
              </div>

              {/* Image Section */}
              <div className="flex lg:justify-center lg:items-center lg:content-center mt-6 md:mt-0 lg:mt-0">
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
                  Already a Member? Please{" "}
                  <Link
                    href={"/login"}
                    className="text-purple-600 hover:underline text-base text-center"
                  >
                    Log In.
                  </Link>
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
