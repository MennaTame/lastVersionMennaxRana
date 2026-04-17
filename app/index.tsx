import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ProgressCard from "../components/ProgressCard";
import TaskItem from "../components/TaskItem";

import {
  completeTask,
  deleteTask,
  getActiveTasks,
  getProgress,
  getTodayTasks,
  // ⚠️ لازم يكون موجود في storage (لو مش موجود قولي أعملهولك)
  toggleSubTask,
} from "../services/storage";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const activeTasks = await getActiveTasks();
    const todayTasks = await getTodayTasks();
    const progressValue = await getProgress();

    const allTasks = [...activeTasks, ...todayTasks];

    // منع التكرار
    const uniqueTasks = Array.from(
      new Map(allTasks.map((t) => [t.id, t])).values()
    );

    setTasks(uniqueTasks);
    setProgress(progressValue);
  };

  // ✅ complete task
  const handleComplete = async (id: string) => {
    await completeTask(id);
    loadData();
  };

  // 🗑️ delete task (اختياري)
  const handleDelete = async (id: string) => {
    await deleteTask(id);
    loadData();
  };

  // 🔥 toggle subtask (الحل الأساسي لمشكلتك)
  const handleToggleSub = async (taskId: string, subId: string) => {
    await toggleSubTask(taskId, subId);
    loadData();
  };

  return (
    <View style={styles.container}>
      {/* Progress */}
      <ProgressCard progress={progress} />

      {/* Tasks */}
      <FlatList
        data={tasks}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingBottom: 120, marginTop: 16 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks yet 👀</Text>
        }
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onComplete={handleComplete}
            onEdit={(id) =>
              router.push({ pathname: "/add-task", params: { id } })
            }
            onToggleSub={handleToggleSub} // ✅ ده أهم سطر
          />
        )}
      />

      {/* Add button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add-task")}
      >
        <Text style={{ color: "#fff", fontSize: 24 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
    fontSize: 16,
  },

  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#6C4CF1",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});