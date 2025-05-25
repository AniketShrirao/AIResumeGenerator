import React, { useCallback, useEffect } from "react";
import { Loader } from "lucide-react";
import { useResumeContext } from "@/context/resume-info-provider";
import { PersonalInfoType, ResumeDataType } from "@/types/resume.type";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PersonalInfoSkeletonLoader from "@/components/skeleton-loader/personal-info-loader";
import { generateThumbnail } from "@/lib/helper";
import useUpdateDocument from "@/features/document/use-update-document";
import { toast } from "@/hooks/use-toast";

const initialState = {
  id: undefined,
  firstName: "",
  lastName: "",
  jobTitle: "",
  social: [],
  phone: "",
  email: "",
};

const PersonalInfoForm = (props: { handleNext: () => void }) => {
  const { handleNext } = props;
  const { resumeInfo, isLoading, onUpdate } = useResumeContext();
  const { mutateAsync, isPending } = useUpdateDocument();

  const [personalInfo, setPersonalInfo] =
    React.useState<PersonalInfoType>(initialState);

  useEffect(() => {
    if (!resumeInfo) {
      return;
    }
    if (resumeInfo?.personalInfo) {
      setPersonalInfo({
        ...(resumeInfo?.personalInfo || initialState),
      });
    }
  }, [resumeInfo?.personalInfo]);

  const handleChange = useCallback(
    (e: { target: { name: string; value: string } }) => {
      const { name, value } = e.target;

      if (name === "linkedin" || name === "github" || name === "website") {
        const socialIndex = personalInfo.social?.findIndex(url => 
          url.startsWith(`${name}:`) || 
          (name === "linkedin" && url.includes("linkedin.com")) ||
          (name === "github" && url.includes("github.com")) ||
          (name === "website" && !url.includes("linkedin.com") && !url.includes("github.com"))
        ) ?? -1;

        let newSocial = [...(personalInfo.social || [])];
        const formattedValue = value ? `${name}:${value}` : "";

        if (socialIndex >= 0) {
          if (value) {
            newSocial[socialIndex] = formattedValue;
          } else {
            newSocial.splice(socialIndex, 1);
          }
        } else if (value) {
          newSocial.push(formattedValue);
        }

        setPersonalInfo({
          ...personalInfo,
          social: newSocial
        });

        if (!resumeInfo) return;
        const updatedPersonalInfo = {
          ...resumeInfo,
          personalInfo: {
            ...resumeInfo.personalInfo,
            social: newSocial
          }
        };
        onUpdate(updatedPersonalInfo);
      } else {
        setPersonalInfo({ ...personalInfo, [name]: value });

        if (!resumeInfo) return;
        const updatedPersonalInfo = {
          ...resumeInfo,
          personalInfo: {
            ...resumeInfo.personalInfo,
            [name]: value
          }
        };
        onUpdate(updatedPersonalInfo);
      }
    },
    [resumeInfo, onUpdate, personalInfo]
  );

  const getSocialValue = (type: string) => {
    const social = personalInfo.social || [];
    const link = social.find(url => 
      url.startsWith(`${type}:`) || 
      (type === "linkedin" && url.includes("linkedin.com")) ||
      (type === "github" && url.includes("github.com")) ||
      (type === "website" && !url.includes("linkedin.com") && !url.includes("github.com"))
    );
    return link ? link.split(`${type}:`)[1] || link : "";
  };

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      const thumbnail = await generateThumbnail();
      const currentNo = resumeInfo?.currentPosition
        ? resumeInfo?.currentPosition + 1
        : 1;
      await mutateAsync(
        {
          currentPosition: currentNo,
          thumbnail: thumbnail,
          personalInfo: personalInfo,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "PersonalInfo updated successfully",
            });
            handleNext();
          },
          onError: () => {
            toast({
              title: "Error",
              description: "Failed to update personal information",
              variant: "destructive",
            });
          },
        }
      );
    },
    [resumeInfo, personalInfo]
  );

  if (isLoading) {
    return <PersonalInfoSkeletonLoader />;
  }

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Personal Information</h2>
        <p className="text-sm">Get Started with the personal information</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div
            className="grid grid-cols-2 
          mt-5 gap-3"
          >
            <div>
              <Label className="text-sm">First Name</Label>
              <Input
                name="firstName"
                required
                autoComplete="off"
                placeholder=""
                value={personalInfo?.firstName || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-sm">Last Name</Label>
              <Input
                name="lastName"
                required
                autoComplete="off"
                placeholder=""
                value={personalInfo?.lastName || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
              <Label className="text-sm">Job Title</Label>
              <Input
                name="jobTitle"
                required
                autoComplete="off"
                placeholder=""
                value={personalInfo?.jobTitle || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-sm">LinkedIn</Label>
              <Input
                name="linkedin"
                autoComplete="off"
                placeholder="Your LinkedIn profile URL"
                value={getSocialValue("linkedin")}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-sm">GitHub</Label>
              <Input
                name="github"
                autoComplete="off"
                placeholder="Your GitHub profile URL"
                value={getSocialValue("github")}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-sm">Website</Label>
              <Input
                name="website"
                autoComplete="off"
                placeholder="Your personal website URL"
                value={getSocialValue("website")}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
              <Label className="text-sm">Phone number</Label>
              <Input
                name="phone"
                required
                autoComplete="off"
                placeholder=""
                value={personalInfo?.phone || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
              <Label className="text-sm">Email</Label>
              <Input
                name="email"
                type="email"
                required
                autoComplete="off"
                placeholder=""
                value={personalInfo?.email || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/80"
              disabled={isPending}>
              {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
