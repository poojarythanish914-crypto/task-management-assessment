"use client";

import { LogOut, Menu, Moon, Plus, Sun } from "lucide-react";
import { Button } from "./ui/Button";
import { useTheme } from "./ThemeProvider";

export function Header({
  onMenu,
  onAdd,
  onLogout,
}: {
  onMenu: () => void;
  onAdd: () => void;
  onLogout: () => void;
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-4 md:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} className="rounded-lg p-2 muted md:hidden" aria-label="Open menu">
          <Menu size={21} />
        </button>
        <div>
          <p className="text-sm muted">Workspace</p>
          <h1 className="text-xl font-bold">My Tasks</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--surface-2)]"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <Button onClick={onAdd} className="hidden sm:inline-flex">
          <Plus size={17} /> New task
        </Button>
        <button
          onClick={onLogout}
          className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--surface-2)] muted"
          aria-label="Log out"
        >
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
}
