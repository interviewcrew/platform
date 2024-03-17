import { Inter, Lexend } from "next/font/google";
import clsx from "clsx";
import "@/styles/tailwind.css";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: {
    template: "%s - Interviewcrew",
    default: "Interviewcrew - Your AI co-pilot interviewer",
  },
  description:
    "Interviewing is an art, technical interviewing is a skill. \
    Whatever skill you are, with our AI you would nail it everytime."
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
    <ClerkProvider>
        <html
          lang="en"
          className={clsx(
            "h-full scroll-smooth bg-white antialiased",
            inter.variable,
            lexend.variable
          )}
        >
          <body className="flex h-full flex-col">{children}</body>
        </html>
      </ClerkProvider>
  );
}
