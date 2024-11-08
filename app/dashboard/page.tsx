import React from "react";
import Image from "next/image";
import InfoCard from "../components/InfoCard";
import TestimonialCard from "../components/TestimonialCard";

const dashboard = () => {
  return (
    <main className="h-screen">
      <div className="bg-hero bg-cover bg-center pt-20">
        <section className="info-section bg-white h-fit w-10/12 flex justify-center mx-auto mt-10">
          <InfoCard />
        </section>
      </div>
      <section className="testimonial-section h-fit flex flex-col justify-center mx-auto">
        <div className="flex-1 border-b-4 border-black bg-red-600 font-bold">
          <div className="lineart-element flex">
            <div style={{ transform: 'scaleX(-1)' }}>
              <Image 
                src="/TTU_Horizontal_Lineart_black.png"
                alt="TTU line art decal."
                width={1000}
                height={100}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <Image 
              src="/TTU_Horizontal_Lineart_white.png"
              alt="TTU line art decal."
              width={1000}
              height={100}
              style={{ width: "50%", height: "100%" }}
            />
          </div>
          <h2 className="text-center text-3xl text-white p-4">Student Testimonials</h2>
        </div>

        <div>
          <div className="w-2/3 mx-auto">
            <div className="testimonial-buttons w-7/12 ml-auto flex justify-between py-5 px-6">
              <button className="btn btn-outline place-self-center border-2">
                New Post
                <Image 
                  src="/plus.svg"
                  alt="Plus symbol"
                  width={20}
                  height={20}
                />
              </button>
              <button className="btn btn-outline border-2">
                Filter
                <Image 
                  src="/filter.svg"
                  alt="Filter symbol"
                  width={20}
                  height={20}
                />
                </button>
            </div>
          </div>
          <TestimonialCard />
        </div>
      </section>
    </main>
  );
};

export default dashboard;
