import React, { useEffect, useState } from "react";
import Image from "next/image";
import LineGraph from "./LineGraph";
import { notFound } from "next/navigation";

interface InfoCardProps {
  searchTerm: string;
}

interface Profile {
  name: string;
  courses: string[];
  //descriptors: string[];
  overallRating: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ searchTerm }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `/api/professors/${encodeURIComponent(searchTerm)}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Transform the data to match the Profile interface
        const transformedProfile: Profile = {
          name: data[0].Name,
          courses: Array.from(
            new Set(data.map((item: any) => item["Course Num"]))
          ),
          //descriptors: data.map((item: any) => item.Response),
          overallRating: parseFloat(
            (
              (data.reduce((acc: number, item: any) => acc + item.Average, 0) /
                data.length) *
              20
            ).toFixed(2)
          ),
        };

        setProfile(transformedProfile);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    notFound(); // Trigger the default Next.js 404 page
  }

  return (
    <div className="pt-10 pb-5 w-3/4">
      <h1 className="text-6xl font-bold max-w-5xl">{profile.name}</h1>
      <div className="flex">
        <div className="flex flex-col w-1/2">
          <div className="flex justify-between">
            <select
              className="select select-bordered max-w-xs font-bold"
              defaultValue="Course List"
            >
              <option disabled>Course List</option>
              {profile.courses.map((course, index) => (
                <option key={index}>{course}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4 my-4">
            {/* {profile.descriptors.map((descriptor, index) => (
              <div
                key={index}
                className="descriptor text-center bg-slate-300 rounded-sm p-2"
              >
                <span>{descriptor}</span>
              </div>
            ))} */}
            <p className="flex items-center justify-center w-fit min-w-64 bg-gray-400 rounded-md h-10 p-1 font-bold">
              Descriptor
            </p>
            <p className="flex items-center justify-center w-fit min-w-64 bg-gray-400 rounded-md h-10 p-1 font-bold">
              Descriptor
            </p>
            <p className="flex items-center justify-center w-fit min-w-64 bg-gray-400 rounded-md h-10 p-1 font-bold">
              Descriptor
            </p>
            <p className="flex items-center justify-center w-fit min-w-64 bg-gray-400 rounded-md h-10 p-1 font-bold">
              Descriptor
            </p>
            <p className="flex items-center justify-center w-fit min-w-64 bg-gray-400 rounded-md h-10 p-1 font-bold">
              Descriptor
            </p>
            <p className="flex items-center justify-center w-fit min-w-64 bg-gray-400 rounded-md h-10 p-1 font-bold">
              Descriptor
            </p>
          </div>
          <div className="w-full h-full">
            <LineGraph />
          </div>
        </div>
        <div className="data-board flex flex-col w-1/2">
          <h3 className="text-center text-4xl font-bold my-auto pb-3">
            Overall Rating
          </h3>
          <div className="self-center">
            <div
              className="radial-progress bg-white text-red-600 border-4 border-black"
              style={
                {
                  "--value": profile.overallRating,
                  "--size": "16rem",
                  "--thickness": "2rem",
                } as React.CSSProperties
              }
              role="progressbar"
            >
              <span className="text-black text-4xl font-semibold">
                {profile.overallRating}%
              </span>
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
  );
};

export default InfoCard;
