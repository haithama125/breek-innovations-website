import { CONTACT_EMAIL } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-4 px-7 pb-11 pt-7 text-sm text-[#6B776F]">
      <span>© 2026 Breek Innovations LLC</span>
      <div className="flex gap-6">
        <a href="#services" className="text-[#6B776F] hover:text-[#13201A]">
          Services
        </a>
        <a href="#work" className="text-[#6B776F] hover:text-[#13201A]">
          Work
        </a>
        <a href="#pricing" className="text-[#6B776F] hover:text-[#13201A]">
          Pricing
        </a>
        <a href="/privacy/" className="text-[#6B776F] hover:text-[#13201A]">
          Privacy
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-[#6B776F] hover:text-[#13201A]"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
    </footer>
  );
}
