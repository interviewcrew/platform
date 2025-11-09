import Image from "next/image";
import interviewcrewTypography from "@/images/logos/interviewcrew-typography.svg";

type InterviewCrewLogoProps = {
  className?: string;
  variant?: 'light' | 'dark';
};

export function InterviewCrewLogo({ className = "", variant = "dark" }: InterviewCrewLogoProps) {
  return (
    <Image 
      src={interviewcrewTypography} 
      alt="InterviewCrew" 
      className={className}
      width={375}
      height={75}
    />
  );
}
