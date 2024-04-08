import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateComparator(a: { createdAt: Date }, b: { createdAt: Date }) {
  if (a.createdAt < b.createdAt) return -1;
  if (a.createdAt > b.createdAt) return 1;
  return 0;
}

export type WithCreatedAt = { createdAt: Date };

export function mergeByCreatedAt<
  T1 extends WithCreatedAt,
  T2 extends WithCreatedAt,
  T1Type,
  T2Type
>(
  list1: { type: T1Type; value: T1[] },
  list2: { type: T2Type; value: T2[] }
): ({ type: T1Type; value: T1 } | { type: T2Type; value: T2 })[] {
  const merged: ({ type: T1Type; value: T1 } | { type: T2Type; value: T2 })[] =
    [];

  let [list1Pointer, list2Pointer] = [0, 0];

  const sortedList1 = list1.value.sort(dateComparator);
  const sortedList2 = list2.value.sort(dateComparator);

  while (
    list1Pointer < sortedList1.length ||
    list2Pointer < sortedList2.length
  ) {
    if (
      list2Pointer == sortedList2.length ||
      sortedList1[list1Pointer].createdAt < sortedList2[list2Pointer].createdAt
    ) {
      merged.push({
        type: list1.type,
        value: sortedList1[list1Pointer],
      });

      list1Pointer++;
    } else {
      merged.push({
        type: list2.type,
        value: sortedList2[list2Pointer],
      });

      list2Pointer++;
    }
  }

  return merged;
}

export function toHumanTime(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  const interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  if (interval === 1) {
    return interval + " year ago";
  }

  const months = Math.floor(seconds / 2628000);
  if (months > 1) {
    return months + " months ago";
  }
  if (months === 1) {
    return months + " month ago";
  }

  const days = Math.floor(seconds / 86400);
  if (days > 1) {
    return days + " days ago";
  }
  if (days === 1) {
    return days + " day ago";
  }

  const hours = Math.floor(seconds / 3600);
  if (hours > 1) {
    return hours + " hours ago";
  }
  if (hours === 1) {
    return hours + " hour ago";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes > 1) {
    return minutes + " minutes ago";
  }
  if (minutes === 1) {
    return minutes + " minute ago";
  }

  return "just now";
}

export function humanizeDuration(from: Date, to: Date): string {
  const diff = Math.abs(from.getTime() - to.getTime()) / 1000;

  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = Math.floor(diff % 60);

  let response = "";

  if (hours > 0) {
    response += `${hours}h `;
  }

  if (minutes > 0) {
    response += `${minutes}m `;
  }

  if (seconds > 0) {
    response += `${seconds}s`;
  }

  return response;
}

export function getUpdatedSearchParams(
  searchParams: { [key: string]: string | string[] | undefined },
  newQueryParams?: { key: string; value: string | string[] | undefined }[]
) {
  let updatedSearchParams = searchParams;

  newQueryParams?.forEach(({ key, value }) => {
    updatedSearchParams = { ...updatedSearchParams, [key]: value };
  });

  return Object.entries(updatedSearchParams).reduce((acc, [key, value]) => {
    if (value) {
      let valueString = acc + (acc.endsWith("?") ? "" : "&") + key + "=";
      if (Array.isArray(value)) {
        valueString += value.join(",");
      } else {
        valueString += value;
      }
      return valueString;
    }
    return acc;
  }, "?");
}
