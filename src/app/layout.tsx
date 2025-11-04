import { Inter, Lexend } from "next/font/google";
import clsx from "clsx";
import "@/styles/tailwind.css";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: {
    template: "%s - InterviewCrew",
    default: "Find incredible people, through people you trust",
  },
  description:
    "Stop Interviewing the Wrong People; Select from a curated shortlist of vetted talent.",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(
        "h-full scroll-smooth bg-white antialiased",
        inter.variable,
        lexend.variable
      )}
    >
      <body className="flex h-full flex-col">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
