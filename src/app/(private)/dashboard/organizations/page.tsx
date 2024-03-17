import Link from 'next/link'

import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'
import { type Metadata } from 'next'
import { CreateOrganization } from '@clerk/nextjs'
import '@/app/(public)/(auth)/styles.css'

export const metadata: Metadata = {
  title: 'Create organization',
}

export default function OrganizationPage() {
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-14 w-auto" />
        </Link>
      </div>
      <CreateOrganization afterCreateOrganizationUrl={"/dashboard"}/>
    </SlimLayout>
  )
}
