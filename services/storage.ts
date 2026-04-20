import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task, TaskStatus } from "../types/task";

const TASKS_KEY = "TASKS";

// 📥 Get all tasks
export const getAllTasks = async (): Promise<Task[]> => {
  const data = await AsyncStorage.getItem(TASKS_KEY);
  return data ? JSON.parse(data) : [];
};

// 🔍 Get task by id
export const getTaskById = async (id: string): Promise<Task | undefined> => {
  const tasks = await getAllTasks();
  return tasks.find((t) => t.id === id);
};

// ➕ Create task
export const createTask = async (task: Partial<Task>) => {
  const tasks = await getAllTasks();

  const newTask: Task = {
    id: Date.now().toString(),

    title: task.title || "",
    category: task.category || "General",

    time: task.time || "12:00 PM",
    createdAt: new Date().toISOString(),

    priority: task.priority || "medium",
    status: "todo",

    // 🔥 subtasks
    subtasks: Array.isArray(task.subtasks)
      ? task.subtasks.map((sub: any, index: number) => ({
          id: `${Date.now()}-${index}`,
          title: sub.title || sub,
          completed: false,
        }))
      : [],
  };

  const updated = [...tasks, newTask];
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
};

// ❌ Delete task
export const deleteTask = async (id: string) => {
  const tasks = await getAllTasks();
  const updated = tasks.filter((t) => t.id !== id);

  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
};

// ❌ Delete all tasks
export const deleteAllTasks = async () => {
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify([]));
};

// ❌ Delete done tasks
export const deleteDoneTasks = async () => {
  const tasks = await getAllTasks();
  const updated = tasks.filter((t) => t.status !== "done");
  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
};

// ✏️ Update task
export const updateTask = async (id: string, updatedData: Partial<Task>) => {
  const tasks = await getAllTasks();

  const updated = tasks.map((t) =>
    t.id === id
      ? {
          ...t,
          ...updatedData,
          subtasks: Array.isArray(updatedData.subtasks)
            ? updatedData.subtasks
            : t.subtasks,
        }
      : t,
  );

  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
};

// 🔄 Change task status (بديل completed)
export const updateTaskStatus = async (id: string, status: TaskStatus) => {
  const tasks = await getAllTasks();

  const updated = tasks.map((t) => (t.id === id ? { ...t, status } : t));

  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
};

// 🔥 Toggle subtask
export const toggleSubTask = async (taskId: string, subId: string) => {
  const tasks = await getAllTasks();

  const updated = tasks.map((task) => {
    if (task.id !== taskId) return task;

    const updatedSubs = (task.subtasks || []).map((sub: any) =>
      sub.id === subId ? { ...sub, completed: !sub.completed } : sub,
    );

    // ✅ لو كل subtasks خلصت → done
    const allDone =
      updatedSubs.length > 0 && updatedSubs.every((s: any) => s.completed);

    let status: TaskStatus = task.status;

    if (allDone) status = "done";
    else if (updatedSubs.some((s: any) => s.completed)) status = "inProgress";
    else status = "todo";

    return {
      ...task,
      subtasks: updatedSubs,
      status,
    };
  });

  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
};

// 📌 Active tasks (not done)
export const getActiveTasks = async () => {
  const tasks = await getAllTasks();
  return tasks.filter((t) => t.status !== "done");
};

// 📅 Today tasks
export const getTodayTasks = async () => {
  const tasks = await getAllTasks();
  const today = new Date().toDateString();

  return tasks.filter((t) => new Date(t.createdAt).toDateString() === today);
};

// 📊 Progress (based on subtasks + tasks)
export const getProgress = async () => {
  const tasks = await getAllTasks();

  let total = 0;
  let done = 0;

  tasks.forEach((task) => {
    const subs = task.subtasks || [];

    if (subs.length > 0) {
      total += subs.length;
      done += subs.filter((s: any) => s.completed).length;
    } else {
      total += 1;
      if (task.status === "done") done += 1;
    }
  });

  return total === 0 ? 0 : Math.round((done / total) * 100);
};
