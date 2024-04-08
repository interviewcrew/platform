"use client";

import { Fragment } from "react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LogoLight } from "@/components/LogoLight";
import Image from "next/image";
import { Menu, Popover, Transition } from "@headlessui/react";
import { useClerk } from "@clerk/nextjs";
import { IconLight } from "@/components/IconLight";
import { Logo } from "@/components/Logo";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { User } from "@/store/schemas";

const navigation: { name: string; href: string; current: boolean }[] = [
  { name: "Dashboard", href: "/dashboard", current: false },
  { name: "Job Listings", href: "/dashboard/job-listings/", current: false },
  { name: "Candidates", href: "/dashboard/candidates/", current: false },
  { name: "Interviews", href: "/dashboard/interviews", current: false },
  // { name: "Problems", href: "/dashboard/problems", current: false },
];

export default function Header({
  user,
  current,
  showNaviation,
}: {
  user: User;
  current: string | null;
  showNaviation: boolean;
}) {
  const { signOut } = useClerk();
  const router = useRouter();

  navigation.forEach((item) => {
    if (item.name === current) {
      item.current = true;
    } else {
      item.current = false;
    }
  });

  return (
    <Popover
      as="header"
      className="bg-gradient-to-r from-blue-600 to-cyan-600 pb-24"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
              {/* Logo */}
              <div className="absolute left-0 flex-shrink-0 py-5 lg:static">
                <a href="/dashboard">
                  <span className="sr-only">Interview crew</span>
                  <IconLight className="md:hidden h-8 w-auto" />
                  <LogoLight className="hidden md:block h-8 w-auto" />
                </a>
              </div>

              {/* Right section on desktop */}
              <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
                <Menu as="div" className="relative ml-4 flex-shrink-0">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white text-sm ring-2 ring-white ring-opacity-20 focus:outline-none focus:ring-opacity-100">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={user.imageUrl}
                        alt=""
                        width={32}
                        height={32}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute -right-2 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item key={"Your Profile"}>
                        <a
                          key={"Your Profile"}
                          href={"/dashboard/profile"}
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          {"Your Profile"}
                        </a>
                      </Menu.Item>
                      <Menu.Item key={"Sign Out"}>
                        <a
                          key={"Sign out"}
                          href={"#"}
                          className="block px-4 py-2 text-sm text-gray-700"
                          onClick={(e) => {
                            e.preventDefault();
                            signOut(() => router.push("/"));
                          }}
                        >
                          {"Sign out"}
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

              <div className="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
                {showNaviation && (
                  <div className="lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
                    {/* Left nav */}
                    <div className="hidden lg:col-span-2 lg:block">
                      <nav className="flex space-x-1">
                        {current &&
                          navigation.map((item, index: number) => (
                            <span key={item.name}>
                              <Link
                                href={item.href}
                                className={clsx(
                                  item.current ? "text-white" : "text-cyan-100",
                                  "rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                              {index > 0 && index < navigation.length - 1 && (
                                <span
                                  className="text-cyan-100"
                                >
                                  {">"}
                                </span>
                              )}
                            </span>
                          ))}
                        {!current && (
                          <Link
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              router.back();
                            }}
                            className="text-cyan-100 rounded-md bg-white bg-opacity-0 px-3 py-2 text-sm font-medium hover:bg-opacity-10"
                          >
                            <ArrowLeft className="text-cyan-100 h-6 w-6" />
                          </Link>
                        )}
                      </nav>
                    </div>
                    <div className="px-12 lg:px-0">
                      {/* Search */}
                      <div className="mx-auto w-full max-w-xs lg:max-w-md min-h-6"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Menu button */}
              <div className="absolute right-0 flex-shrink-0 lg:hidden">
                {/* Mobile menu button */}
                <Popover.Button className="relative inline-flex items-center justify-center rounded-md bg-transparent p-2 text-cyan-200 hover:bg-white hover:bg-opacity-10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
          </div>

          <Transition.Root as={Fragment}>
            <div className="lg:hidden">
              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute inset-x-0 top-0 z-30 mx-auto w-full max-w-3xl origin-top transform p-2 transition"
                >
                  <div className="divide-y divide-gray-200 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="pb-2 pt-3">
                      <div className="flex items-center justify-between px-4">
                        <div>
                          <Logo className="h-8 w-auto" />
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      {showNaviation && (
                        <div className="mt-3 space-y-1 px-2">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="pb-2 pt-4">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <Image
                            className="h-10 w-10 rounded-full"
                            src={user.imageUrl}
                            alt=""
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          <div className="truncate text-base font-medium text-gray-800">
                            {user.fullName}
                          </div>
                          <div className="truncate text-sm font-medium text-gray-500">
                            {user.primaryEmailAddress}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        <a
                          key={"Your Profile"}
                          href={"/dashboard/profile"}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                        >
                          {"Your Profile"}
                        </a>
                        <a
                          key={"Sign out"}
                          href={"#"}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-800"
                          onClick={(e) => {
                            e.preventDefault();
                            signOut(() => router.push("/"));
                          }}
                        >
                          {"Sign out"}
                        </a>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
        </>
      )}
    </Popover>
  );
}
