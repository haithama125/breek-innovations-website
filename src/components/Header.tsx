import Image from "next/image";
import { BookACall } from "./BookACall";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#why", label: "Why us" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
];

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: "rgba(245,246,240,0.82)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottomColor: "rgba(19,32,26,0.06)",
      }}
    >
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6 px-7 py-4">
        <a href="/" className="flex items-center gap-2.5 text-[#13201A]">
          <Image
            src="/logo-green.png"
            alt="Breek logo"
            width={34}
            height={34}
            priority
            className="h-[34px] w-[34px] rounded-lg"
          />
          <span
            className="font-display text-[20px] font-bold"
            style={{ letterSpacing: "-0.02em" }}
          >
            breek
          </span>
        </a>
        <nav className="flex flex-wrap gap-x-[30px] gap-y-2 text-[15px] font-medium text-[#3C4A41]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[#3C4A41] hover:text-[#13201A] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2.5">
          <BookACall variant="dark" className="text-[15px] px-5 py-[11px]">
            Book a call
          </BookACall>
        </div>
      </div>
    </header>
  );
}
