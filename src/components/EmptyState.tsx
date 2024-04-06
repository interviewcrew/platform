"use client";

import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export type CreatorComponentProps = {
  organizationId: number;
  onClose: () => void;
};

export default function EmptyState({
  organizationId,
  title,
  description,
  callToAction,
  creatorComponent: CreatorComponent,
  icon,
}: {
  organizationId: number;
  title: string;
  description: string;
  callToAction: string;
  icon: React.ReactNode;
  creatorComponent: React.ComponentType<CreatorComponentProps>;
}) {
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  return (
    <>
      {isCreatorOpen ? (
        <CreatorComponent
          organizationId={organizationId}
          onClose={() => {
            setIsCreatorOpen(false);
          }}
        />
      ) : (
        <div className="text-center">
          {icon}
          <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => setIsCreatorOpen(true)}
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              {callToAction}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
