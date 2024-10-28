import React from "react";
import Image from "next/image";
import AISearchBar from "./AISearchBar";

const AITool = () => {
  return (
    <div className="drawer drawer-end fixed z-40">
      <input id="ai-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="ai-drawer"
          className="btn btn-circle fixed bottom-2 right-2 h-20 w-20 bg-red-600 border-black z-40"
        >
          <Image
            src="/DoubleT.png"
            alt="TTU DoubleT"
            width={500}
            height={500}
            style={{ width: "60%", height: "65%" }}
          />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="ai-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-base-200 text-base-content min-h-screen w-11/12 sm:w-2/3 lg:w-2/6 pt-20 flex content-center p-0">
          {/* ai content here */}
          <div className="bg-red-600 pt-4 w-full h-20">
            <h1 className="text-gray-100 p-2 text-3xl font-bold text-center">
              Ask Red Rater AI
            </h1>
          </div>
          <div className="bg-slate-200 h-full">Body</div>
          <div className="bg-black w-full h-24 fixed bottom-0 left-0 flex items-center p-5">
            <AISearchBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITool;
