"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import LineGraph from "./LineGraph";

interface InfoCardProps {
  searchTerm: string;
  profile: any;
}

interface Profile {
  name: string;
  subjectName: string;
  terms: string[];
  courses: string[];
  entries: number;
  avgResponse1: number;
  avgResponse2: number;
  avgResponse3: number;
  overallRating: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ searchTerm, profile }) => {
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [filteredTerms, setFilteredTerms] = useState<string[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]); // Store raw data
  const [overallRating, setOverallRating] = useState<number>(0); // Initialize overallRating to 0
  const [profoverallRating, setProfOverallRating] = useState<number>(0);
  const [lineGraphData, setLineGraphData] = useState<
    { term: string; rating: number }[]
  >([]); // Data for LineGraph

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `/api/professors/${encodeURIComponent(searchTerm)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setData(data); // Store raw data

      // Transform the data to match the Profile interface
      const transformedProfile: Profile = {
        name: data[0].Name,
        subjectName: data[0].SubjectName,
        terms: Array.from(new Set(data.map((item: any) => item.Term))),
        courses: Array.from(new Set(data.map((item: any) => item.CourseNum))),
        entries: data.reduce(
          (acc: number, item: any) => acc + parseInt(item.Entries, 10),
          0
        ),
        avgResponse1: parseFloat(data[0].AvgResponse1),
        avgResponse2: parseFloat(data[0].AvgResponse2),
        avgResponse3: parseFloat(data[0].AvgResponse3),
        overallRating: Math.round(
          (parseFloat(data[0].OverallRating) / 5) * 100
        ),
      };
      const totalRating = data.reduce(
        (sum: number, item: any) => sum + parseFloat(item.OverallRating),
        0
      );
      const averageRating = totalRating / data.length;
      setProfOverallRating(Math.round((averageRating / 5) * 100));

      profile = transformedProfile;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [searchTerm]);

  useEffect(() => {
    if (selectedCourse) {
      const terms = Array.from(
        new Set(
          data
            .filter((item: any) => item.CourseNum === parseInt(selectedCourse))
            .map((item: any) => item.Term)
        )
      );
      setFilteredTerms(terms);

      // Extract overallRating and Term for the selected course
      const graphData = data
        .filter((item: any) => item.CourseNum === parseInt(selectedCourse))
        .map((item: any) => ({
          term: item.Term,
          rating: Math.round((parseFloat(item.OverallRating) / 5) * 100),
        }));
      setLineGraphData(graphData);

      // Set the selected term to the first term in the filtered terms
      if (terms.length > 0) {
        setSelectedTerm(terms[0]);
      }
    } else {
      setFilteredTerms([]);
      setLineGraphData([]);
      setSelectedTerm(null);
    }
  }, [selectedCourse, data]);

  useEffect(() => {
    if (selectedCourse && selectedTerm) {
      const selectedData = data.find(
        (item: any) =>
          item.CourseNum === parseInt(selectedCourse) &&
          item.Term === selectedTerm
      );
      if (selectedData) {
        const newOverallRating = Math.round(
          (parseFloat(selectedData.OverallRating) / 5) * 100
        );
        animateOverallRating(newOverallRating);
      }
    }
  }, [selectedCourse, selectedTerm, data]);

  const animateOverallRating = (newRating: number) => {
    const duration = 1000; // Duration of the animation in milliseconds
    const start = overallRating;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const interpolatedRating = start + (newRating - start) * progress;
      setOverallRating(interpolatedRating);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(e.target.value);
    setSelectedTerm(null); // Reset the selected term when the course changes
    animateOverallRating(0); // Interpolate the overall rating to 0 when the course changes
  };

  const handleTermChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const term = e.target.value;
    setSelectedTerm(term);
    if (!term) {
      animateOverallRating(0); // Interpolate the overall rating to 0 when the term is set to the default value
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return null; // Return null if profile is not set to avoid rendering errors
  }

  return (
    <div className="pt-10 pb-5 w-3/4">
      <div className="bg-black w-fit p-5">
        <h1 className="text-slate-100 text-6xl font-helvetica uppercase font-black max-w-5xl">
          {profile.name}
        </h1>
      </div>
      <h2 className="text-3xl text-helvetica font-bold max-w-3xl px-1 pb-2">
        {profile.subjectName}
      </h2>
      <div className="flex">
        <div className="flex flex-col w-1/2 pr-5">
          <div className="flex justify-between">
            <select
              className="select bg-white  select-bordered max-w-xs font-bold"
              defaultValue=""
              onChange={handleCourseChange}
            >
              <option value="" disabled>
                Course List
              </option>
              {profile.courses.map((course: string) => (
                <option key={course} value={course}>{`CS ${course}`}</option>
              ))}
            </select>
            <select
              className="select select-bordered max-w-xs font-bold"
              value={selectedTerm || ""}
              onChange={handleTermChange}
              disabled={!selectedCourse} // Disable the term dropdown if no course is selected
            >
              <option value="" disabled>
                Term
              </option>
              {filteredTerms.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4 my-4">
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
            <LineGraph data={lineGraphData} />
          </div>
        </div>
        <div className="data-board flex flex-col w-1/2 pl-5">
          <div className="flex flex-row content-center justify-between items-center">
            <div>
              <div className="bg-black h-fit w-fit p-3 mb-3">
                <h3 className="font-helvetica text-center text-slate-100 text-4xl font-bold">
                  Course Rating
                </h3>
              </div>
              <div className="self-center">
                <div
                  className="radial-progress bg-white text-ttu-red border-4 border-black"
                  style={
                    {
                      "--value": overallRating,
                      "--size": "16rem",
                      "--thickness": "2rem",
                    } as React.CSSProperties
                  }
                  role="progressbar"
                >
                  <span className="text-black text-4xl font-semibold">
                    {Math.round(overallRating)}%
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-black h-fit w-fit p-3 mb-3">
                <h3 className="font-helvetica text-center text-slate-100 text-4xl font-bold">
                  Overall Rating
                </h3>
              </div>
              <div className="self-center">
                <div
                  className="radial-progress bg-white text-ttu-gold border-4 border-black"
                  style={
                    {
                      "--value": profoverallRating,
                      "--size": "16rem",
                      "--thickness": "2rem",
                    } as React.CSSProperties
                  }
                  role="progressbar"
                >
                  <span className="text-black text-4xl font-semibold">
                    {Math.round(profoverallRating)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <Image
            src="/bubble_example.png"
            alt="example bubbles"
            width={1000}
            height={100}
            style={{ width: "100%", height: "100%" }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
