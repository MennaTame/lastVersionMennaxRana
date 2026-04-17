import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import TaskForm from "../components/TaskForm";
import {
  createTask,
  deleteTask,
  getTaskById,
  updateTask,
} from "../services/storage";

export default function AddEdit() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadTask();
    }
  }, [id]); // 🔥 مهم

  const loadTask = async () => {
    setLoading(true);
    const data = await getTaskById(id as string);
    setTask(data);
    setLoading(false);
  };

  const handleSubmit = async (data: any) => {
    if (id) {
      await updateTask(id as string, data);
    } else {
      await createTask(data);
    }

    router.back();
  };

  const handleDelete = () => {
    Alert.alert("Confirm", "Delete this task?", [
      { text: "No" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          await deleteTask(id as string);
          router.back();
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* الفورم */}
      <TaskForm initialData={task} onSubmit={handleSubmit} />

      {/* زرار حذف بشكل أحسن */}
      {id && (
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete Task</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
    backgroundColor: "#F5F5F5",
    flexGrow: 1,
  },

  deleteBtn: {
    marginTop: 20,
    backgroundColor: "#FF4D4D",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
