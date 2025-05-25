import { Skeleton } from "@/components/ui/skeleton";
import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";
import React, { FC } from "react";

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const SummaryPreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {
  const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;

  return (
    <div className="w-full min-h-10">
            <h5
        className="text-left font-bold
      mb-4
      "
        style={{ color: themeColor }}
      >
        Professional Summary
      </h5>
      {isLoading ? (
        <Skeleton className="h-6 w-full" />
      ) : (
        <p className="text-[13px] !leading-4">
          {resumeInfo?.summary ||
            "Enter a brief description of your profession baground."}
        </p>
      )}
    </div>
  );
};

export default SummaryPreview;
