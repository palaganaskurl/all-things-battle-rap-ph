import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavigationLink from "@/components/custom/navigation-link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "All Things Battle Rap PH",
  description: "All Things Battle Rap PH",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-[family-name:var(--font-geist-sans)]`}
      >
        <NavigationMenu className="flex justify-between p-4 min-w-full border-b">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationLink
                href="/"
                name="All Things Battle Rap PH"
              ></NavigationLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationLink
                href="/word-plays"
                name="Word Plays"
              ></NavigationLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationLink
                href="/letter-plays"
                name="Anagrams / Palindromes"
              ></NavigationLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {children}
      </body>
    </html>
  );
}
