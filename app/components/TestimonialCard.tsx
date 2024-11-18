import React, { useState } from 'react';
import Image from 'next/image';

interface Review {
  id: number;
  userName: string;
  course: string;
  date: string;
  professorRating: number;
  courseRating: number;
  reviewContent: string;
}

interface TestimonialCardProps {
  review: Review;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ review }) => {
  const [isLikeHovered, setIsLikeHovered] = useState(false);
  const [isDislikeHovered, setIsDislikeHovered] = useState(false);
  const [selectedButton, setSelectedButton] = useState<"like" | "dislike" | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <div className="mb-10">
      <div className="testimonial-content w-2/3 mx-auto bg-red-600">
        <div className="bg-black text-white px-10 pt-5">
          <div className="flex justify-between">
            <h3 className="text-2xl font-bold">{review.userName}</h3>
            <span className="text-2xl self-center">{formatDate(review.date)}</span>
          </div>
          <div className="flex justify-between">
            <h4 className="text-2xl self-center">CS {review.course}</h4>
            <div className="w-32 flex justify-between">
              <button
                onMouseEnter={() => setIsLikeHovered(true)}
                onMouseLeave={() => setIsLikeHovered(false)}
                onClick={() => setSelectedButton("like")}
              >
                <Image 
                  src="/like.svg"
                  alt="Like symbol"
                  width={40}
                  height={40}
                  style={{
                    filter: isLikeHovered || selectedButton === "like"
                      ? 'invert(34%) sepia(91%) saturate(548%) hue-rotate(85deg) brightness(220%) contrast(89%)'
                      : 'invert(1) brightness(100)',
                  }}
                />
              </button>
              <button
                onMouseEnter={() => setIsDislikeHovered(true)}
                onMouseLeave={() => setIsDislikeHovered(false)}
                onClick={() => setSelectedButton("dislike")}
              >
                <Image 
                  src="/dislike.svg"
                  alt="Dislike symbol"
                  width={40}
                  height={40}
                  style={{
                    filter: isDislikeHovered || selectedButton === "dislike"
                      ? 'invert(20%) sepia(100%) saturate(3500%) hue-rotate(0deg) brightness(150%) contrast(100%)'
                      : 'invert(1) brightness(100)',
                  }}
                />
              </button>
            </div>
          </div>
        </div>
        <p className="text-white text-3xl text-center mx-auto w-11/12 py-10">{review.reviewContent}</p>
        <div className="flex justify-evenly pb-8">
          <div className="self-center">
            <p className="text-center text-2xl font-bold my-auto py-4">Professor Rating</p>
            <div 
              className="radial-progress bg-black text-red-600 border-4 border-white" 
              style={{ "--value": review.professorRating, "--size": "12rem", "--thickness": "1rem" } as React.CSSProperties} 
              role="progressbar">
                <span className="text-white text-xl">{review.professorRating}%</span>
            </div>
          </div>

          <div className="self-center">
            <p className="text-center text-2xl font-bold my-auto py-4">Course Rating</p>
            <div 
              className="radial-progress bg-black text-red-600 border-4 border-white" 
              style={{ "--value": review.courseRating, "--size": "12rem", "--thickness": "1rem" } as React.CSSProperties} 
              role="progressbar">
                <span className="text-white text-xl">{review.courseRating}%</span>
            </div>
          </div>
        </div>

        <Image 
          src="/TTU_Horizontal_Lineart_white.png"
          alt="TTU line art decal."
          width={1000}
          height={100}
          style={{ width:"100%", height:"100%"}}
        />
      </div>
    </div>
  );
}

export default TestimonialCard;