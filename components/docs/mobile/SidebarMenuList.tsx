"use client";

import Link from "next/link";
import { sidebarItems } from "../sidebarItems";

export function SidebarMenuList({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <div className="p-4">
      {sidebarItems.map((group, i) => (
        <div key={i} className="mb-6">
          <div className="text-lg font-bold mb-2">{group.title}</div>
          <ul className="space-y-2">
            {group.items.map((item, j) => (
              <li key={j}>
                <Link
                  href={item.href}
                  onClick={onItemClick}
                  className="block rounded px-2 py-1 text-base text-foreground hover:bg-accent hover:text-primary transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
