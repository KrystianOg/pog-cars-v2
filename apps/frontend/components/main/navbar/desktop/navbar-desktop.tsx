import styles from "./navbar-desktop.module.css";
import Link from "next/link";
import { classnames } from "@/utils/classnames";
import { Icon, Kind } from "@/components/icon";
import { usePathname } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "@/components/ui/button";

export const COLLAPSED_KEY = "navbar-collapsed";

interface NavbarDesktopItemProps extends React.ComponentProps<"li"> {
  href: string;
  text: string;
  iconKind: Kind;
  active?: boolean;
}

export const NavbarDesktopItem = ({
  href,
  text,
  className,
  iconKind,
  active = false,
  ...props
}: NavbarDesktopItemProps) => (
  <li
    className={classnames(
      styles["navbar-item"],
      active && styles.active,
      className,
    )}
    {...props}
  >
    <Icon kind={iconKind} size="sm" />
    <Link className={styles.link} href={href}>
      {text}
    </Link>
  </li>
);

interface NavbarDesktop extends React.ComponentProps<"aside"> {}

export const NavbarDesktop = ({ className, ...props }: NavbarDesktop) => {
  // TODO: get agency id from jwt or global context
  const agencyId = 1;

  const pathname = usePathname();
  const [collapsed, setCollapsed] = useLocalStorage<boolean>(
    COLLAPSED_KEY,
    false,
  );

  return (
    <aside className={classnames(styles.sidebar, className)} {...props}>
      <div className={styles.logo}>
        <strong>POG cars</strong>
        <Icon kind="qr-code" />
        <Button onClick={() => setCollapsed((prev) => !prev)}>
          <Icon kind="bars-3" />
        </Button>
      </div>
      <nav
        className={classnames(
          styles.navbar,
          collapsed && styles["navbar--collapsed"],
        )}
      >
        <ul>
          {/* TODO: change these active */}
          <NavbarDesktopItem
            href="/cars"
            text="Cars"
            iconKind="map"
            active={!pathname}
          />
          {/* NOTE: must be in agency and logged in*/}
          <NavbarDesktopItem
            href={`/agency/${agencyId}`}
            text="Agency"
            iconKind="building-office"
            active={!!pathname}
          />
          {/* NOTE: like previous & must have view_users permission*/}
          <NavbarDesktopItem
            href={`/agency/${agencyId}/users`}
            text="Members"
            iconKind="users"
            active={!!pathname}
          />
          {/* NOTE: must have view_earnings permission */}
          <NavbarDesktopItem
            href="/earnings"
            text="Earnings"
            iconKind="qr-code"
            active={!!pathname}
          />
          <NavbarDesktopItem
            href="/settings"
            text="Settings"
            iconKind="cog-6-tooth"
            active={!!pathname}
          />
        </ul>
      </nav>
    </aside>
  );
};
