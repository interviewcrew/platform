'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Button } from './Button'
import Avatar from './Avatar'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function menuItemClasses(active: boolean): string {
  return classNames(active ? 'bg-gray-100 dark:bg-slate-700' : '', 'block px-4 py-2 text-sm text-gray-700 dark:text-white')
}

export default function UserMenu() {

  const { user, error, isLoading } = useUser()

  if (isLoading) return <></>
  if (error) return <>{error}</>

  if (user) {
    return (
      <div>
        <Menu as="div" className="relative ml-3">
          <div>
            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <Avatar user={user} />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute dark:bg-slate-800 right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={menuItemClasses(active)}
                  >
                    Your Profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={menuItemClasses(active)}
                  >
                    Settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a href="/api/auth/logout" className={menuItemClasses(active)}>Logout</a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    )
  }

  return <Button href="/api/auth/login">Login</Button>
}
