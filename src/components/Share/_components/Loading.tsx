"use client";

import dynamic from "next/dynamic";
import loading from "@public/Loading.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[99999999999999] flex items-center justify-center bg-white ">
      <Lottie animationData={loading} />
    </div>
  );
};

export default Loading;
