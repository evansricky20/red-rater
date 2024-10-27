import React from "react";
import Image from "next/image";

const AITool = () => {
  return (
    <div className="drawer fixed">
      <input id="ai-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="ai-drawer"
          className="btn btn-circle fixed bottom-8 right-8 h-24 w-24 bg-red-600 border-black"
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
    </div>
  );
};

export default AITool;
