import React from "react";
import Image from "next/image";
import Searchbar from "../components/SearchBar";

const dashboard = () => {
  return (
    <div className="pt-24 flex justify-center border-4 border-blue-300">
      <div className="info-board">
        <h1 className="text-6xl font-bold">Professor Name</h1>
        <div className="flex">
          <div className="flex flex-col w-5/6">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold text-red-700 my-auto">Professor College</h2>
              <select className="select select-bordered max-w-xs font-bold">
                <option disabled selected>Course List</option>
                <option>Example 1</option>
                <option>Example 2</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 my-4">
              {/* Example descriptors, should be passed as an array function instead. */}
              <div className="descriptor bg-slate-300">
                <span>Professor Descriptor...</span>
              </div>
              <div className="descriptor bg-slate-300">
                <span>Professor Descriptor...</span>
              </div>
              <div className="descriptor bg-slate-300">
                <span>Professor Descriptor...</span>
              </div>
              <div className="descriptor bg-slate-300">
                <span>Professor Descriptor...</span>
              </div>
            </div>

            <Image 
              src="/example_graph.png"
              alt="example graph"
              width={300}
              height={300}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="data-board flex flex-col border-4 border-red-300">
            <h3 className="text-center text-2xl font-bold">Overall Rating</h3>
            <div>
              <div 
                className="radial-progress" 
                style={{ "--value": "70", "--size": "12rem", "--thickness": "2rem" } as React.CSSProperties} 
                role="progressbar">
                  70%
              </div>
            </div>
            <Image 
                src="/bubble_example.png"
                alt="example bubbles"
                width={300}
                height={300}
                style={{ width: "100%", height: "100%" }}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
