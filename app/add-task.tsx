// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import {
//   Alert,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import TaskForm from "../components/TaskForm";
// import {
//   createTask,
//   deleteTask,
//   getTaskById,
//   updateTask,
// } from "../services/storage";

// export default function AddEdit() {
//   const { id } = useLocalSearchParams();
//   const router = useRouter();

//   const [task, setTask] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (id) {
//       loadTask();
//     }
//   }, [id]);

//   const loadTask = async () => {
//     setLoading(true);
//     const data = await getTaskById(id as string);
//     setTask(data);
//     setLoading(false);
//   };

//   const handleSubmit = async (data: any) => {
//     if (id) {
//       await updateTask(id as string, data);
//     } else {
//       await createTask(data);
//     }
//     router.back();
//   };

//   const handleDelete = () => {
//     Alert.alert("Confirm", "Delete this task?", [
//       { text: "No" },
//       {
//         text: "Yes",
//         style: "destructive",
//         onPress: async () => {
//           await deleteTask(id as string);
//           router.back();
//         },
//       },
//     ]);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {loading ? (
//         <Text>Loading...</Text>
//       ) : (
//         <TaskForm initialData={task} onSubmit={handleSubmit} />
//       )}

//       {id && !loading && (
//         <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
//           <Text style={styles.deleteText}>Delete Task</Text>
//         </TouchableOpacity>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     paddingBottom: 100,
//     backgroundColor: "#F7F7FB",
//     flexGrow: 1,
//   },
//   deleteBtn: {
//     marginTop: 16,
//     backgroundColor: "#FF4D4D",
//     padding: 16,
//     borderRadius: 14,
//     alignItems: "center",
//   },
//   deleteText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "700",
//   },
// });

import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import TaskForm from "../components/TaskForm";
import {
  createTask,
  deleteTask,
  getTaskById,
  updateTask,
} from "../services/storage";

export default function AddEditTaskScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadTask();
    }
  }, [id]);

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
    <SafeAreaView style={styles.safe}>
      <View style={styles.phoneFrame}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={22} color="#222" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{id ? "Edit Task" : "Add Task"}</Text>

          <View style={{ width: 40 }} />
        </View>

        {loading ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color="#6C4CF1" />
          </View>
        ) : (
          <TaskForm initialData={task} onSubmit={handleSubmit} />
        )}

        {!!id && !loading && (
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.deleteText}>Delete Task</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },
  phoneFrame: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    backgroundColor: "#F7F7FB",
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F1F1F",
  },
  loaderWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBtn: {
    marginTop: 14,
    backgroundColor: "#E53935",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
