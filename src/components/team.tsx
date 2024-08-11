import Image from "next/image";
import sadjadPhoto from "@/images/team/sadjad.png";
import mehdiPhoto from "@/images/team/mehdi.png";
import masoudPhoto from "@/images/team/masoud.png";
import sepehrPhoto from "@/images/team/sepehr.jpeg";
import EmmaIcon from "@/images/companies/emma-icon.svg";
import GoogleIcon from "@/images/companies/google-icon.svg";
import InterviewCrewIcon from "@/images/companies/interviewcrew-icon.svg";
import AppleIcon from "@/images/companies/apple-icon.svg";

const people = [
  {
    name: "Sadjad",
    role: "Staff Software Engineer",
    imageUrl: sadjadPhoto,
    xUrl: "#",
    linkedinUrl: "https://www.linkedin.com/in/msadjad/",
    companyIcons: [EmmaIcon, InterviewCrewIcon],
  },
  {
    name: "Mehdi",
    role: "Senior Software Engineer",
    imageUrl: mehdiPhoto,
    xUrl: "#",
    linkedinUrl: "https://www.linkedin.com/in/mehdikazemi8",
    companyIcons: [GoogleIcon, InterviewCrewIcon],
  },
  {
    name: "Masoud",
    role: "Senior Software Engineer",
    imageUrl: masoudPhoto,
    xUrl: "#",
    linkedinUrl: "https://www.linkedin.com/in/kazemimasoud",
    companyIcons: [AppleIcon],
  },

  {
    name: "Sepehr",
    role: "Senior Machine Learning Engineer, Apple",
    imageUrl: sepehrPhoto,
    xUrl: "#",
    linkedinUrl: "https://www.linkedin.com/in/sepehr-mohaimenianpour-09042534",
    companyIcons: [AppleIcon],
  },
  // More people...
];

function SwirlyDoodle(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 281 40"
      preserveAspectRatio="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Zm40.321-9.93c.1-.066.231-.085.29-.041.059.043-.024.096-.183.119-.177.024-.219-.007-.107-.079ZM172.299 26.22c9.364-6.058 5.161-12.039-12.304-17.51-11.656-3.653-23.145-5.47-35.243-5.576-22.552-.198-33.577 7.462-21.321 14.814 12.012 7.205 32.994 10.557 61.531 9.831 4.563-.116 5.372-.288 7.337-1.559Z"
      />
    </svg>
  );
}

export default function People() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Meet our{" "}
            <span className="relative whitespace-nowrap">
              <SwirlyDoodle className="absolute left-0 top-1/2 h-[1em] w-full fill-blue-400" />
              <span className="relative">World Class</span>
            </span>{" "}
            Interviewers
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-400">
            Conducted thousands of interviews in many companies ranging from
            startups to the biggest tech companies in the world
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
        >
          {people.map((person) => (
            <li
              key={person.name}
              className="rounded-2xl bg-gray-800 px-8 py-10"
            >
              <Image
                alt={person.name}
                src={person.imageUrl.src}
                className="mx-auto h-48 w-48 rounded-full md:h-56 md:w-56"
                width={person.imageUrl.width}
                height={person.imageUrl.height}
              />
              <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-white">
                {person.name}
              </h3>
              <div className="flex justify-center space-x-2">
                <p className=" col-span-3 text-sm leading-6 text-gray-400">
                  {person.role}
                </p>
                <div className="flex col-span-1">
                  {person.companyIcons.map((icon, index) => (
                    <Image
                      alt=""
                      src={icon}
                      className="mx-auto max-w-6 rounded-full"
                      width={32}
                      height={32}
                      key={`person-company-${index}`}
                    />
                  ))}
                </div>
              </div>
              <ul role="list" className="mt-6 flex justify-center gap-x-6">
                {/* <li>
                  <a
                    href={person.xUrl}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <span className="sr-only">X</span>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                    </svg>
                  </a>
                </li> */}
                <li>
                  <a
                    href={person.linkedinUrl}
                    target="_blank"
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
