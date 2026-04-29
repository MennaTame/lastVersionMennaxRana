// import { useRouter } from "expo-router";
// import { useCallback, useMemo, useState } from "react";
// import {
//   FlatList,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { useFocusEffect } from "@react-navigation/native";

// import ProgressCard from "../components/ProgressCard";
// import TaskItem from "../components/TaskItem";
// import TaskGroupCard from "../components/TaskGroupCard";

// import {
//   deleteTask,
//   getAllTasks,
//   getProgress,
//   toggleSubTask,
//   updateTaskStatus,
//   deleteDoneTasks,
// } from "../services/storage";

// export default function Home() {
//   const [tasks, setTasks] = useState<any[]>([]);
//   const [progress, setProgress] = useState(0);
//   const router = useRouter();

//   const loadData = async () => {
//     const allTasks = await getAllTasks();
//     const progressValue = await getProgress();

//     setTasks(allTasks || []);
//     setProgress(progressValue || 0);
//   };

//   useFocusEffect(
//     useCallback(() => {
//       loadData();
//     }, []),
//   );

//   const handleStatusChange = async (id: string, status: string) => {
//     await updateTaskStatus(id, status as any);
//     loadData();
//   };

//   const handleDelete = async (id: string) => {
//     await deleteTask(id);
//     loadData();
//   };

//   const handleDeleteDone = async () => {
//     await deleteDoneTasks();
//     loadData();
//   };

//   const handleToggleSub = async (taskId: string, subId: string) => {
//     await toggleSubTask(taskId, subId);
//     loadData();
//   };

//   const inProgressTasks = useMemo(() => {
//     return tasks.filter(
//       (task) => task.status === "inProgress" || task.status === "todo",
//     );
//   }, [tasks]);

//   const groupedTasks = useMemo(() => {
//     const groups: Record<string, any[]> = {};

//     tasks.forEach((task) => {
//       const key = task.category?.trim() || "General";
//       if (!groups[key]) groups[key] = [];
//       groups[key].push(task);
//     });

//     return Object.entries(groups).map(([title, items]) => ({
//       title,
//       count: items.length,
//       tasks: items,
//     }));
//   }, [tasks]);

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.content}
//         showsVerticalScrollIndicator={false}
//       >
//         <ProgressCard progress={progress} />

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>In Progress</Text>
//           <Text style={styles.sectionCount}>{inProgressTasks.length}</Text>
//         </View>

//         <FlatList
//           data={inProgressTasks.slice(0, 3)}
//           horizontal
//           keyExtractor={(item) => item.id}
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.horizontalList}
//           renderItem={({ item }) => (
//             <View style={styles.taskCardWrapper}>
//               <TaskItem
//                 task={item}
//                 onStatusChange={handleStatusChange}
//                 onEdit={(id) =>
//                   router.push({ pathname: "/add-task", params: { id } })
//                 }
//                 onDelete={handleDelete}
//                 onToggleSub={handleToggleSub}
//               />
//             </View>
//           )}
//         />

//         <View style={styles.sectionHeader}>
//           <Text style={styles.sectionTitle}>Task Groups</Text>
//           <Text style={styles.sectionCount}>{groupedTasks.length}</Text>
//         </View>

//         {groupedTasks.map((group) => (
//           <TaskGroupCard
//             key={group.title}
//             title={group.title}
//             count={group.count}
//             onPress={() =>
//               router.push({
//                 pathname: "/tasks",
//                 params: { category: group.title },
//               })
//             }
//           />
//         ))}
//       </ScrollView>

//       <TouchableOpacity
//         style={styles.deleteFab}
//         onPress={handleDeleteDone}
//       >
//         <Text style={styles.fabText}>🗑️</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.addFab}
//         onPress={() => router.push("/add-task")}
//       >
//         <Text style={styles.fabText}>+</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F7F7FB",
//   },
//   content: {
//     padding: 16,
//     paddingBottom: 120,
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 8,
//     marginBottom: 12,
//     gap: 6,
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#222",
//   },
//   sectionCount: {
//     fontSize: 14,
//     color: "#8E6CF8",
//     fontWeight: "700",
//   },
//   horizontalList: {
//     paddingBottom: 8,
//   },
//   taskCardWrapper: {
//     width: 280,
//     marginRight: 12,
//   },
//   addFab: {
//     position: "absolute",
//     right: 20,
//     bottom: 20,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#6C4CF1",
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 5,
//   },
//   deleteFab: {
//     position: "absolute",
//     right: 20,
//     bottom: 92,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#E53935",
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 5,
//   },
//   fabText: {
//     color: "#fff",
//     fontSize: 24,
//     fontWeight: "700",
//   },
// });

import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/auth/SplashScreen" />;
}