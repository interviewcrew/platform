'use client'

import { Providers } from "@/app/providers";
import { Footer } from '@/components/Footer'
import { AssignmentHeader } from '@/components/AssignmentHeader'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <Providers>
            <div className="h-screen py-14">
              <AssignmentHeader />
              <main className="h-full">
                {children}
              </main>
              <Footer />
            </div>
        </Providers>
    )
}