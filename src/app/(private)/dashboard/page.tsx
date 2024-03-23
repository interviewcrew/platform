import { currentUser } from "@clerk/nextjs"
import Header from "@/components/DashboardHeader";
import Image from "next/image";
import { redirect } from "next/navigation";
import InterviewList from "@/components/InterviewList";

export interface User {
  fullName: string;
  imageUrl: string;
  primaryEmailAddress: string;
}

const recentHires = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Floyd Miles",
    handle: "floydmiles",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Emily Selman",
    handle: "emilyselman",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Kristin Watson",
    handle: "kristinwatson",
    imageUrl:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
];
const announcements = [
  {
    id: 1,
    title: "Office closed on July 2nd",
    href: "#",
    preview:
      "Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.",
  },
  {
    id: 2,
    title: "New password policy",
    href: "#",
    preview:
      "Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.",
  },
  {
    id: 3,
    title: "Office closed on July 2nd",
    href: "#",
    preview:
      "Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.",
  },
];

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


  const stats = [
    { label: "All", value: 0 },
    { label: "Done", value: 0 },
    { label: "Upcoming", value: 0 },
  ];
  
  return (
    <>
      <div className="min-h-full">
        <Header user={user} current={"Interviews"}/>
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Interviews</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-5">
              {/* Left column */}
              <div className="grid grid-cols-1 col-span-2 gap-4">
                {/* Welcome panel */}
                <section aria-labelledby="profile-overview-title">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <h2 className="sr-only" id="profile-overview-title">
                      Interviews status
                    </h2>
                    <div className="bg-white p-6">
                      <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="sm:flex sm:space-x-5">
                          <div className="flex-shrink-0">
                            <Image
                              className="mx-auto h-20 w-20 rounded-full"
                              src={user.imageUrl ?? ""}
                              alt=""
                              width={80}
                              height={80}
                            />
                          </div>
                          <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                            <p className="text-sm font-medium text-gray-600">
                              Welcome back,
                            </p>
                            <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                              {user.fullName}
                            </p>
                          </div>
                        </div>
                        <div className="mt-5 flex justify-center sm:mt-0">
                          <button
                            type="button"
                            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Create Interview
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                      {stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="px-6 py-5 text-center text-sm font-medium"
                        >
                          <span className="text-gray-900">{stat.value}</span>{" "}
                          <span className="text-gray-600">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Actions panel */}
                <section aria-labelledby="quick-links-title">
                  <div className="rounded-lg bg-white shadow">
                    <h2 className="sr-only" id="quick-links-title">
                      Interview List
                    </h2>
                    <InterviewList interviewType={"All"} userId={loadedUser.id}/>
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 col-span-3 tgap-4">
                {/* Announcements */}
                <section aria-labelledby="announcements-title">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      <h2
                        className="text-base font-medium text-gray-900"
                        id="announcements-title"
                      >
                        Announcements
                      </h2>
                      <div className="mt-6 flow-root">
                        <ul
                          role="list"
                          className="-my-5 divide-y divide-gray-200"
                        >
                          {announcements.map((announcement) => (
                            <li key={announcement.id} className="py-5">
                              <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                                <h3 className="text-sm font-semibold text-gray-800">
                                  <a
                                    href={announcement.href}
                                    className="hover:underline focus:outline-none"
                                  >
                                    {/* Extend touch target to entire panel */}
                                    <span
                                      className="absolute inset-0"
                                      aria-hidden="true"
                                    />
                                    {announcement.title}
                                  </a>
                                </h3>
                                <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                                  {announcement.preview}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Recent Hires */}
                <section aria-labelledby="recent-hires-title">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      <h2
                        className="text-base font-medium text-gray-900"
                        id="recent-hires-title"
                      >
                        Recent Hires
                      </h2>
                      <div className="mt-6 flow-root">
                        <ul
                          role="list"
                          className="-my-5 divide-y divide-gray-200"
                        >
                          {recentHires.map((person) => (
                            <li key={person.handle} className="py-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                  <img
                                    className="h-8 w-8 rounded-full"
                                    src={person.imageUrl}
                                    alt=""
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium text-gray-900">
                                    {person.name}
                                  </p>
                                  <p className="truncate text-sm text-gray-500">
                                    {"@" + person.handle}
                                  </p>
                                </div>
                                <div>
                                  <a
                                    href={person.href}
                                    className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                  >
                                    View
                                  </a>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
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
