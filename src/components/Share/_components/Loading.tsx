"use client";

import dynamic from "next/dynamic";
import loading from "@public/Loading.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const Loading = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Lottie animationData={loading} />
    </div>
  );
};

export default Loading;
