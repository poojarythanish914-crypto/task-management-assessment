import { Task, TaskInput, User } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("taskflow_token")
      : null;

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      body?.message instanceof Array
        ? body.message.join(", ")
        : body?.message || "Something went wrong";

    throw new Error(message);
  }

  return body as T;
}

export async function guestLogin() {
  return request<{ accessToken: string; user: User }>(
    "/auth/guest",
    {
      method: "POST",
      body: JSON.stringify({}),
    }
  );
}

export async function getTasks() {
  return request<Task[]>("/tasks");
}

export async function createTask(input: TaskInput) {
  return request<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateTask(
  id: string,
  input: Partial<TaskInput>
) {
  return request<Task>(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export async function deleteTask(id: string) {
  return request<{ message: string }>(`/tasks/${id}`, {
    method: "DELETE",
  });
}