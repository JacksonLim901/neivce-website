import Link from "next/link";
import { SignOutButton } from "@/components/admin/SignOutButton";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/company", label: "Company" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/enquiries", label: "Enquiries" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-center justify-between border-b border-line pb-6">
        <nav className="flex gap-6 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink/80 transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <SignOutButton />
      </div>
      <div className="pt-10">{children}</div>
    </div>
  );
}
