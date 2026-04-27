// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// type Props = {
//   title: string;
//   count: number;
//   onPress?: () => void;
// };

// export default function TaskGroupCard({ title, count, onPress }: Props) {
//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress}>
//       <View style={styles.iconWrap}>
//         <Ionicons name="folder-open-outline" size={22} color="#E67BC7" />
//       </View>

//       <View style={styles.textWrap}>
//         <Text style={styles.title}>{title}</Text>
//         <Text style={styles.subtitle}>{count} Tasks</Text>
//       </View>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 18,
//     marginBottom: 12,
//     elevation: 3,
//   },
//   iconWrap: {
//     width: 42,
//     height: 42,
//     borderRadius: 12,
//     backgroundColor: "#FCE7F3",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   textWrap: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#222",
//   },
//   subtitle: {
//     fontSize: 13,
//     color: "#888",
//     marginTop: 2,
//   },
// });

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  count: number;
  onPress?: () => void;
};

export default function TaskGroupCard({ title, count, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconWrap}>
        <Ionicons name="folder-open-outline" size={22} color="#E67BC7" />
      </View>

      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{count} Tasks</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    elevation: 3,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#FCE7F3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
  },
  subtitle: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
});