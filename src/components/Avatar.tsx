'use client';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

export default function Avatar({ user, size = 32 }: { user: UserProfile; size?: number; }) {
  const name = user.name ?? user.nickname;

  if (user.picture) {
    return <ImageAvatar src={user.picture} name={name ?? ""} size={size}/>
  }

  if (name) {
    return <InitialsAvatar name={name} />
  }

  return <PlaceHolderAvatar />
}

export function ImageAvatar({src, name, size}: {src: string, name: string, size: number}) {
  return (
    <Image
      className="h-8 w-8 rounded-full"
      src={src}
      alt={name ?? ""}
      width={size}
      height={size} />
  );
}

export function InitialsAvatar({ name }: { name: string; }) {
  const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
  const matchArray = name && [...name.matchAll(rgx)] || [];
  const initials = (
    (matchArray.shift()?.[1] || '') + (matchArray.pop()?.[1] || '')
  ).toUpperCase();

  return (
    <span className="inline-flex h-8 w-8 rounded-full items-center justify-center bg-gray-500">
      <span className="text-xs font-medium leading-none text-white">{initials}</span>
    </span>
  );
}

export function PlaceHolderAvatar() {
  return (
    <span className="h-8 w-8 rounded-full overflow-hidden bg-gray-100">
      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  );
}
