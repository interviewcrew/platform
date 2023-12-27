import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Dispatch, Fragment, Key, SetStateAction } from 'react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function MenuWithSecondary<T>({
  label,
  items,
  selectedItem,
  setSelectedItem,
  keySelector,
  primarySelector,
  secondarySelector,
}: {
  label?: string,
  items: T[],
  selectedItem: T,
  setSelectedItem: (i: T) => void,
  keySelector: (i: T) => Key,
  primarySelector: (i: T) => string,
  secondarySelector: (i: T) => string,
}) {
  return (
    <Listbox value={selectedItem} onChange={setSelectedItem}>
      {({ open }) => (
        <>
          {label && <Listbox.Label className="block text-sm font-medium leading-6 text-zinc-500 dark:text-zinc-400">{label}</Listbox.Label>}
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white dark:bg-white/5 py-1.5 pl-3 pr-10 text-left text-zinc-500 ring-1 ring-inset ring-zinc-900/10 transition hover:ring-zinc-900/20 ui-not-focus-visible:outline-none dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 lg:flex sm:text-sm sm:leading-6">
              <span className="inline-flex w-full truncate">
                <span className="truncate">{primarySelector(selectedItem)}</span>
                <span className="ml-2 truncate text-gray-500">{secondarySelector(selectedItem)}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-black/90 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((item) => (
                  <Listbox.Option
                    key={keySelector(item)}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-zinc-700 dark:text-zinc-200',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex">
                          <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'truncate')}>
                            {primarySelector(item)}
                          </span>
                          <span className={classNames(active ? 'text-indigo-200' : 'text-zinc-500 dark:text-zinc-400', 'ml-2 truncate')}>
                            {secondarySelector(item)}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
