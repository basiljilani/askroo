"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { primaryNav, primaryCta } from "@/lib/site";
import { useScrollDirection } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const { direction, scrolled } = useScrollDirection();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Escape to close + focus first link + restore focus on close.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => {
      drawerRef.current
        ?.querySelector<HTMLElement>("a[href], button:not([disabled])")
        ?.focus();
    }, 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      hamburgerRef.current?.focus();
    };
  }, [open]);

  const hidden = scrolled && direction === "down" && !open;

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden && !reduced ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "transition-colors duration-300",
          scrolled || open
            ? "border-b border-hairline bg-void/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-3">
            <Link
              href="/"
              aria-label="AskRoo home"
              className="shrink-0 rounded-md"
            >
              <Logo wordmarkClassName="hidden min-[420px]:inline" />
            </Link>

            {/* Desktop nav with the sliding active pill */}
            <nav
              aria-label="Primary"
              className="hidden items-center md:flex"
            >
              {primaryNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                      active
                        ? "text-bright"
                        : "text-dim hover:text-bright",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-full border border-hairline bg-glass"
                        transition={
                          reduced
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 420, damping: 34 }
                        }
                      />
                    ) : null}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Button href={primaryCta.href} size="sm">
                {primaryCta.label}
              </Button>
              <button
                ref={hamburgerRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-drawer"
                aria-label={open ? "Close menu" : "Open menu"}
                className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-glass text-bright md:hidden"
              >
                <MenuIcon open={open} />
              </button>
            </div>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {open ? (
          <MobileDrawer
            ref={drawerRef}
            pathname={pathname}
            reduced={!!reduced}
            onClose={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <path d="M5 5l10 10" />
          <path d="M15 5L5 15" />
        </>
      ) : (
        <>
          <path d="M3 6h14" />
          <path d="M3 10h14" />
          <path d="M3 14h14" />
        </>
      )}
    </svg>
  );
}

function MobileDrawer({
  ref,
  pathname,
  reduced,
  onClose,
}: {
  ref: React.Ref<HTMLDivElement>;
  pathname: string;
  reduced: boolean;
  onClose: () => void;
}) {
  const links = [...primaryNav];
  return (
    <motion.div
      ref={ref}
      id="mobile-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={reduced ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto bg-void md:hidden"
    >
      <Container className="flex min-h-full flex-col py-8">
        <nav aria-label="Mobile" className="flex flex-col">
          {links.map((item, i) => {
            const active = isActive(pathname, item.href);
            return (
              <motion.div
                key={item.href}
                initial={reduced ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: reduced ? 0 : 0.4,
                  delay: reduced ? 0 : 0.05 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between border-b border-hairline py-5 text-2xl tracking-tight",
                    active ? "text-accent-300" : "text-bright",
                  )}
                >
                  {item.label}
                  <span aria-hidden="true" className="text-faint">
                    ↗
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
        <div className="mt-8">
          <Button href={primaryCta.href} size="lg" className="w-full" onClick={onClose}>
            {primaryCta.label}
          </Button>
        </div>
      </Container>
    </motion.div>
  );
}
