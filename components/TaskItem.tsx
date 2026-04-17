import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SubTask = {
  id: string;
  title: string;
  completed: boolean;
};

type Task = {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
  subtasks?: SubTask[];
};

type Props = {
  task: Task;
  onComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onToggleSub?: (taskId: string, subId: string) => void;
};

export default function TaskItem({
  task,
  onComplete,
  onEdit,
  onToggleSub,
}: Props) {
  // 🔥 حساب progress
  const totalSubs = task.subtasks?.length || 0;
  const doneSubs =
    task.subtasks?.filter((s) => s.completed).length || 0;

  const progress =
    totalSubs === 0
      ? task.completed
        ? 100
        : 0
      : Math.round((doneSubs / totalSubs) * 100);

  // 🔥 safe toggle (100% crash-proof)
  const handleToggleSub = (taskId: string, subId: string) => {
    if (!onToggleSub) return;
    onToggleSub(taskId, subId);
  };

  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, task.completed && styles.done]}>
            {task.title}
          </Text>

          <Text style={styles.status}>
            {progress === 100
              ? "✅ Completed"
              : progress > 0
              ? "🟡 In Progress"
              : "🔴 Not Started"}
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onComplete(task.id)}>
            <Ionicons
              name={
                task.completed
                  ? "checkmark-circle"
                  : "ellipse-outline"
              }
              size={26}
              color={task.completed ? "green" : "#999"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onEdit(task.id)}>
            <Ionicons name="create-outline" size={24} color="#6C4CF1" />
          </TouchableOpacity>
        </View>
      </View>

      {/* PROGRESS BAR */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress}%` },
          ]}
        />
      </View>

      {/* SUBTASKS */}
      {task.subtasks?.map((sub) => (
        <TouchableOpacity
          key={sub.id}
          style={styles.subTask}
          onPress={() => handleToggleSub(task.id, sub.id)}
        >
          <Ionicons
            name={
              sub.completed
                ? "checkmark-circle"
                : "ellipse-outline"
            }
            size={20}
            color={sub.completed ? "green" : "#999"}
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
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 3,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },

  status: {
    fontSize: 12,
    marginTop: 4,
    color: "#888",
  },

  done: {
    textDecorationLine: "line-through",
    color: "#999",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
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
});