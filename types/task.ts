export type SubTask = {
  id: string;
  title: string;
  completed: boolean;
};

export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "inProgress" | "done";

export type Task = {
  id: string;

  // main info
  title: string;
  category: string;

  // time & date
  time: string;
  createdAt: string;

  // task details
  subtasks: SubTask[]; // ✅ FIXED

  // الحالة والأولوية
  priority: TaskPriority;
  status: TaskStatus;
};