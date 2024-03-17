import Image from "next/image";

import { Container } from "@/components/Container";
import backgroundImage from "@/images/background-faqs.jpg";

const faqs = [
  [
    {
      question: "How does the tool work?",
      answer:
        "You install an extension, enter the google meet call and the tool will start working." +
        " It will provide you with the best questions to ask the candidate, and answer their questions as well." +
        " You could also share the link to online coding challenges and the tool will take care of the rest.",
    },
    {
      question: "Who is this product for?",
      answer:
        "In whatever level of skill you are, if you are a recruiter, a hiring manager or a software engineer, this tool is for you." +
        " It helps recruiters do initial technically reliable evaluation, helps software engineers to have another pair of eyes and helps hiring managers by saving valuable time from their software engineers.",
    },
  ],
  [
    {
      question: "How does the subscription work?",
      answer: "If you go with the \"Just give me the tool\" plan, you pay €5 per interview but you have to bring your own OpenAI key and pay for the tokens used yourself." +
      " But if you want the most convinient plan, you pay €10 per interview and we handle the OpenAI API keys and tokens and everything." + 
      " You could charge your account with credits and we will use them as you use the tool, or if you want you could pay per interview.",
    },
    {
      question: "What do we mean by risk free?",
      answer:
        "If you are not satisfied with the result of any of your interviews for any reason, we will refund you the money you spent on that interview.",
    },
  ],
  [
    {
      question:
        "Why do I need this tool? I can do all of this by myself.",
      answer:
        "Although technically you could do this by using a combination of tools, but the ChatGPT interface, trascribing the interview," +
        " coming up with follow up questions in real time and answering caldidates questions, and last but not least, finding a good coding environment is always a hastle." +
        " We perfected the prompts and the follow up questions to be the best possible. We also provide you with a library of assignments and a live coding environment.",
    },
    {
      question:
        "What programming languages are supported?",
      answer:
        "We have a wide variaty of programming languages avaialable for you to use in the live coding environment." 
    },
  ]
];

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, email our support team using support@interviewcrew.io.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
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
