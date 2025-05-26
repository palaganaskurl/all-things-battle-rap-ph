"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function NavigationLink({
  href,
  name,
}: {
  href: string;
  name: string;
}) {
  const pathname = usePathname();
  const first = pathname.split("/")[1];
  let isActive = false;

  if (first === "word-plays-by-battle" && name === "Word Plays") {
    isActive = true;
  } else if (first === "letter-plays-by-battle" && name === "Letter Plays") {
    isActive = true;
  } else {
    isActive = href.replace("/", "") === first;
  }

  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={navigationMenuTriggerStyle()}
        active={isActive}
      >
        {name}
      </NavigationMenuLink>
    </Link>
  );
}
