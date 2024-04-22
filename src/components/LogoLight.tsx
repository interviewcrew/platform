import Image from "next/image";
import interviewcrew from "@/images/logos/interviewcrew-typography-light.svg";

export function LogoLight(props: React.ComponentPropsWithoutRef<React.ElementType<any>>) {
  return (
    <div className="flex">
      <Image src={interviewcrew} alt="InterviewCrew" {...props}/>
    </div>
  );
}
