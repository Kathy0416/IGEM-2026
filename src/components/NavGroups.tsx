import { useEffect, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent, RefObject } from "react";
import { NavLink, useLocation } from "react-router-dom";
import pages, { PageGroup } from "../pages.ts";

const groups: PageGroup[] = ["Project", "Research", "People"];

type NavGroupsProps = {
  /** Whether the mobile drawer (nav-toggle panel) is currently open. */
  drawerOpen: boolean;
  /** Ref to the sticky nav shell; pointerdowns outside of it close the menus. */
  shellRef: RefObject<HTMLDivElement | null>;
};

/**
 * Exclusive accordion of navigation groups (issues #21/#22): disclosure
 * semantics on a button, one group open at a time, keyboard navigation,
 * and close-on-outside/route/drawer-close behavior.
 */
export function NavGroups({ drawerOpen, shellRef }: NavGroupsProps) {
  const [openGroup, setOpenGroup] = useState<PageGroup | null>(null);
  const location = useLocation();
  const triggerRefs = useRef<Partial<Record<PageGroup, HTMLButtonElement | null>>>({});
  const menuRefs = useRef<Partial<Record<PageGroup, HTMLDivElement | null>>>({});
  // Where to move focus once a keyboard-opened menu has rendered visible.
  const pendingFocusRef = useRef<"first" | "last" | null>(null);

  // Close on route change (mirrors the drawer reset in Navbar).
  useEffect(() => setOpenGroup(null), [location.pathname]);

  // Close the groups when the mobile drawer closes.
  useEffect(() => {
    if (!drawerOpen) {
      setOpenGroup(null);
    }
  }, [drawerOpen]);

  // Close on pointerdown outside the nav shell.
  useEffect(() => {
    if (openGroup === null) {
      return;
    }
    const onPointerDown = (event: PointerEvent) => {
      const shell = shellRef.current;
      if (!shell || !(event.target instanceof Node) || shell.contains(event.target)) {
        return;
      }
      setOpenGroup(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openGroup, shellRef]);

  // Closed menus are visibility: hidden, so a link opened from the keyboard
  // can only be focused after the state has rendered; defer it to an effect.
  useEffect(() => {
    const position = pendingFocusRef.current;
    if (openGroup === null || position === null) {
      return;
    }
    pendingFocusRef.current = null;
    const menu = menuRefs.current[openGroup];
    const links = Array.from(menu?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
    const target = position === "first" ? links[0] : links[links.length - 1];
    target?.focus();
  }, [openGroup]);

  const toggle = (group: PageGroup) => {
    setOpenGroup((current) => (current === group ? null : group));
  };

  const onGroupKeyDown = (group: PageGroup) =>
    (event: KeyboardEvent<HTMLDivElement>) => {
      const trigger = triggerRefs.current[group] ?? null;
      const isOpen = openGroup === group;
      const links = Array.from(
        event.currentTarget.querySelectorAll<HTMLAnchorElement>(".nav-group__menu a"),
      );

      if (event.key === "Escape") {
        if (!isOpen) {
          return;
        }
        setOpenGroup(null);
        trigger?.focus();
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        const forward = event.key === "ArrowDown";
        event.preventDefault();

        if (event.target === trigger) {
          if (!isOpen) {
            pendingFocusRef.current = forward ? "first" : "last";
            setOpenGroup(group);
            return;
          }
          (forward ? links[0] : links[links.length - 1])?.focus();
          return;
        }

        const activeIndex = links.indexOf(document.activeElement as HTMLAnchorElement);
        if (activeIndex === -1) {
          (forward ? links[0] : links[links.length - 1])?.focus();
          return;
        }
        const nextIndex = forward
          ? (activeIndex + 1) % links.length
          : (activeIndex - 1 + links.length) % links.length;
        links[nextIndex]?.focus();
        return;
      }

      if ((event.key === "Home" || event.key === "End") && event.target !== trigger) {
        event.preventDefault();
        (event.key === "Home" ? links[0] : links[links.length - 1])?.focus();
      }
    };

  // React's onBlur bubbles (focusout semantics): close when focus leaves the
  // group, e.g. Tab past the last link. relatedTarget stays inside while the
  // focus merely moves between the trigger and the menu links.
  const onGroupBlur = (group: PageGroup) => (event: FocusEvent<HTMLDivElement>) => {
    if (openGroup !== group) {
      return;
    }
    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
      return;
    }
    setOpenGroup(null);
  };

  return (
    <>
      {groups.map((group) => {
        const isOpen = openGroup === group;
        return (
          <div
            className="nav-group"
            key={group}
            data-open={isOpen || undefined}
            onBlur={onGroupBlur(group)}
            onKeyDown={onGroupKeyDown(group)}
          >
            <button
              type="button"
              className="nav-group__trigger"
              aria-expanded={isOpen}
              aria-controls={`nav-menu-${group}`}
              onClick={() => toggle(group)}
              ref={(node) => {
                triggerRefs.current[group] = node;
              }}
            >
              {group}
              <span className="nav-group__chevron" aria-hidden="true" />
            </button>
            <div
              id={`nav-menu-${group}`}
              className="nav-group__menu"
              data-state={isOpen ? "open" : "closed"}
              ref={(node) => {
                menuRefs.current[group] = node;
              }}
            >
              {pages
                .filter((page) => page.group === group)
                .map((page) => (
                  <NavLink key={page.path} to={page.path}>
                    {page.name}
                  </NavLink>
                ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
