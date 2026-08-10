"use client";

import { useState } from "react";
import { Task, TaskInput } from "@/types";
import { Button } from "./ui/Button";

const empty: TaskInput = {
  title: "",
  description: "",
  status: "TODO",
  priority: "MEDIUM",
  dueDate: "",
};

export function TaskForm({
  task,
  onSubmit,
  onCancel,
  loading,
}: {
  task?: Task | null;
  onSubmit: (input: TaskInput) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}) {
  const [form, setForm] = useState<TaskInput>(
    task
      ? {
          title: task.title,
          description: task.description || "",
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
        }
      : empty
  );

  const [error, setError] = useState("");

  function update<K extends keyof TaskInput>(
    key: K,
    value: TaskInput[K]
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Task title is required.");
      return;
    }

    setError("");

    await onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description?.trim() || undefined,
      dueDate: form.dueDate || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-[var(--danger)]">
          {error}
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Task title
        </label>

        <input
          className="input px-4 py-3"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="e.g. Prepare project presentation"
          autoFocus
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold">
          Description
        </label>

        <textarea
          className="input min-h-28 resize-y px-4 py-3"
          value={form.description || ""}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Add a short description..."
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Status
          </label>

          <select
            className="input px-3 py-3"
            value={form.status}
            onChange={(e) =>
              update(
                "status",
                e.target.value as TaskInput["status"]
              )
            }
          >
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Priority
          </label>

          <select
            className="input px-3 py-3"
            value={form.priority}
            onChange={(e) =>
              update(
                "priority",
                e.target.value as TaskInput["priority"]
              )
            }
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Due date
          </label>

          <input
            type="date"
            className="input px-3 py-3"
            value={form.dueDate || ""}
            onChange={(e) => update("dueDate", e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : task
              ? "Save changes"
              : "Create task"}
        </Button>
      </div>
    </form>
  );
}