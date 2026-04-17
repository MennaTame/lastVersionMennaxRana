import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";

export default function TaskForm({ initialData, onSubmit }: any) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");

  const [subtasks, setSubtasks] = useState<any[]>([]);
  const [subInput, setSubInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setTime(initialData.time || "");

      // 🔥 normalize subtasks
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

    const newSub = {
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

  // 💾 submit (FIXED)
  const handleSubmit = () => {
    onSubmit({
      ...initialData, // 🔥 مهم جدًا (يحافظ على id وقت التعديل)
      title,
      time,
      subtasks,
    });
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Task title"
        style={styles.input}
      />

      {/* Time */}
      <TextInput
        value={time}
        onChangeText={setTime}
        placeholder="Time"
        style={styles.input}
      />

      {/* Subtasks */}
      <Text style={styles.section}>Subtasks</Text>

      <View style={styles.row}>
        <TextInput
          value={subInput}
          onChangeText={setSubInput}
          placeholder="Add subtask..."
          style={[styles.input, { flex: 1 }]}
        />

        <TouchableOpacity style={styles.addBtn} onPress={addSubtask}>
          <Text style={{ color: "#fff" }}>+</Text>
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

      {/* Save */}
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  section: {
    fontWeight: "bold",
    marginTop: 10,
  },

  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  addBtn: {
    backgroundColor: "#6C4CF1",
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  subItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
  },
});