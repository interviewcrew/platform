import Image from "next/image";

import { Container } from "@/components/Container";
import avatarUsman from "@/images/avatars/avatar-usman.jpg";
import avatarOren from "@/images/avatars/avatar-oren.jpeg";
import avatarAli from "@/images/avatars/avatar-ali.jpeg";

const testimonials = [
  [
    {
      content: [
        "InterviewCrew has been instrumental in scaling our development team efficiently.",
        "They helped us define positions, craft job descriptions, and design our hiring funnel.",
        "Their management of the entire interview process, including live coding sessions, was invaluable for us as a busy early-stage startup.",
        "Before InterviewCrew, we handled everything ourselves, which was time-consuming. Now, we receive a curated list of technically vetted candidates, allowing us to focus solely on cultural fit.",
        "This service has significantly streamlined our hiring process and saved us countless hours.",
        "I highly recommend InterviewCrew to any startup looking to grow their tech team while maintaining focus on their core business.",
      ],
      author: {
        name: "Ali Nezamolmaleki",
        role: "Co-founder & CTO at Faircado",
        image: avatarAli,
      },
    },
  ],
  [
    {
      content: [
        "InterviewCrew allowed me to fully showcase my skills. The interview rounds were both challenging and engaging, creating a collaborative team effort.",
        "I particularly appreciated that their interviews closely mirrored real-world work scenarios, which I found very beneficial.",
      ],
      author: {
        name: "Usman Sajjad",
        role: "Senior Frontend Engineer at Faircado",
        image: avatarUsman,
      },
    },
  ],
  [
    {
      content: [
        "Personally, I had an exceptional experience with the interview services provided by InterviewCrew.",
        "The process was incredibly efficient and professional, making the entire process seamless and stress-free.",
        "Though the tests provided by InterviewCrew weren't that easy to pass it was convenient and interesting ones.",
        "Honestly, Compared to other interviews I've had, InterviewCrew stood out for its organization and clarity.",
        "I highly recommend InterviewCrew to anyone seeking a positive and professional interview experience.",
      ],
      author: {
        name: "Oren Hoffman",
        role: "Senior Software Engineer at eToro",
        image: avatarOren,
      },
    },
  ],
];

function QuoteIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg aria-hidden="true" width={105} height={78} {...props}>
      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="bg-slate-50 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-satoshi text-[36px] sm:text-[40px] font-semibold leading-[120%] text-slate-900">
            Loved by Candidates and Companies
          </h2>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                {column.map((testimonial, testimonialIndex) => (
                  <li key={testimonialIndex}>
                    <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                      <QuoteIcon className="absolute left-6 top-6 fill-slate-100" />
                      <blockquote className="relative">
                        {testimonial.content.map((paragraph, index) => (
                          <p
                            key={index}
                            className="font-inter text-base leading-[150%] text-slate-900"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </blockquote>
                      <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                        <div>
                          <div className="font-inter text-base font-medium text-slate-900">
                            {testimonial.author.name}
                          </div>
                          <div className="mt-1 font-inter text-sm leading-[140%] text-slate-500">
                            {testimonial.author.role}
                          </div>
                        </div>
                        <div className="overflow-hidden rounded-full bg-slate-50">
                          <Image
                            className="h-14 w-14 object-cover"
                            src={testimonial.author.image}
                            alt=""
                            width={56}
                            height={56}
                          />
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
