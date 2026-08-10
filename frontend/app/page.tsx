"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { TaskCard } from "@/components/TaskCard";
import { TaskForm } from "@/components/TaskForm";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { createTask, deleteTask, getTasks, guestLogin, updateTask } from "@/lib/api";
import { Task, TaskInput, TaskStatus } from "@/types";

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editing, setEditing] = useState<Task | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | TaskStatus>("ALL");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function ensureAuthAndLoad() {
    try {
      setLoading(true);
      let token = localStorage.getItem("taskflow_token");
      if (!token) {
        const result = await guestLogin();
        localStorage.setItem("taskflow_token", result.accessToken);
      }
      setTasks(await getTasks());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    ensureAuthAndLoad();
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        !search ||
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "ALL" || task.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, search, status]);

  const counts = {
    total: tasks.length,
    active: tasks.filter((t) => t.status !== "COMPLETED").length,
    completed: tasks.filter((t) => t.status === "COMPLETED").length,
  };

  async function handleSubmit(input: TaskInput) {
    setSaving(true);
    try {
      if (editing) {
        const updated = await updateTask(editing._id, input);
        setTasks((current) => current.map((task) => (task._id === updated._id ? updated : task)));
      } else {
        const created = await createTask(input);
        setTasks((current) => [created, ...current]);
      }
      setModal(null);
      setEditing(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to save task.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(task: Task) {
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    try {
      await deleteTask(task._id);
      setTasks((current) => current.filter((item) => item._id !== task._id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to delete task.");
    }
  }

  async function handleComplete(task: Task) {
    const nextStatus: TaskStatus = task.status === "COMPLETED" ? "TODO" : "COMPLETED";
    try {
      const updated = await updateTask(task._id, { status: nextStatus });
      setTasks((current) => current.map((item) => (item._id === updated._id ? updated : item)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to update task.");
    }
  }

  function logout() {
    localStorage.removeItem("taskflow_token");
    setTasks([]);
    ensureAuthAndLoad();
  }

  return (
    <div className="app-shell flex min-h-screen">
      <Sidebar mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="min-w-0 flex-1">
        <Header
          onMenu={() => setMenuOpen(true)}
          onAdd={() => {
            setEditing(null);
            setModal("create");
          }}
          onLogout={logout}
        />

        <section className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
          <div className="mb-7 rounded-3xl bg-gradient-to-br from-brand-500 to-indigo-600 p-6 text-white shadow-lg md:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="mb-3 flex items-center gap-2 text-white/80">
                  <Sparkles size={17} />
                  <span className="text-sm font-semibold">Today&apos;s workspace</span>
                </div>
                <h2 className="max-w-xl text-2xl font-extrabold tracking-tight md:text-4xl">
                  Stay on top of your work.
                </h2>
                <p className="mt-2 max-w-xl text-sm text-white/75 md:text-base">
                  Organize priorities, track progress and keep every task moving forward.
                </p>
              </div>
              <Button onClick={() => setModal("create")} className="bg-white text-slate-900 hover:bg-white/90">
                Create a task
              </Button>
            </div>
          </div>

          <div className="mb-7 grid gap-3 sm:grid-cols-3">
            {[
              ["All tasks", counts.total],
              ["Active", counts.active],
              ["Completed", counts.completed],
            ].map(([label, value]) => (
              <div key={label} className="surface rounded-2xl p-5">
                <p className="text-sm muted">{label}</p>
                <p className="mt-1 text-2xl font-extrabold">{value}</p>
              </div>
            ))}
          </div>

          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 muted" size={18} />
              <input
                className="input py-3 pl-10 pr-4"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              <div className="flex items-center gap-2 rounded-xl bg-[var(--surface-2)] px-3 text-sm muted">
                <SlidersHorizontal size={16} />
                Filter
              </div>
              {(["ALL", "TODO", "IN_PROGRESS", "COMPLETED"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setStatus(item)}
                  className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold ${
                    status === item ? "bg-brand-500 text-white" : "surface"
                  }`}
                >
                  {item === "ALL" ? "All" : item === "IN_PROGRESS" ? "In progress" : item === "TODO" ? "Todo" : "Completed"}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-5 flex items-center justify-between rounded-xl bg-red-500/10 px-4 py-3 text-sm text-[var(--danger)]">
              <span>{error}</span>
              <button onClick={() => setError("")}>Dismiss</button>
            </div>
          )}

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="surface h-40 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : filteredTasks.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={(item) => {
                    setEditing(item);
                    setModal("edit");
                  }}
                  onDelete={handleDelete}
                  onComplete={handleComplete}
                />
              ))}
            </div>
          ) : (
            <div className="surface rounded-2xl p-12 text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand-500/10 text-brand-500">
                <Sparkles size={24} />
              </div>
              <h3 className="text-lg font-bold">No tasks found</h3>
              <p className="mt-1 text-sm muted">Create a task or change your filters.</p>
              <Button className="mt-5" onClick={() => setModal("create")}>Create task</Button>
            </div>
          )}
        </section>
      </main>

      <Modal
        open={modal !== null}
        title={modal === "edit" ? "Edit task" : "Create task"}
        onClose={() => {
          setModal(null);
          setEditing(null);
        }}
      >
        <TaskForm
          task={editing}
          onSubmit={handleSubmit}
          onCancel={() => {
            setModal(null);
            setEditing(null);
          }}
          loading={saving}
        />
      </Modal>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );
}
