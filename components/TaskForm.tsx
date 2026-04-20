import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";

type SubTask = {
  id: string;
  title: string;
  completed: boolean;
};

type Props = {
  initialData?: any;
  onSubmit: (data: any) => void;
};

export default function TaskForm({ initialData, onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const [subtasks, setSubtasks] = useState<SubTask[]>([]);
  const [subInput, setSubInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setTime(initialData.time || "");
      setCategory(initialData.category || "");
      setPriority(initialData.priority || "medium");

      setSubtasks(
        Array.isArray(initialData.subtasks)
          ? initialData.subtasks
          : []
      );
    }
  }, [initialData]);

  // ➕ add subtask
  const addSubtask = () => {
    if (!subInput.trim()) return;

    const newSub: SubTask = {
      id: Date.now().toString(),
      title: subInput.trim(),
      completed: false,
    };

    setSubtasks((prev) => [...prev, newSub]);
    setSubInput("");
  };

  // ❌ remove subtask
  const removeSubtask = (id: string) => {
    setSubtasks((prev) => prev.filter((s) => s.id !== id));
  };

  // 💾 submit
  const handleSubmit = () => {
    onSubmit({
      ...initialData,
      title,
      time,
      category,
      priority,
      subtasks,
    });
  };

  // 🎨 priority button
  const PriorityBtn = ({ value }: any) => (
    <TouchableOpacity
      onPress={() => setPriority(value)}
      style={[
        styles.priorityBtn,
        priority === value && styles.activePriority,
      ]}
    >
      <Text
        style={[
          styles.priorityText,
          priority === value && styles.activePriorityText,
        ]}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* TITLE */}
      <Text style={styles.label}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Task title"
        style={styles.input}
      />

      {/* CATEGORY */}
      <Text style={styles.label}>Category</Text>
      <TextInput
        value={category}
        onChangeText={setCategory}
        placeholder="Work / Personal"
        style={styles.input}
      />

      {/* TIME */}
      <Text style={styles.label}>Time</Text>
      <TextInput
        value={time}
        onChangeText={setTime}
        placeholder="10:00 AM"
        style={styles.input}
      />

      {/* PRIORITY */}
      <Text style={styles.label}>Priority</Text>
      <View style={styles.row}>
        <PriorityBtn value="low" />
        <PriorityBtn value="medium" />
        <PriorityBtn value="high" />
      </View>

      {/* SUBTASKS */}
      <Text style={styles.label}>Subtasks</Text>

      <View style={styles.row}>
        <TextInput
          value={subInput}
          onChangeText={setSubInput}
          placeholder="Add subtask..."
          style={[styles.input, { flex: 1 }]}
        />

        <TouchableOpacity style={styles.addBtn} onPress={addSubtask}>
          <Text style={{ color: "#fff", fontSize: 18 }}>+</Text>
        </TouchableOpacity>
      </View>

      {subtasks.map((sub) => (
        <View key={sub.id} style={styles.subItem}>
          <Text>{sub.title}</Text>

          <TouchableOpacity onPress={() => removeSubtask(sub.id)}>
            <Text style={{ color: "red" }}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* SAVE BUTTON */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
        <Text style={styles.saveText}>Save Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },

  label: {
    fontWeight: "600",
    fontSize: 13,
    color: "#555",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  addBtn: {
    backgroundColor: "#6C4CF1",
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  subItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 10,
  },

  priorityBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#eee",
  },

  activePriority: {
    backgroundColor: "#6C4CF1",
  },

  priorityText: {
    color: "#555",
  },

  activePriorityText: {
    color: "#fff",
    fontWeight: "600",
  },

  saveBtn: {
    marginTop: 20,
    backgroundColor: "#6C4CF1",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
  },
});