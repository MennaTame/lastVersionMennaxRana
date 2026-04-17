export type Task = {
  id: string;
  title: string;
  time: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "progress" | "done";
};