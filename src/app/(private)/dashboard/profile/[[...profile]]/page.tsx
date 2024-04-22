import { UserProfile, currentUser } from "@clerk/nextjs"
import Header from "@/components/DashboardHeader";
import { redirect } from "next/navigation";
import '@/app/(private)/dashboard/profile/styles.css'

export interface User {
  fullName: string;
  imageUrl: string;
  primaryEmailAddress: string;
}

export default async function DashboardPage() {
  const loadedUser = await currentUser();

  if (!loadedUser) {
    return redirect("/login");
  }

  const user: User = {
    fullName: `${loadedUser.firstName} ${loadedUser.lastName}`,
    imageUrl: loadedUser.imageUrl,
    primaryEmailAddress: loadedUser.emailAddresses.find(email => email.id == loadedUser.primaryEmailAddressId)?.emailAddress ?? "",
  }

  return (
    <>
      <div className="min-h-full">
        <Header user={user} current={null} showNaviation={false}/>
        <main className="-mt-24 pb-8 flex justify-center">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <UserProfile path="/dashboard/profile" routing="path"/>
          </div>
        </main>
        <footer>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
              <span className="block sm:inline">
                &copy; 2021 Your Company, Inc.
              </span>{" "}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
