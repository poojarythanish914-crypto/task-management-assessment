"use client";

import { CalendarDays, Check, Pencil, Trash2 } from "lucide-react";
import { Task, TaskStatus } from "@/types";

const statusMap: Record<
  TaskStatus,
  { label: string; className: string }
> = {
  TODO: {
    label: "Todo",
    className:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-200",
  },
  IN_PROGRESS: {
    label: "In progress",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-200",
  },
  COMPLETED: {
    label: "Completed",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
  },
};

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onComplete,
}: {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onComplete: (task: Task) => void;
}) {
  const status = statusMap[task.status];

  return (
    <article className="surface group rounded-2xl p-5 transition hover:shadow-md">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => onComplete(task)}
          className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${
            task.status === "COMPLETED"
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-[var(--border)] hover:border-brand-500"
          }`}
          aria-label={
            task.status === "COMPLETED"
              ? "Mark as todo"
              : "Mark as complete"
          }
        >
          {task.status === "COMPLETED" && <Check size={14} />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3
                className={`font-bold ${
                  task.status === "COMPLETED"
                    ? "line-through opacity-60"
                    : ""
                }`}
              >
                {task.title}
              </h3>

              {task.description && (
                <p className="mt-1 text-sm muted">{task.description}</p>
              )}
            </div>

            <div className="flex shrink-0 gap-1 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
              <button
                type="button"
                onClick={() => onEdit(task)}
                className="rounded-lg p-2 muted hover:bg-[var(--surface-2)]"
                aria-label="Edit"
              >
                <Pencil size={15} />
              </button>

              <button
                type="button"
                onClick={() => onDelete(task)}
                className="rounded-lg p-2 text-[var(--danger)] hover:bg-red-500/10"
                aria-label="Delete"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}
            >
              {status.label}
            </span>

            <span className="rounded-full bg-[var(--surface-2)] px-2.5 py-1 text-xs font-semibold">
              {task.priority.toLowerCase()}
            </span>

            {task.dueDate && (
              <span className="ml-auto flex items-center gap-1 text-xs muted">
                <CalendarDays size={14} />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}