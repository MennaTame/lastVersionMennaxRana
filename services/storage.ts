import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_KEY = "TASKS";

// 📥 Get all tasks
export const getAllTasks = async () => {
  const data = await AsyncStorage.getItem(TASKS_KEY);
  return data ? JSON.parse(data) : [];
};

// 🔍 Get task by id
export const getTaskById = async (id: string) => {
  const tasks = await getAllTasks();
  return tasks.find((t: any) => t.id === id);
};

// ➕ Create task
export const createTask = async (task: any) => {
  const tasks = await getAllTasks();

  const newTask = {
    id: Date.now().toString(),
    title: task.title,
    completed: false,
    date: task.date || new Date().toISOString(),

    // 🔥 normalize subtasks safely
    subtasks: Array.isArray(task.subtasks)
      ? task.subtasks.map((sub: any, index: number) => ({
          id: `${Date.now()}-${index}`,
          title: sub.title,
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

  const updated = tasks.filter((t: any) => t.id !== id);

  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
};

// ✏️ Update task
export const updateTask = async (id: string, updatedData: any) => {
  const tasks = await getAllTasks();

  const updated = tasks.map((t: any) =>
    t.id === id
      ? {
          ...t,
          ...updatedData,
          subtasks: Array.isArray(updatedData.subtasks)
            ? updatedData.subtasks
            : t.subtasks || [],
        }
      : t,
  );

  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
};

// 🔥 Toggle subtask (FIXED + SAFE)
export const toggleSubTask = async (taskId: string, subId: string) => {
  const tasks = await getAllTasks();

  const updated = tasks.map((task: any) => {
    if (task.id !== taskId) return task;

    const subs = task.subtasks || [];

    const updatedSubs = subs.map((sub: any) =>
      sub.id === subId ? { ...sub, completed: !sub.completed } : sub,
    );

    // 🔥 auto update task completed state
    const allDone =
      updatedSubs.length > 0 && updatedSubs.every((s: any) => s.completed);

    return {
      ...task,
      subtasks: updatedSubs,
      completed: allDone,
    };
  });

  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
};

// ✅ Complete task (safe)
export const completeTask = async (id: string) => {
  const tasks = await getAllTasks();

  const updated = tasks.map((t: any) =>
    t.id === id
      ? {
          ...t,
          completed: true,
          subtasks: (t.subtasks || []).map((s: any) => ({
            ...s,
            completed: true,
          })),
        }
      : t,
  );

  await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
};

// 📌 Active tasks
export const getActiveTasks = async () => {
  const tasks = await getAllTasks();
  return tasks.filter((t: any) => !t.completed);
};

// 📅 Today tasks
export const getTodayTasks = async () => {
  const tasks = await getAllTasks();
  const today = new Date().toDateString();

  return tasks.filter((t: any) => new Date(t.date).toDateString() === today);
};

// 📊 Progress (FIXED & CLEAN)
export const getProgress = async () => {
  const tasks = await getAllTasks();

  let total = 0;
  let done = 0;

  tasks.forEach((task: any) => {
    const subs = task.subtasks || [];

    if (subs.length > 0) {
      total += subs.length;
      done += subs.filter((s: any) => s.completed).length;
    } else {
      total += 1;
      if (task.completed) done += 1;
    }
  });

  return total === 0 ? 0 : Math.round((done / total) * 100);
};
