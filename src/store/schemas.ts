import { User as ClerkUser } from "@clerk/nextjs/server";

export interface User {
  fullName: string;
  imageUrl: string;
  primaryEmailAddress: string;
}

export function convertClerkUserToUser(
  loadedUser: ClerkUser
): User {
  return {
    fullName: `${loadedUser.firstName} ${loadedUser.lastName}`,
    imageUrl: loadedUser.imageUrl,
    primaryEmailAddress:
      loadedUser.emailAddresses.find(
        (email: any) => email.id == loadedUser.primaryEmailAddressId
      )?.emailAddress ?? "",
  };
}
