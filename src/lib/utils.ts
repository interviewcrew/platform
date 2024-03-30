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
