import Link from 'next/link'

import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import { SignIn, auth } from '@clerk/nextjs'
import '@/app/(public)/(auth)/styles.css'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function Login() {
  const { userId }= auth()

  if(userId) {
    redirect("/dashboard")
  }

  return (
    <SlimLayout>
      <div className="flex justify-center">
        <Link href="/" aria-label="Home">
          <Logo className="h-14 w-auto" />
        </Link>
      </div>
      <SignIn afterSignInUrl={"/dashboard"} afterSignUpUrl={"/dashboard/organizations"}/>
      <div className="text-xs ml-2 text-gray-600">
        No account? {" "}
        <Link href="/register" className="text-blue-600 font-bold">
          Sign up
        </Link>
      </div>
    </SlimLayout>
  )
}
