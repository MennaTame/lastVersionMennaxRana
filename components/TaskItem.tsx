// import { Ionicons } from "@expo/vector-icons";
// import React from "react";
// import {
//   Alert,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// type SubTask = {
//   id: string;
//   title: string;
//   completed: boolean;
// };

// type TaskStatus = "todo" | "inProgress" | "done";
// type Priority = "low" | "medium" | "high";

// type Task = {
//   id: string;
//   title: string;
//   category: string;
//   description?: string;
//   dueDate?: string;
//   priority: Priority;
//   status: TaskStatus;
//   subtasks?: SubTask[];
// };

// type Props = {
//   task: Task;
//   onStatusChange: (id: string, status: TaskStatus) => void;
//   onEdit: (id: string) => void;
//   onDelete: (id: string) => void;
//   onToggleSub?: (taskId: string, subId: string) => void;
//   compact?: boolean;
// };

// export default function TaskItem({
//   task,
//   onStatusChange,
//   onEdit,
//   onDelete,
//   onToggleSub,
//   compact = false,
// }: Props) {
//   const totalSubs = task.subtasks?.length || 0;
//   const doneSubs = task.subtasks?.filter((s) => s.completed).length || 0;

//   const progress =
//     totalSubs === 0
//       ? task.status === "done"
//         ? 100
//         : 0
//       : Math.round((doneSubs / totalSubs) * 100);

//   const getStatusText = () => {
//     if (task.status === "done") return "Done";
//     if (task.status === "inProgress") return "In Progress";
//     return "To Do";
//   };

//   const getStatusColor = () => {
//     if (task.status === "done") return "#4CAF50";
//     if (task.status === "inProgress") return "#FF9800";
//     return "#8E8E93";
//   };

//   const getPriorityColor = () => {
//     if (task.priority === "high") return "#E53935";
//     if (task.priority === "medium") return "#FF9800";
//     return "#4CAF50";
//   };

//   const handleToggleSub = (taskId: string, subId: string) => {
//     if (!onToggleSub) return;
//     onToggleSub(taskId, subId);
//   };

//   const confirmDelete = () => {
//     if (Platform.OS === "web") {
//       const confirmed = window.confirm("Are you sure?\nDelete this task?");
//       if (confirmed) onDelete(task.id);
//       return;
//     }

//     Alert.alert("Are you sure?", "Delete this task?", [
//       { text: "No" },
//       { text: "Yes", onPress: () => onDelete(task.id), style: "destructive" },
//     ]);
//   };

//   return (
//     <View style={[styles.card, compact && styles.compactCard]}>
//       <Text style={styles.category}>{task.category || "General"}</Text>

//       <View style={styles.header}>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.title} numberOfLines={2}>
//             {task.title}
//           </Text>

//           {!!task.description && !compact && (
//             <Text style={styles.description} numberOfLines={2}>
//               {task.description}
//             </Text>
//           )}

//           <View style={styles.row}>
//             <Text style={[styles.status, { color: getStatusColor() }]}>
//               {getStatusText()}
//             </Text>

//             {!!task.dueDate && (
//               <Text style={styles.time}>
//                 {new Date(task.dueDate).toLocaleDateString("en-GB", {
//                   day: "2-digit",
//                   month: "short",
//                 })}
//               </Text>
//             )}
//           </View>
//         </View>

//         <View style={styles.actions}>
//           <TouchableOpacity
//             onPress={() =>
//               onStatusChange(
//                 task.id,
//                 task.status === "done"
//                   ? "todo"
//                   : task.status === "todo"
//                   ? "inProgress"
//                   : "done",
//               )
//             }
//           >
//             <Ionicons
//               name={
//                 task.status === "done" ? "checkmark-circle" : "ellipse-outline"
//               }
//               size={24}
//               color={task.status === "done" ? "#4CAF50" : "#999"}
//             />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={() => onEdit(task.id)}>
//             <Ionicons name="create-outline" size={22} color="#6C4CF1" />
//           </TouchableOpacity>

//           <TouchableOpacity onPress={confirmDelete}>
//             <Ionicons name="trash-outline" size={22} color="#E53935" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={[styles.priorityTag, { backgroundColor: getPriorityColor() }]}>
//         <Text style={styles.priorityText}>{task.priority}</Text>
//       </View>

//       <View style={styles.progressBar}>
//         <View style={[styles.progressFill, { width: `${progress}%` }]} />
//       </View>

//       {!compact &&
//         task.subtasks?.map((sub) => (
//           <TouchableOpacity
//             key={sub.id}
//             style={styles.subTask}
//             onPress={() => handleToggleSub(task.id, sub.id)}
//           >
//             <Ionicons
//               name={sub.completed ? "checkmark-circle" : "ellipse-outline"}
//               size={20}
//               color={sub.completed ? "#4CAF50" : "#999"}
//             />

//             <Text style={[styles.subText, sub.completed && styles.done]}>
//               {sub.title}
//             </Text>
//           </TouchableOpacity>
//         ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 18,
//     marginBottom: 14,
//     elevation: 4,
//   },
//   compactCard: {
//     minHeight: 170,
//   },
//   category: {
//     fontSize: 12,
//     color: "#888",
//     marginBottom: 6,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     gap: 12,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#222",
//   },
//   description: {
//     fontSize: 13,
//     color: "#777",
//     marginTop: 6,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 8,
//     alignItems: "center",
//   },
//   status: {
//     fontSize: 12,
//     fontWeight: "600",
//   },
//   time: {
//     fontSize: 12,
//     color: "#777",
//   },
//   actions: {
//     flexDirection: "row",
//     gap: 10,
//     alignItems: "center",
//   },
//   priorityTag: {
//     alignSelf: "flex-start",
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   priorityText: {
//     color: "#fff",
//     fontSize: 11,
//     textTransform: "capitalize",
//   },
//   progressBar: {
//     height: 6,
//     backgroundColor: "#eee",
//     borderRadius: 10,
//     marginTop: 12,
//     overflow: "hidden",
//   },
//   progressFill: {
//     height: "100%",
//     backgroundColor: "#6C4CF1",
//   },
//   subTask: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//     gap: 8,
//   },
//   subText: {
//     fontSize: 14,
//     color: "#333",
//   },
//   done: {
//     textDecorationLine: "line-through",
//     color: "#999",
//   },
// });


import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Modal,
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
  description?: string;
  dueDate?: string;
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
  compact?: boolean;
};

export default function TaskItem({
  task,
  onStatusChange,
  onEdit,
  onDelete,
  onToggleSub,
  compact = false,
}: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const totalSubs = task.subtasks?.length || 0;
  const doneSubs = task.subtasks?.filter((s) => s.completed).length || 0;

  const progress =
    totalSubs === 0
      ? task.status === "done"
        ? 100
        : 0
      : Math.round((doneSubs / totalSubs) * 100);

  const getStatusText = () => {
    if (task.status === "done") return "Done";
    if (task.status === "inProgress") return "In Progress";
    return "To Do";
  };

  const getStatusColor = () => {
    if (task.status === "done") return "#4CAF50";
    if (task.status === "inProgress") return "#FF9800";
    return "#8E8E93";
  };

  const getPriorityColor = () => {
    if (task.priority === "high") return "#E53935";
    if (task.priority === "medium") return "#FF9800";
    return "#4CAF50";
  };

  const confirmDelete = () => {
    if (Platform.OS === "web") {
      setShowDeleteModal(true);
      return;
    }

    Alert.alert("Are you sure?", "Delete this task?", [
      { text: "No" },
      { text: "Yes", onPress: () => onDelete(task.id), style: "destructive" },
    ]);
  };

  return (
    <View style={[styles.card, compact && styles.compactCard]}>
      <Text style={styles.category}>{task.category || "General"}</Text>

      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={2}>
            {task.title}
          </Text>

          {!!task.description && !compact && (
            <Text style={styles.description} numberOfLines={2}>
              {task.description}
            </Text>
          )}

          <View style={styles.row}>
            <Text style={[styles.status, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>

            {!!task.dueDate && (
              <Text style={styles.time}>
                {new Date(task.dueDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() =>
              onStatusChange(
                task.id,
                task.status === "done"
                  ? "todo"
                  : task.status === "todo"
                  ? "inProgress"
                  : "done"
              )
            }
          >
            <Ionicons
              name={
                task.status === "done"
                  ? "checkmark-circle"
                  : "ellipse-outline"
              }
              size={24}
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

      <View
        style={[styles.priorityTag, { backgroundColor: getPriorityColor() }]}
      >
        <Text style={styles.priorityText}>{task.priority}</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      {/* 🔥 Custom Modal */}
      <Modal
        transparent
        visible={showDeleteModal}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModal}>
            <Text style={styles.modalTitle}>Are You Sure ?</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.yesButton]}
                onPress={() => {
                  setShowDeleteModal(false);
                  onDelete(task.id);
                }}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.noButton]}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  compactCard: {
    minHeight: 170,
  },
  category: {
    fontSize: 12,
    color: "#888",
    marginBottom: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  description: {
    fontSize: 13,
    color: "#777",
    marginTop: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    alignItems: "center",
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
    marginTop: 10,
  },
  priorityText: {
    color: "#fff",
    fontSize: 11,
    textTransform: "capitalize",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginTop: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#6C4CF1",
  },

  /* 🔥 Modal styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteModal: {
    width: 260,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#222",
    marginBottom: 18,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10,
  },
  modalButton: {
    width: 95,
    height: 42,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  yesButton: {
    backgroundColor: "#E52525",
  },
  noButton: {
    backgroundColor: "#6536E8",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
});