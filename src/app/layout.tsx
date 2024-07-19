import { Inter, Lexend } from "next/font/google";
import clsx from "clsx";
import "@/styles/tailwind.css";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: {
    template: "%s - Interviewcrew",
    default: "Hire top talent, seamlessly with world-class interviewers",
  },
  description:
    "Our world-class interviewers from top tech companies conduct the \
    technical interviews on your behalf, enabling you to find great hires in less than 3 weeks",
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
