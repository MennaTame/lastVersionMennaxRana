// import { StyleSheet, Text, View } from "react-native";

// export default function ProgressCard({ progress }: { progress: number }) {
//   return (
//     <View style={styles.card}>
//       <View>
//         <Text style={styles.title}>Your Today is Almost Done!</Text>
//         <Text style={styles.percent}>{progress}%</Text>
//       </View>

//       <View style={styles.circle}>
//         <Text style={styles.circleText}>{progress}%</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#6C4CF1",
//     padding: 20,
//     borderRadius: 22,
//     marginBottom: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   title: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//     maxWidth: 180,
//     lineHeight: 24,
//   },
//   percent: {
//     color: "#fff",
//     fontSize: 28,
//     fontWeight: "700",
//     marginTop: 10,
//   },
//   circle: {
//     width: 74,
//     height: 74,
//     borderRadius: 37,
//     borderWidth: 5,
//     borderColor: "#D9CCFF",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "transparent",
//   },
//   circleText: {
//     color: "#fff",
//     fontWeight: "700",
//   },
// });

import { StyleSheet, Text, View } from "react-native";

export default function ProgressCard({ progress }: { progress: number }) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>Your Today is Almost Done!</Text>
        <Text style={styles.percent}>{progress}%</Text>
      </View>

      <View style={styles.circle}>
        <Text style={styles.circleText}>{progress}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#6C4CF1",
    padding: 20,
    borderRadius: 22,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    maxWidth: 180,
    lineHeight: 24,
  },
  percent: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,
  },
  circle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 5,
    borderColor: "#D9CCFF",
    justifyContent: "center",
    alignItems: "center",
  },
  circleText: {
    color: "#fff",
    fontWeight: "700",
  },
});