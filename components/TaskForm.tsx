// import {
//   View,
//   TextInput,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useState, useEffect } from "react";

// type SubTask = {
//   id: string;
//   title: string;
//   completed: boolean;
// };

// type Props = {
//   initialData?: any;
//   onSubmit: (data: any) => void;
// };

// export default function TaskForm({ initialData, onSubmit }: Props) {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [time, setTime] = useState("");
//   const [category, setCategory] = useState("");
//   const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

//   const [subtasks, setSubtasks] = useState<SubTask[]>([]);
//   const [subInput, setSubInput] = useState("");

//   useEffect(() => {
//     if (initialData) {
//       setTitle(initialData.title || "");
//       setDescription(initialData.description || "");
//       setTime(initialData.time || "");
//       setCategory(initialData.category || "");
//       setPriority(initialData.priority || "medium");
//       setSubtasks(Array.isArray(initialData.subtasks) ? initialData.subtasks : []);
//     }
//   }, [initialData]);

//   const addSubtask = () => {
//     if (!subInput.trim()) return;

//     const newSub: SubTask = {
//       id: Date.now().toString(),
//       title: subInput.trim(),
//       completed: false,
//     };

//     setSubtasks((prev) => [...prev, newSub]);
//     setSubInput("");
//   };

//   const removeSubtask = (id: string) => {
//     setSubtasks((prev) => prev.filter((s) => s.id !== id));
//   };

//   const handleSubmit = () => {
//     onSubmit({
//       ...initialData,
//       title,
//       description,
//       time,
//       category,
//       priority,
//       subtasks,
//       status: initialData?.status || "todo",
//     });
//   };

//   const PriorityBtn = ({ value, label }: any) => (
//     <TouchableOpacity
//       onPress={() => setPriority(value)}
//       style={[
//         styles.priorityBtn,
//         priority === value && styles.activePriority,
//       ]}
//     >
//       <Text
//         style={[
//           styles.priorityText,
//           priority === value && styles.activePriorityText,
//         ]}
//       >
//         {label}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.screenTitle}>
//         {initialData ? "Edit Task" : "Add Task"}
//       </Text>

//       <Text style={styles.label}>Title</Text>
//       <TextInput
//         value={title}
//         onChangeText={setTitle}
//         placeholder="Task title"
//         style={styles.input}
//       />

//       <Text style={styles.label}>Description</Text>
//       <TextInput
//         value={description}
//         onChangeText={setDescription}
//         placeholder="Task description"
//         style={[styles.input, styles.textArea]}
//         multiline
//       />

//       <Text style={styles.label}>Category</Text>
//       <TextInput
//         value={category}
//         onChangeText={setCategory}
//         placeholder="Work / Personal / Study"
//         style={styles.input}
//       />

//       <Text style={styles.label}>Time</Text>
//       <TextInput
//         value={time}
//         onChangeText={setTime}
//         placeholder="10:00 AM"
//         style={styles.input}
//       />

//       <Text style={styles.label}>Priority</Text>
//       <View style={styles.row}>
//         <PriorityBtn value="low" label="low" />
//         <PriorityBtn value="medium" label="medium" />
//         <PriorityBtn value="high" label="high" />
//       </View>

//       <Text style={styles.label}>Subtasks</Text>

//       <View style={styles.subInputRow}>
//         <TextInput
//           value={subInput}
//           onChangeText={setSubInput}
//           placeholder="Add subtask..."
//           style={[styles.input, styles.subInput]}
//         />

//         <TouchableOpacity style={styles.addBtn} onPress={addSubtask}>
//           <Text style={styles.addBtnText}>+</Text>
//         </TouchableOpacity>
//       </View>

//       {subtasks.map((sub) => (
//         <View key={sub.id} style={styles.subItem}>
//           <Text style={styles.subItemText}>{sub.title}</Text>
//           <TouchableOpacity onPress={() => removeSubtask(sub.id)}>
//             <Text style={styles.removeText}>✕</Text>
//           </TouchableOpacity>
//         </View>
//       ))}

//       <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
//         <Text style={styles.saveText}>Save Task</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     gap: 12,
//   },
//   screenTitle: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#222",
//     marginBottom: 8,
//   },
//   label: {
//     fontWeight: "600",
//     fontSize: 14,
//     color: "#555",
//   },
//   input: {
//     backgroundColor: "#fff",
//     paddingHorizontal: 14,
//     paddingVertical: 14,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: "#E7E7E7",
//   },
//   textArea: {
//     minHeight: 110,
//     textAlignVertical: "top",
//   },
//   row: {
//     flexDirection: "row",
//     gap: 8,
//     alignItems: "center",
//   },
//   priorityBtn: {
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: "#EEEAFD",
//   },
//   activePriority: {
//     backgroundColor: "#6C4CF1",
//   },
//   priorityText: {
//     color: "#555",
//     fontWeight: "500",
//   },
//   activePriorityText: {
//     color: "#fff",
//     fontWeight: "700",
//   },
//   subInputRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   subInput: {
//     flex: 1,
//   },
//   addBtn: {
//     backgroundColor: "#6C4CF1",
//     width: 46,
//     height: 46,
//     borderRadius: 14,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   addBtnText: {
//     color: "#fff",
//     fontSize: 22,
//     fontWeight: "700",
//   },
//   subItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 12,
//   },
//   subItemText: {
//     color: "#333",
//   },
//   removeText: {
//     color: "#E53935",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   saveBtn: {
//     marginTop: 20,
//     backgroundColor: "#6C4CF1",
//     padding: 16,
//     borderRadius: 16,
//     alignItems: "center",
//   },
//   saveText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: 16,
//   },
// });

import { useEffect, useMemo, useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

type SubTask = {
  id: string;
  title: string;
  completed: boolean;
};

type Props = {
  initialData?: any;
  onSubmit: (data: any) => void;
};

const categoryOptions = ["Work", "Personal", "Study"];

export default function TaskForm({ initialData, onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [category, setCategory] = useState("Work");
  const [dueDate, setDueDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  const [subtasks, setSubtasks] = useState<SubTask[]>([]);
  const [subInput, setSubInput] = useState("");

  useEffect(() => {
    if (!initialData) return;

    setTitle(initialData.title || "");
    setDescription(initialData.description || "");
    setPriority(initialData.priority || "medium");
    setCategory(initialData.category || "Work");
    setSubtasks(Array.isArray(initialData.subtasks) ? initialData.subtasks : []);

    if (initialData.dueDate) {
      setDueDate(new Date(initialData.dueDate));
    }
  }, [initialData]);

  const formattedDate = useMemo(() => {
    return dueDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [dueDate]);

  const addSubtask = () => {
    if (!subInput.trim()) return;

    const newSubtask: SubTask = {
      id: Date.now().toString(),
      title: subInput.trim(),
      completed: false,
    };

    setSubtasks((prev) => [...prev, newSubtask]);
    setSubInput("");
  };

  const removeSubtask = (id: string) => {
    setSubtasks((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = () => {
    onSubmit({
      ...initialData,
      title,
      description,
      priority: priority.toLowerCase(),
      category,
      dueDate: dueDate.toISOString(),
      subtasks,
      status: initialData?.status || "todo",
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.label}>Task Group</Text>
      <View style={styles.pillsRow}>
        {categoryOptions.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setCategory(item)}
            style={[styles.pill, category === item && styles.activePill]}
          >
            <Text
              style={[
                styles.pillText,
                category === item && styles.activePillText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Project Name</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Grocery Shopping App"
        style={styles.input}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Write task details..."
        multiline
        style={[styles.input, styles.textArea]}
      />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.pillsRow}>
        {["low", "medium", "high"].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setPriority(item as "low" | "medium" | "high")}
            style={[
              styles.priorityBtn,
              priority === item && styles.activePriorityBtn,
            ]}
          >
            <Text
              style={[
                styles.priorityText,
                priority === item && styles.activePriorityText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Due Date</Text>
      <TouchableOpacity style={styles.selector} onPress={() => setShowDate(true)}>
        <View style={styles.selectorLeft}>
          <Ionicons name="calendar-outline" size={18} color="#7A5AF8" />
          <Text style={styles.selectorText}>{formattedDate}</Text>
        </View>
        <Ionicons name="chevron-down" size={18} color="#555" />
      </TouchableOpacity>

      {showDate && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, selectedDate) => {
            setShowDate(false);
            if (selectedDate) setDueDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Subtasks</Text>
      <View style={styles.subtaskRow}>
        <TextInput
          value={subInput}
          onChangeText={setSubInput}
          placeholder="Add subtask..."
          style={[styles.input, styles.subtaskInput]}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addSubtask}>
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {subtasks.map((sub) => (
        <View key={sub.id} style={styles.subItem}>
          <Text style={styles.subItemText}>{sub.title}</Text>
          <TouchableOpacity onPress={() => removeSubtask(sub.id)}>
            <Ionicons name="close" size={18} color="#E53935" />
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>
          {initialData ? "Save Changes" : "Add Project"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#5B5B5B",
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#ECE9F6",
    fontSize: 15,
    color: "#222",
    marginBottom: 8,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  pillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  pill: {
    backgroundColor: "#F3F0FF",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  activePill: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9D0FF",
  },
  pillText: {
    color: "#6A6A6A",
    fontWeight: "500",
  },
  activePillText: {
    color: "#2A2A2A",
    fontWeight: "700",
  },
  priorityBtn: {
    backgroundColor: "#EEEAFD",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },
  activePriorityBtn: {
    backgroundColor: "#6C4CF1",
  },
  priorityText: {
    color: "#5E5E5E",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  activePriorityText: {
    color: "#fff",
    fontWeight: "700",
  },
  selector: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#ECE9F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  selectorLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  selectorText: {
    color: "#222",
    fontSize: 15,
  },
  subtaskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  subtaskInput: {
    flex: 1,
    marginBottom: 0,
  },
  addBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#6C4CF1",
    justifyContent: "center",
    alignItems: "center",
  },
  subItem: {
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#EFEAFD",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subItemText: {
    color: "#222",
    fontSize: 14,
  },
  saveBtn: {
    marginTop: 24,
    backgroundColor: "#6C4CF1",
    borderRadius: 18,
    paddingVertical: 17,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});