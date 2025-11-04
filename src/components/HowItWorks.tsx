"use client";

import { useState } from "react";
import { Container } from "@/components/Container";

const companyBenefits = [
  {
    title: "Save Time & Resources",
    description: "We handle the entire technical interview process, from screening to final evaluation, saving you weeks of work.",
    icon: (
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    )
  },
  {
    title: "Access Top Talent",
    description: "Get matched with pre-vetted, high-quality candidates who have already passed our rigorous technical assessments.",
    icon: (
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    )
  },
  {
    title: "Cultural Fit Focus",
    description: "You only evaluate candidates who have passed technical interviews, focusing on cultural alignment and final fit.",
    icon: (
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
    )
  }
];

const talentBenefits = [
  {
    title: "Skip the Queue",
    description: "Bypass traditional application processes and get directly matched with companies looking for your specific skills.",
    icon: (
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
    )
  },
  {
    title: "Fair Technical Assessment",
    description: "Get evaluated by experienced engineers who understand your skillset, ensuring a fair and comprehensive assessment.",
    icon: (
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    )
  },
  {
    title: "Direct Company Access",
    description: "Connect directly with hiring managers and decision-makers, skipping multiple rounds of recruiter interviews.",
    icon: (
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      </div>
    )
  }
];

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState<'companies' | 'talents'>('companies');

  return (
    <section className="py-20 bg-slate-50">
      <Container>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            How InterviewCrew works
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            InterviewCrew connects incredible people to opportunities. It's for companies hiring, talents seeking roles, or professionals connecting others.
          </p>
        </div>
        
        <div className="mt-12 flex justify-center">
          <div className="relative bg-white rounded-full p-1 shadow-lg border border-slate-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('companies')}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeTab === 'companies'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Companies
              </button>
              <button
                onClick={() => setActiveTab('talents')}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeTab === 'talents'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                For Talents
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {(activeTab === 'companies' ? companyBenefits : talentBenefits).map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <div className="flex items-center space-x-4 mb-4">
                  {benefit.icon}
                  <h3 className="text-xl font-semibold text-slate-900">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-slate-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
