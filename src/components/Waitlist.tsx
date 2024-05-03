"use client";

import { User } from "@/db/schema";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { activateUser, registerWaitlist } from "@/app/waitlist-actions";
import { cn } from "@/lib/utils";
import { useClerk, useOrganizationList } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ConfirmationModal } from "./ConfirmationModal";

function isUserOnWaitlist(user: User) {
  return user.linkedinLink !== null || user.registrationReason !== null;
}

export function ActivateWaitlist({ user }: { user: User }) {
  const [activationCode, setActivationCode] = useState("");
  const [result, setResult] = useState<boolean | null>();

  const activate = async () => {
    setResult(await activateUser(user, activationCode));
  };

  return (
    <form
      className="mt-6 space-y-12 w-full"
      onSubmit={(e) => {
        e.preventDefault;
        activate();
      }}
    >
      <div className="border-b border-gray-900/10 pb-8">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Activate
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          If you have already received an activation code, enter it below to
          activate
        </p>
        <div className="mt-4">
          <label
            htmlFor="activation-code"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Activation code
          </label>
          <div className="flex w-full mt-2">
            <div className="flex-1">
              <input
                id="activation-code"
                name="activation-code"
                type="text"
                className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                onChange={(e) => setActivationCode(e.target.value)}
                value={activationCode}
              />
            </div>
            <Button className="ml-2 rounded-md" type="submit" color="blue">
              Activate
            </Button>
          </div>
          <div
            className={cn("mt-2 text-sm text-gray-600", {
              "text-red-500": result === false,
              "text-green-500": result === true,
            })}
          >
            {result === true && "You have been activated!"}
            {result === false && "Invalid activation code"}
          </div>
        </div>
      </div>
    </form>
  );
}

function RegisterForPriorityAccess({
  user,
  markHasRegistered,
}: {
  user: User;
  markHasRegistered: () => void;
}) {
  const [linkedinLink, setLinkedinLink] = useState("");
  const [linkedinLinkError, setLinkedinLinkError] = useState("");
  const [registrationReason, setRegistrationReason] = useState("");
  const [registrationReasonError, setRegistrationReasonError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const registerForHigherPriority = async () => {
    let hasErrors = false;
    const linkedinLinkRegex =
      /^https?:\/\/(www\.)?linkedin\.com\/(in|pub|company)\/[^\/]+\/?$/;

    if (!linkedinLinkRegex.test(linkedinLink)) {
      setLinkedinLinkError("Please enter a valid linkedin link");
      hasErrors = true;
    }

    if (registrationReason.length < 10) {
      setRegistrationReasonError("Please fill in this field");
      hasErrors = true;
    }

    if (hasErrors) {
      setIsRegistering(false);
      return;
    }

    await registerWaitlist({
      ...user,
      linkedinLink,
      registrationReason,
    });

    markHasRegistered();
    setIsRegistering(false);
  };

  return (
    <form
      className="space-y-12 mt-6 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        setIsRegistering(true);
        registerForHigherPriority();
      }}
    >
      <div className="border-b border-gray-900/10 pb-8">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Get higher priority on the waitlist
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Fill in the fields below to get a higher priority on the waitlist
        </p>
        <div className="mt-4">
          <label
            htmlFor="linkedin"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Your Linkedin profile link
          </label>
          <div className="mt-2">
            <input
              id="linkedin"
              name="linkedin"
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={linkedinLink}
              onChange={(e) => {
                setLinkedinLinkError("");
                setLinkedinLink(e.target.value);
              }}
            />
            <span className="text-sm text-red-500">{linkedinLinkError}</span>
          </div>
        </div>
        <div className="mt-2">
          <label
            htmlFor="about"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            How could InterviewCrew help you?
          </label>
          <div className="mt-2">
            <textarea
              id="about"
              name="about"
              rows={3}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={registrationReason}
              onChange={(e) => {
                setRegistrationReason(e.target.value);
                setRegistrationReasonError("");
              }}
            />
            <span className="text-sm text-red-500">
              {registrationReasonError}
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            className={cn("mt-4 rounded-md", {
              "cursor-not-allowed bg-gray-500 hover:bg-gray-500": isRegistering,
            })}
            type="submit"
            color="blue"
            disabled={isRegistering}
          >
            Get higher priority
          </Button>
        </div>
      </div>
    </form>
  );
}

export function Waitlist({
  user,
  userData,
  organizationId,
}: {
  user: User;
  userData: { fullName: string; email: string };
  organizationId: string | null;
}) {
  const [hasRegistered, setHasRegistered] = useState(isUserOnWaitlist(user));
  const { signOut } = useClerk();
  const router = useRouter();
  const [isSignoutModalOpen, setIsSignoutModalOpen] = useState(false);
  const { isLoaded, setActive } = useOrganizationList();

  useEffect(() => {
    setHasRegistered(isUserOnWaitlist(user));
  }, [user]);

  useEffect(() => {
    if (organizationId && setActive) {
      setActive({ organization: organizationId });
      window.location.assign("/dashboard");
    }
  }, [organizationId, setActive]);

  if (!isLoaded) {
    return <div className="w-full mt-8 text-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-left justify-center h-full">
      <div className="text-2xl font-bold">{userData.fullName},</div>
      <h1 className="text-3xl font-bold">You are now on our waitlist</h1>
      <ActivateWaitlist user={user} />
      {!hasRegistered ? (
        <RegisterForPriorityAccess
          user={user}
          markHasRegistered={() => {
            setHasRegistered(true);
          }}
        />
      ) : (
        <div>
          <p className="mt-8 text-center">
            You have already submitted your info. Thank you!
          </p>
        </div>
      )}
      <div className="mt-8 text-center text-xs">
        You are on the waitlist using:
      </div>
      <div className="text-center font-bold text-xs">{userData.email}</div>
      <div className="flex justify-center w-full space-x-3 mt-8 text-center">
        <Button
          className=""
          onClick={() => setIsSignoutModalOpen(true)}
          type="button"
          color="white"
        >
          Sign out
        </Button>
        <Button className="border-2" href={"/"} type="button" color="white">
          Back to the homepage
        </Button>
      </div>
      <ConfirmationModal
        title="Sign out"
        isOpen={isSignoutModalOpen}
        onClose={() => setIsSignoutModalOpen(false)}
        onConfirm={() => signOut(() => router.push("/"))}
        actionButton="Sign out"
      >
        {userData.fullName}, Are you sure you want to sign out?
      </ConfirmationModal>
    </div>
  );
}
