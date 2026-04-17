import { useRouter } from "expo-router";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { deleteTask, toggleSubTask } from "../services/storage";

export default function TaskCard({ task, onRefresh }: any) {
  const router = useRouter();

  // 🔥 progress calculation
  const totalSubs = task.subtasks?.length || 0;
  const doneSubs =
    task.subtasks?.filter((s: any) => s.completed).length || 0;

  const progress =
    totalSubs === 0
      ? task.completed
        ? 100
        : 0
      : Math.round((doneSubs / totalSubs) * 100);

  // 🗑️ delete task
  const handleDelete = () => {
    Alert.alert("Are you sure?", "", [
      { text: "No" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          await deleteTask(task.id);
          onRefresh?.();
        },
      },
    ]);
  };

  // 🔥 toggle subtask (FIXED)
  const handleToggleSub = async (subId: string) => {
    await toggleSubTask(task.id, subId); // ✅ FIXED HERE
    onRefresh?.();
  };

  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, task.completed && styles.done]}>
            {task.title}
          </Text>

          <Text style={styles.time}>{task.time}</Text>

          <Text style={styles.status}>
            {progress === 100
              ? "✅ Completed"
              : progress > 0
              ? "🟡 In Progress"
              : "🔴 Not Started"}
          </Text>
        </View>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/add-task",
                params: { id: task.id },
              })
            }
          >
            <Ionicons name="create-outline" size={22} color="#6C4CF1" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDelete}>
            <Ionicons name="trash-outline" size={22} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      {/* PROGRESS */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${progress}%` },
          ]}
        />
      </View>

      {/* SUBTASKS */}
      {task.subtasks?.map((sub: any) => (
        <TouchableOpacity
          key={sub.id}
          style={styles.subTask}
          onPress={() => handleToggleSub(sub.id)} // ✅ FIXED CALL
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
    padding: 16,
    marginBottom: 12,
    borderRadius: 14,
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

  time: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
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
