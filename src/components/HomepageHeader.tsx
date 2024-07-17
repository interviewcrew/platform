"use client";

import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/Icon";

export function Header() {
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="#" aria-label="Home">
              <Logo className="hidden lg:inline h-12 w-auto" />
              <Icon className="lg:hidden h-12 w-auto" />
            </Link>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <Button
              href="https://calendar.app.google/Bv2qS2hUHfmP691NA"
              color="blue"
            >
              <span>Book a session with us</span>
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
}
