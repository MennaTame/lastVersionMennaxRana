import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import TaskItem from "../components/TaskItem";
import {
  getAllTasks,
  deleteTask,
  toggleSubTask,
  updateTaskStatus,
} from "../services/storage";

type Filter = "all" | "todo" | "inProgress" | "done";

export default function TasksScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

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

  // 🔥 change status
  const handleStatusChange = async (id: string, status: any) => {
    await updateTaskStatus(id, status);
    loadTasks();
  };

  // 🗑️ delete
  const handleDelete = async (id: string) => {
    await deleteTask(id);
    loadTasks();
  };

  // 🔥 toggle subtask
  const handleToggleSub = async (taskId: string, subId: string) => {
    await toggleSubTask(taskId, subId);
    loadTasks();
  };

  // 🎯 filtering
  const filteredTasks = tasks.filter((t) => {
    if (filter === "all") return true;
    return t.status === filter;
  });

  // 🎨 chip button
  const FilterButton = ({ title, value }: any) => (
    <TouchableOpacity
      onPress={() => setFilter(value)}
      style={[
        styles.chip,
        filter === value && styles.activeChip,
      ]}
    >
      <Text
        style={[
          styles.chipText,
          filter === value && styles.activeChipText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.header}>Today's Tasks</Text>

      {/* FILTERS */}
      <View style={styles.chipsContainer}>
        <FilterButton title="All" value="all" />
        <FilterButton title="To do" value="todo" />
        <FilterButton title="In Progress" value="inProgress" />
        <FilterButton title="Done" value="done" />
      </View>

      {/* LIST */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id?.toString()}
        contentContainerStyle={[
          styles.listContent,
          filteredTasks.length === 0 && { flex: 1 },
        ]}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks 👀</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            onEdit={(id) => console.log("edit", id)}
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

  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },

  chipsContainer: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 8,
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#eee",
    borderRadius: 20,
  },

  activeChip: {
    backgroundColor: "#6C4CF1",
  },

  chipText: {
    fontSize: 12,
    color: "#555",
  },

  activeChipText: {
    color: "#fff",
    fontWeight: "600",
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