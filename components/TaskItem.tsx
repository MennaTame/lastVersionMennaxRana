import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SubTask = {
  id: string;
  title: string;
  completed: boolean;
};

type TaskStatus = "todo" | "inProgress" | "done";
type Priority = "low" | "medium" | "high";

type Task = {
  id: string;
  title: string;
  category: string;
  time: string;
  priority: Priority;
  status: TaskStatus;
  subtasks?: SubTask[];
};

type Props = {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleSub?: (taskId: string, subId: string) => void;
};

export default function TaskItem({
  task,
  onStatusChange,
  onEdit,
  onDelete,
  onToggleSub,
}: Props) {
  // 🔥 progress
  const totalSubs = task.subtasks?.length || 0;
  const doneSubs = task.subtasks?.filter((s) => s.completed).length || 0;

  const progress =
    totalSubs === 0
      ? task.status === "done"
        ? 100
        : 0
      : Math.round((doneSubs / totalSubs) * 100);

  // 🔥 status text
  const getStatusText = () => {
    if (task.status === "done") return "Done";
    if (task.status === "inProgress") return "In Progress";
    return "To Do";
  };

  // 🔥 status color
  const getStatusColor = () => {
    if (task.status === "done") return "#4CAF50";
    if (task.status === "inProgress") return "#FF9800";
    return "#E53935";
  };

  // 🔥 priority color
  const getPriorityColor = () => {
    if (task.priority === "high") return "#E53935";
    if (task.priority === "medium") return "#FF9800";
    return "#4CAF50";
  };

  // 🔥 toggle subtask
  const handleToggleSub = (taskId: string, subId: string) => {
    if (!onToggleSub) return;
    onToggleSub(taskId, subId);
  };

  // 🔥 confirm delete
  const confirmDelete = () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are You Sure ?\nDelete this task?");
      if (confirmed) onDelete(task.id);
      return;
    }

    Alert.alert("Are You Sure ?", "Delete this task?", [
      { text: "No" },
      { text: "Yes", onPress: () => onDelete(task.id), style: "destructive" },
    ]);
  };

  return (
    <View style={styles.card}>
      {/* CATEGORY */}
      <Text style={styles.category}>{task.category}</Text>

      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{task.title}</Text>

          <View style={styles.row}>
            <Text style={[styles.status, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>

            <Text style={styles.time}>{task.time}</Text>
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() =>
              onStatusChange(task.id, task.status === "done" ? "todo" : "done")
            }
          >
            <Ionicons
              name={
                task.status === "done" ? "checkmark-circle" : "ellipse-outline"
              }
              size={26}
              color={task.status === "done" ? "#4CAF50" : "#999"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onEdit(task.id)}>
            <Ionicons name="create-outline" size={22} color="#6C4CF1" />
          </TouchableOpacity>

          <TouchableOpacity onPress={confirmDelete}>
            <Ionicons name="trash-outline" size={22} color="#E53935" />
          </TouchableOpacity>
        </View>
      </View>

      {/* PRIORITY */}
      <View
        style={[styles.priorityTag, { backgroundColor: getPriorityColor() }]}
      >
        <Text style={styles.priorityText}>{task.priority}</Text>
      </View>

      {/* PROGRESS */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      {/* SUBTASKS */}
      {task.subtasks?.map((sub) => (
        <TouchableOpacity
          key={sub.id}
          style={styles.subTask}
          onPress={() => handleToggleSub(task.id, sub.id)}
        >
          <Ionicons
            name={sub.completed ? "checkmark-circle" : "ellipse-outline"}
            size={20}
            color={sub.completed ? "#4CAF50" : "#999"}
          />

          <Text style={[styles.subText, sub.completed && styles.done]}>
            {sub.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
    elevation: 4,
  },

  category: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },

  status: {
    fontSize: 12,
    fontWeight: "600",
  },

  time: {
    fontSize: 12,
    color: "#777",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  priorityTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 8,
  },

  priorityText: {
    color: "#fff",
    fontSize: 11,
  },

  progressBar: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#6C4CF1",
  },

  subTask: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },

  subText: {
    fontSize: 14,
    color: "#333",
  },

  done: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});
