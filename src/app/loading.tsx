import Loading from "@/components/Share/_components/Loading";
import React from "react";

const loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white ">
      <Loading />
    </div>
  );
};

export default loading;
