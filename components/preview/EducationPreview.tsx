import React, { FC } from "react";
import SkeletonLoader from "@/components/skeleton-loader";
import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const EducationPreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {
  const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;

  if (isLoading) {
    return <SkeletonLoader />;
  }
  return (
    <div className="w-full my-5">
      <hr
        className="
          border-[1.5px] my-2
          "
        style={{
          borderColor: themeColor,
        }}
      />
      <h5
        className="text-left font-bold
      mb-4
      "
        style={{ color: themeColor }}
      >
        Education
      </h5>

      <div className="flex flex-col gap-2 min-h-9">
        {resumeInfo?.educations?.map((education, index) => (
          <div key={index}>
            <h5 className="text-sm font-bold" style={{ color: themeColor }}>
              {education?.universityName}
            </h5>
            <div className="flex items-start justify-between">
              <h5 className="text-[13px]">
                {education?.degree}
                {education?.degree && education?.cgpa && " in "}
               <span className="font-bold"> {education?.cgpa} </span>
              </h5>
              <span className="text-[13px]">
                {education?.startDate}
                {education?.startDate && " - "}
                {education?.endDate}
              </span>
            </div>
            <p className="text-[13px] my-2">{education?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationPreview;
