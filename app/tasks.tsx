// import { useLocalSearchParams } from "expo-router";
// import { useCallback, useMemo, useState } from "react";
// import {
//   FlatList,
//   RefreshControl,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useFocusEffect } from "@react-navigation/native";

// import TaskItem from "../components/TaskItem";
// import {
//   getAllTasks,
//   deleteTask,
//   toggleSubTask,
//   updateTaskStatus,
// } from "../services/storage";

// type Filter = "all" | "todo" | "inProgress" | "done";

// export default function TasksScreen() {
//   const { category } = useLocalSearchParams();
//   const [tasks, setTasks] = useState<any[]>([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [filter, setFilter] = useState<Filter>("all");

//   const loadTasks = async () => {
//     const res = await getAllTasks();
//     setTasks(res || []);
//   };

//   useFocusEffect(
//     useCallback(() => {
//       loadTasks();
//     }, []),
//   );

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadTasks();
//     setRefreshing(false);
//   };

//   const handleStatusChange = async (id: string, status: any) => {
//     await updateTaskStatus(id, status);
//     loadTasks();
//   };

//   const handleDelete = async (id: string) => {
//     await deleteTask(id);
//     loadTasks();
//   };

//   const handleToggleSub = async (taskId: string, subId: string) => {
//     await toggleSubTask(taskId, subId);
//     loadTasks();
//   };

//   const filteredTasks = useMemo(() => {
//     let result = [...tasks];

//     if (category) {
//       result = result.filter((t) => t.category === category);
//     }

//     if (filter !== "all") {
//       result = result.filter((t) => t.status === filter);
//     }

//     return result;
//   }, [tasks, filter, category]);

//   const FilterButton = ({ title, value }: any) => (
//     <TouchableOpacity
//       onPress={() => setFilter(value)}
//       style={[styles.chip, filter === value && styles.activeChip]}
//     >
//       <Text
//         style={[styles.chipText, filter === value && styles.activeChipText]}
//       >
//         {title}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>
//         {category ? `${category} Tasks` : "Today's Tasks"}
//       </Text>

//       <View style={styles.chipsContainer}>
//         <FilterButton title="All" value="all" />
//         <FilterButton title="To do" value="todo" />
//         <FilterButton title="In Progress" value="inProgress" />
//         <FilterButton title="Done" value="done" />
//       </View>

//       <FlatList
//         data={filteredTasks}
//         keyExtractor={(item) => item.id?.toString()}
//         contentContainerStyle={[
//           styles.listContent,
//           filteredTasks.length === 0 && { flex: 1 },
//         ]}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>No tasks 👀</Text>
//           </View>
//         }
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         renderItem={({ item }) => (
//           <TaskItem
//             task={item}
//             onStatusChange={handleStatusChange}
//             onDelete={handleDelete}
//             onEdit={(id) => console.log("edit", id)}
//             onToggleSub={handleToggleSub}
//           />
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#F7F7FB",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginBottom: 12,
//     color: "#222",
//   },
//   chipsContainer: {
//     flexDirection: "row",
//     marginBottom: 14,
//     gap: 8,
//     flexWrap: "wrap",
//   },
//   chip: {
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     backgroundColor: "#EEEAFD",
//     borderRadius: 20,
//   },
//   activeChip: {
//     backgroundColor: "#6C4CF1",
//   },
//   chipText: {
//     fontSize: 12,
//     color: "#555",
//   },
//   activeChipText: {
//     color: "#fff",
//     fontWeight: "600",
//   },
//   listContent: {
//     paddingBottom: 120,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   emptyText: {
//     fontSize: 16,
//     color: "#999",
//   },
// });

import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import TaskItem from "../components/TaskItem";
import {
  getAllTasks,
  deleteTask,
  toggleSubTask,
  updateTaskStatus,
} from "../services/storage";

type Filter = "all" | "todo" | "inProgress" | "done";

export default function TasksScreen() {
  const { category } = useLocalSearchParams();
  const router = useRouter();

  const [tasks, setTasks] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  const loadTasks = async () => {
    const res = await getAllTasks();
    setTasks(res || []);
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const handleStatusChange = async (id: string, status: any) => {
    await updateTaskStatus(id, status);
    await loadTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    await loadTasks();
  };

  const handleToggleSub = async (taskId: string, subId: string) => {
    await toggleSubTask(taskId, subId);
    await loadTasks();
  };

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (category) {
      result = result.filter((t) => t.category === category);
    }

    if (filter !== "all") {
      result = result.filter((t) => t.status === filter);
    }

    return result;
  }, [tasks, filter, category]);

  const FilterButton = ({
    title,
    value,
  }: {
    title: string;
    value: Filter;
  }) => (
    <TouchableOpacity
      onPress={() => setFilter(value)}
      style={[styles.chip, filter === value && styles.activeChip]}
    >
      <Text
        style={[styles.chipText, filter === value && styles.activeChipText]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.phoneFrame}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#222" />
          </TouchableOpacity>

          <Text style={styles.header}>
            {category ? `${category} Tasks` : "Today's Tasks"}
          </Text>

          <View style={{ width: 40 }} />
        </View>

        <View style={styles.chipsContainer}>
          <FilterButton title="All" value="all" />
          <FilterButton title="To do" value="todo" />
          <FilterButton title="In Progress" value="inProgress" />
          <FilterButton title="Done" value="done" />
        </View>

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
              onEdit={(id) =>
                router.push({ pathname: "/add-task", params: { id } })
              }
              onToggleSub={handleToggleSub}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7FB",
  },
  phoneFrame: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    backgroundColor: "#F7F7FB",
    padding: 16,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
  },
  chipsContainer: {
    flexDirection: "row",
    marginBottom: 14,
    gap: 8,
    flexWrap: "wrap",
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#EEEAFD",
    borderRadius: 18,
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
    paddingBottom: 100,
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