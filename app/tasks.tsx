import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";

import TaskCard from "../components/TaskCard";
import { getAllTasks, completeTask, deleteTask, toggleSubTask } from "../services/storage";

export default function TasksScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await getAllTasks();
    setTasks(res || []);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  // 🔥 complete task
  const handleComplete = async (id: string) => {
    await completeTask(id);
    loadTasks();
  };

  // 🗑️ delete task
  const handleDelete = async (id: string) => {
    await deleteTask(id);
    loadTasks();
  };

  // 🔥 toggle subtask
  const handleToggleSub = async (taskId: string, subId: string) => {
    await toggleSubTask(taskId, subId);
    loadTasks();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id?.toString()}
        contentContainerStyle={[
          styles.listContent,
          tasks.length === 0 && { flex: 1 },
        ]}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks yet 👀</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onComplete={handleComplete}
            onDelete={handleDelete}
            onToggleSub={handleToggleSub}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },

  listContent: {
    paddingBottom: 120,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});