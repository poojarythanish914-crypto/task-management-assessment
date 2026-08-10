"use client";

import { CheckSquare, LayoutDashboard, Settings, X } from "lucide-react";

export function Sidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {mobileOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
          aria-label="Close menu"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[var(--border)] bg-[var(--surface)] p-5 transition-transform md:static md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500 text-white">
              <CheckSquare size={20} />
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight">TaskFlow</p>
              <p className="text-xs muted">Workspace</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 muted md:hidden">
            <X size={18} />
          </button>
        </div>

        <nav className="space-y-1">
          <div className="flex items-center gap-3 rounded-xl bg-brand-500/10 px-3 py-3 text-sm font-semibold text-brand-600 dark:text-brand-100">
            <LayoutDashboard size={18} />
            Dashboard
          </div>
          <div className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm muted">
            <CheckSquare size={18} />
            Tasks
          </div>
        </nav>

        <div className="mt-auto">
          <div className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm muted">
            <Settings size={18} />
            Settings
          </div>
        </div>
      </aside>
    </>
  );
}
