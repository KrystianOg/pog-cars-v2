"use client";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark" | "system";

export function ThemeToggle() {
  /**
   * TODO: change the implementation from next-themes to own
   */
  const setTheme = (theme: Theme) => {
    // TODO: set global context and persist state in local storage
  };

  return (
    <div>
      <button>trigger</button>
      <ul>
        <li>
          <Button onClick={() => setTheme("light")}>light</Button>
        </li>
        <li>
          <Button onClick={() => setTheme("dark")}>dark</Button>
        </li>
        <li>
          <Button onClick={() => setTheme("system")}>system</Button>
        </li>
      </ul>
    </div>
  );
}
