"use client";

import { useState } from "react";
import { Container } from "@/components/Container";

const faqs = [
    {
    question: "What is Liftoff?",
    answer: "Liftoff is a hiring and networking platform that helps you find incredible people through your trusted network. We facilitate human connections to help you discover the right opportunities and talent."
    },
    {
    question: "I know someone who's hiring. How can I help them?",
    answer: "You can share relevant opportunities with your network through Liftoff. When you see a role that might fit someone in your network, you can easily connect them with the hiring manager."
  },
    {
    question: "How does Liftoff differ from other networking platforms?",
    answer: "Liftoff focuses on authentic human connections rather than public broadcasts. We emphasize quality over quantity, helping you build meaningful relationships that lead to real opportunities."
    },
    {
    question: "Is Liftoff free to use?",
    answer: "Liftoff offers both free and premium tiers. Our free tier allows you to build your network and receive basic role recommendations, while premium features include advanced matching and priority support."
  },
    {
    question: "How do I get started on Liftoff?",
    answer: "Getting started is simple - just book a session with us, build your profile with your interests and skills, and start connecting with people in your network. We'll help you discover relevant opportunities."
  }
];

export function Faqs() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-slate-50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
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
                  <span className="font-medium text-slate-900">
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
                    <p className="text-slate-600">
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