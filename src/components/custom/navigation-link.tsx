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
  const isActive = href.replace("/", "") === first;

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
