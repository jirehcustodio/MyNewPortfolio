"use client";

import { TaskProvider } from "./context/TaskContext";

export default function TaskFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-neutral-900">
        {children}
      </div>
    </TaskProvider>
  );
}