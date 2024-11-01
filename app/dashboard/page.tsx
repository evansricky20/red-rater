import React from "react";
import Image from "next/image";
import LineGraph from "../components/LineGraph"
import Searchbar from "../components/SearchBar";

const dashboard = () => {
  return (
    <main className="h-screen pt-20">
      <section className="info-section h-fit flex justify-center border-4 border-blue-300">
        <div className="pt-10 border-4 border-red-400">
          <h1 className="text-6xl font-bold">Professor Name</h1>
          <div className="flex border-4 border-green-400">
            <div className="flex flex-col w-1/2 border-4 border-blue-600">
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
              <div className="w-full h-full">
                <LineGraph />
              </div>
              
            </div>
            <div className="data-board flex flex-col w-1/2 border-4 border-red-300">
              <h3 className="text-center text-2xl font-bold my-auto">Overall Rating</h3>
              <div className="self-center">
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
                  width={1000}
                  height={100}
                  style={{ width: "100%", height: "100%" }}
                />
            </div>
          </div>
        </div>
      </section>
      <section className="testimonial-section h-fit flex justify-center border-4 border-red-500">
        <div role="tablist" className="tabs tabs-bordered tabs-lg flex-1 bg-red-600 font-bold">
            <input type="radio" name="testimonial_tabs" role="tab" className="tab" aria-label="Student Testimonials" defaultChecked/>
            <div role="tabpanel" className="tab-content p-10">
              Student Testimonials Content
            </div>

            <input type="radio" name="testimonial_tabs" role="tab" className="tab" aria-label="Student Evaluations" />
            <div role="tabpanel" className="tab-content p-10">
              Student Evaluations Content
            </div>
        </div>
      </section>
    </main>
  );
};

export default dashboard;
