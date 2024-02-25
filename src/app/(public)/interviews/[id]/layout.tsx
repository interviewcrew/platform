'use client'

import { Providers } from "@/app/providers";
import { Footer } from '@/components/Footer'
import { InterviewHeader } from '@/components/InterviewHeader'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <Providers>
            <div className="h-screen py-14">
              <InterviewHeader />
              <main className="h-full">
                {children}
              </main>
              <Footer />
            </div>
        </Providers>
    )
}