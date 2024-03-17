import Image from "next/image";
import logo from "@/images/logos/interviewcrew.svg";
import interviewcrew from "@/images/logos/interviewcrew.svg";

export function Icon(props: React.ComponentPropsWithoutRef<React.ElementType<any>>) {
  return (
    <div className="flex">
      <Image src={interviewcrew} alt="InterviewCrew" {...props}/>
    </div>
  );
}
