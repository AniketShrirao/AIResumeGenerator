import SkeletonLoader from "@/components/skeleton-loader";
import { INITIAL_THEME_COLOR } from "@/lib/helper";
import { ResumeDataType, ExperienceType } from "@/types/resume.type";
import { useDragAndDrop } from "@/hooks/use-drag-and-drop";
import React, { FC, useEffect, useState, useCallback } from "react";

interface PropsType {
  resumeInfo: ResumeDataType | undefined;
  isLoading: boolean;
}

const ExperiencePreview: FC<PropsType> = ({ resumeInfo, isLoading }) => {
  const themeColor = resumeInfo?.themeColor || INITIAL_THEME_COLOR;
  const [groupedExperiences, setGroupedExperiences] = useState<ExperienceType[]>([]);

  const groupExperiencesByCompany = useCallback((experiences: ExperienceType[]): ExperienceType[] => {
    // Group experiences by company
    const companiesMap = new Map<string, ExperienceType[]>();
    
    experiences.forEach(exp => {
      const companyKey = exp.companyName || 'Other';
      if (!companiesMap.has(companyKey)) {
        companiesMap.set(companyKey, []);
      }
      companiesMap.get(companyKey)?.push(exp);
    });

    // Sort experiences within each company
    companiesMap.forEach((exps, company) => {
      exps.sort((a, b) => {
        // Put entries without dates at the end
        if (!a.startDate) return 1;
        if (!b.startDate) return -1;
        // Sort by date in descending order
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      });
    });

    // Flatten the grouped experiences
    return Array.from(companiesMap.values()).flat();
  }, []);

  useEffect(() => {
    if (resumeInfo?.experiences?.length) {
      const sorted = groupExperiencesByCompany(resumeInfo.experiences);
      setGroupedExperiences(sorted);
    }
  }, [resumeInfo?.experiences, groupExperiencesByCompany]);

  const {
    items: experiences,
    isDragging,
    draggedItem,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    handleDragOver
  } = useDragAndDrop<ExperienceType>(groupedExperiences);

  // Update resumeInfo when experiences order changes
  useEffect(() => {
    if (experiences?.length && resumeInfo?.experiences?.length) {
      const updatedResumeInfo = { ...resumeInfo };
      updatedResumeInfo.experiences = experiences;
      // Here you would typically call a function to update the resume info in your app state
      // For example: updateResumeInfo(updatedResumeInfo);
    }
  }, [experiences]);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="w-full my-5">
      <hr
        className="border-[1.5px] my-2"
        style={{ borderColor: themeColor }}
      />
      <h5
        className="text-left font-bold mb-4"
        style={{ color: themeColor }}
      >
        Work Experience
      </h5>

      <div 
        className="flex flex-col gap-2 min-h-9 transform-gpu"
        onDragOver={handleDragOver}
      >
        {experiences?.map((experience, index) => (
          <div
            key={experience.id || index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            style={{
              transform: isDragging && draggedItem === experience ? 'scale(0.98)' : 'scale(1)',
              transition: 'transform 150ms ease-in-out, opacity 150ms ease-in-out, box-shadow 150ms ease-in-out',
              willChange: 'transform, opacity, box-shadow'
            }}
            className={`
              cursor-move 
              relative 
              ${isDragging && draggedItem === experience ? 'opacity-60 shadow-lg z-10' : 'opacity-100 z-0'} 
              ${isDragging ? 'hover:bg-gray-100' : 'hover:bg-gray-50'} 
              rounded-lg 
              p-3 
              bg-white 
            dark:bg-slate-950
              hover:dark:bg-zinc-900
              dark:text-white
              border 
              ${isDragging ? 'border-gray-300' : 'border-transparent'}
              transform-gpu
            `}
          >
            <h5 className="text-[15px] font-bold" style={{ color: themeColor }}>
              {experience?.title}
            </h5>
            <div className="flex items-start justify-between mb-2">
              <h5 className="text-[13px]">
                {experience?.companyName}
                {experience?.companyName && experience?.client && ", "}
                {experience?.client}
              </h5>
              <span className="text-[13px]">
                {experience?.startDate}
                {experience?.startDate && " - "}
                {experience?.currentlyWorking ? "Present" : experience?.endDate}
              </span>
            </div>
            <div
              style={{ fontSize: "13px" }}
              className="exp-preview dark:text-white leading-[14.6px]"
              dangerouslySetInnerHTML={{
                __html: experience?.workSummary?.replace(/(style=".+?")/gm, '') || "",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencePreview;
