import Link from 'next/link'

import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import { SignUp } from '@clerk/nextjs'
import '@/app/(public)/(auth)/styles.css'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function Register() {
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-14 w-auto" />
        </Link>
      </div>
      <SignUp />
      <div className="text-xs ml-2 text-gray-600">
        Have an account? {" "}
        <Link href="/login" className="text-blue-600 font-bold">
          Sign in
        </Link>
      </div>
    </SlimLayout>
  )
}
