"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";
import React, { FC } from "react";

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const PersonalInfo: FC<PropsType> = ({ resumeInfo, isLoading }) => {
  const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;

  const getSocialLink = (type: string) => {
    const social = resumeInfo?.personalInfo?.social || [];
    const link = social.find(url => 
      url.startsWith(`${type}:`) || 
      (type === "linkedin" && url.includes("linkedin.com")) ||
      (type === "github" && url.includes("github.com")) ||
      (type === "website" && !url.includes("linkedin.com") && !url.includes("github.com"))
    );
    return link ? link.split(`${type}:`)[1] || link : "";
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }
  return (
    <div className="w-full min-h-14">
      <h2
        className="font-bold text-xl text-left"
        style={{
          color: themeColor,
        }}>
        {resumeInfo?.personalInfo?.firstName || "First Name"}{" "}
        {resumeInfo?.personalInfo?.lastName || "Last Name"}
      </h2>
      <h5 className="text-left text-sm font-medium">
        {resumeInfo?.personalInfo?.jobTitle || "Job Title"}
      </h5>
      <p className="text-left font-normal text-[13px]">
        {resumeInfo?.personalInfo?.email || "Email address"}
      </p>
      <div className="flex items-center justify-between pt-3">
        <h5 className="font-normal text-[13px]">
          {resumeInfo?.personalInfo?.phone && `Phone: ${resumeInfo.personalInfo.phone}`}
        </h5>
        <div className="flex gap-3 font-normal text-[13px]">
          {getSocialLink("linkedin") && (
            <a 
              className="text-blue-600 hover:underline" 
              href={getSocialLink("linkedin")} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          )}
          {getSocialLink("github") && (
            <a 
              className="text-gray-800 hover:underline" 
              href={getSocialLink("github")} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}
          {getSocialLink("website") && (
            <a 
              className="text-green-600 hover:underline" 
              href={getSocialLink("website")} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
          )}
        </div>
      </div>

      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: themeColor,
        }}
      />
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="w-full min-h-14">
      <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
      <Skeleton className="h-6 w-1/4 mx-auto mb-2" />
      <Skeleton className="h-6 w-1/3 mx-auto mb-2" />
      <div className="flex justify-between pt-3">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-[1.5] w-full my-2" />
    </div>
  );
};

export default PersonalInfo;
