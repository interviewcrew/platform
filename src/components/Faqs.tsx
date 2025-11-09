"use client";

import { useState } from "react";
import { Container } from "@/components/Container";

const faqs = [
  {
    question: "What is the mock interview process like?",
    answer: "Our mock interviews are designed to feel exactly like real technical interviews. You'll have a one-on-one live session with a senior engineer from top companies, covering coding, system design, and communication skills. The session is virtual and you'll receive detailed, actionable feedback afterward."
  },
  {
    question: "Is the mock interview really free?",
    answer: "Yes, the mock interview is completely free with no strings attached. You'll get valuable feedback regardless of your performance, and if you perform well, you may be invited to join our vetted talent pool."
  },
  {
    question: "What happens if I perform well in the mock interview?",
    answer: "Strong performers are invited to join our selective talent pool. Once in the pool, we match you with companies that fit your skills and goals. You'll only meet companies after you've been fully evaluated, and they'll do one cultural fit interview before making an offer."
  },
  {
    question: "Who conducts the mock interviews?",
    answer: "Your mock interview will be conducted by a senior engineer from top companies. All our interviewers have real technical experience and are trained to provide fair, specific, and measurable feedback."
  },
  {
    question: "What topics are covered in the mock interview?",
    answer: "We assess coding, system design, and communication skills using real-world scenarios. The interview is structured to surface your actual technical ability, not just resume keywords."
  },
  {
    question: "How do I book a mock interview?",
    answer: "Simply click 'Book Your Mock Interview' and choose a time that fits your schedule. No prep needed - just come as you are and we'll evaluate your current skills."
  }
];

export function Faqs() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-slate-50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-satoshi text-[36px] sm:text-[40px] font-semibold leading-[120%] text-slate-900">
            Frequently asked questions
          </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                >
                  <span className="font-inter font-medium text-slate-900">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-slate-500 transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="font-inter text-base leading-[150%] text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}